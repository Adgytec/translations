import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";

const translationsPath = path.resolve("src/en");
const outputFile = path.resolve("types/i18n.d.ts");

// 🔥 Recursive file reader
function getAllJsonFiles(
    dir: string,
    base = "",
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
function createType(obj: any): string {
    if (typeof obj === "string") return "string";
    if (typeof obj === "number") return "number";
    if (typeof obj === "boolean") return "boolean";

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

// ✨ format with prettier using project config
async function write() {
    const configPath = await prettier.resolveConfigFile();
    const config =
        (configPath ? await prettier.resolveConfig(configPath) : null) ?? {};

    const formatted = await prettier.format(output, {
        ...config,
        parser: "typescript",
    });

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, formatted);
}

write().then(() => console.log("✓ i18n resource types generated."));
