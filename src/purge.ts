import fs from "fs";
import path from "path";

// Configuration
const REPO = "Adgytec/translations@main";
const TRANSLATIONS_DIR = path.resolve("src"); // Base directory for all languages

async function purgeCache(filePath: string) {
    const purgeUrl = `https://purge.jsdelivr.net/gh/${REPO}/${filePath}`;

    try {
        const response = await fetch(purgeUrl);
        const data = await response.json();

        if (response.ok) {
            console.log(`✓ Purged: ${filePath}`);
        } else {
            console.error(`❌ Failed to purge: ${filePath}`, data);
        }
    } catch (error) {
        console.error(`❌ Network error while purging ${filePath}:`, error);
    }
}

async function run() {
    console.log("Starting jsDelivr cache purge...\n");

    // 1. Purge the generated types file
    await purgeCache("types/i18n.d.ts");

    // 2. Purge all JSON translation files dynamically across all languages
    if (fs.existsSync(TRANSLATIONS_DIR)) {
        // Read the 'src' directory to find all language subdirectories (e.g., 'en', 'es')
        const langFolders = fs
            .readdirSync(TRANSLATIONS_DIR, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        for (const lang of langFolders) {
            const langPath = path.join(TRANSLATIONS_DIR, lang);
            const files = fs
                .readdirSync(langPath)
                .filter((f) => f.endsWith(".json"));

            for (const file of files) {
                // Purge each file using its specific language path
                await purgeCache(`src/${lang}/${file}`);
            }
        }
    } else {
        console.warn(`⚠️ Directory not found: ${TRANSLATIONS_DIR}`);
    }

    console.log(
        "\n✓ CDN Purge complete. Changes should reflect globally within minutes.",
    );
}

run();
