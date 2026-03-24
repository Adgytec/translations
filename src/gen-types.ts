import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const translationsPath = path.resolve("src/en");
const outputFile = path.resolve("types/i18n.d.ts");

// 🔥 Recursive file reader
function getAllJsonFiles(
    dir: string,
    base = ""
): {
    fullPath: string;
    namespace: string;
}[] {
    let results: { fullPath: string; namespace: string }[] = [];

    const list = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of list) {
        const fullPath = path.join(dir, item.name);
        const relativePath = path.join(base, item.name);

        if (item.isDirectory()) {
            results = results.concat(getAllJsonFiles(fullPath, relativePath));
        } else if (item.name.endsWith(".json")) {
            results.push({
                fullPath,
                namespace: relativePath
                    .replace(".json", "")
                    .replace(/\\/g, "/"),
            });
        }
    }

    return results;
}

// 🔧 Better type generator
type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

function createType(obj: JsonValue): string {
    if (typeof obj === "string") return "string";
    if (typeof obj === "number") return "number";
    if (typeof obj === "boolean") return "boolean";
    if (obj === null) return "null";

    if (Array.isArray(obj)) {
        if (obj.length === 0) return "unknown[]";
        return `${createType(obj[0])}[]`;
    }

    return `{
${Object.entries(obj)
    .map(([k, v]) => `  "${k}": ${createType(v)};`)
    .join("\n")}
}`;
}

// 🔥 Get ALL files (nested)
const files = getAllJsonFiles(translationsPath);

let output = `// AUTO-GENERATED FILE — DO NOT EDIT\n\n`;
output += `export interface I18nResources {\n`;

for (const file of files) {
    const json = JSON.parse(fs.readFileSync(file.fullPath, "utf-8"));

    output += `  "${file.namespace}": ${createType(json)};\n`;
}

output += `}\n`;

// ✨ format with Biome CLI
function write() {
    try {
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });

        // write raw output first
        fs.writeFileSync(outputFile, output);

        // resolve local biome binary (cross-platform)
        const biomeCmd =
            process.platform === "win32"
                ? "node_modules\\.bin\\biome"
                : "./node_modules/.bin/biome";

        // run biome formatter
        execSync(`${biomeCmd} format "${outputFile}" --write`, {
            stdio: "inherit",
        });

        console.log("✓ i18n resource types generated (Biome formatted).");
    } catch (err) {
        console.error("❌ Formatting failed:", err);

        // fallback: ensure file still exists
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        fs.writeFileSync(outputFile, output);
    }
}

write();
