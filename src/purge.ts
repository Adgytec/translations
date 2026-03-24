import fs from "node:fs";
import path from "node:path";

// Configuration
const REPO = "Adgytec/translations@main";
const TRANSLATIONS_DIR = path.resolve("src"); // Base directory for all languages

// 🔥 Recursively get all JSON files
function getAllJsonFiles(dir: string, base = ""): string[] {
    let results: string[] = [];

    const list = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of list) {
        const fullPath = path.join(dir, item.name);
        const relativePath = path.join(base, item.name);

        if (item.isDirectory()) {
            results = results.concat(getAllJsonFiles(fullPath, relativePath));
        } else if (item.name.endsWith(".json")) {
            results.push(relativePath.replace(/\\/g, "/")); // normalize for URLs
        }
    }

    return results;
}

// 🌐 Purge a single file
async function purgeCache(filePath: string) {
    const purgeUrl = `https://purge.jsdelivr.net/gh/${REPO}/${filePath}`;

    try {
        const response = await fetch(purgeUrl);
        const data = await response.json();

        if (response.ok) {
            console.log(`✓ Purged: ${filePath}`);
        } else {
            console.error(`❌ Failed: ${filePath}`, data);
        }
    } catch (error) {
        console.error(`❌ Network error: ${filePath}`, error);
    }
}

async function run() {
    console.log("🚀 Starting jsDelivr cache purge...\n");

    // 1. Purge generated types
    await purgeCache("types/i18n.d.ts");

    if (!fs.existsSync(TRANSLATIONS_DIR)) {
        console.warn(`⚠️ Directory not found: ${TRANSLATIONS_DIR}`);
        return;
    }

    // 2. Find all language folders
    const langFolders = fs
        .readdirSync(TRANSLATIONS_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    let allTasks: Promise<void>[] = [];

    for (const lang of langFolders) {
        const langPath = path.join(TRANSLATIONS_DIR, lang);

        // 🔥 Get ALL nested JSON files
        const files = getAllJsonFiles(langPath);

        for (const file of files) {
            const filePath = `src/${lang}/${file}`;

            // 👉 push instead of await (parallel execution)
            allTasks.push(purgeCache(filePath));
        }
    }

    // ⚡ Run all purges in parallel
    await Promise.all(allTasks);

    console.log(
        "\n✅ CDN Purge complete. Changes should reflect globally within minutes.",
    );
}

run();
