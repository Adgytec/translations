import fs from "fs";
import path from "path";
import prettier from "prettier";

const translationsPath = path.resolve("src/en");
const outputFile = path.resolve("types/i18n.d.ts");

function createType(obj: any): string {
  if (typeof obj === "string") return "string";
  if (typeof obj === "number") return "number";
  if (typeof obj === "boolean") return "boolean";
  if (Array.isArray(obj)) return "string[]";

  return `{${Object.entries(obj)
    .map(([k, v]) => `"${k}": ${createType(v)}`)
    .join(";")}}`;
}

const files = fs
  .readdirSync(translationsPath)
  .filter((f) => f.endsWith(".json"));

let output = `// AUTO-GENERATED FILE — DO NOT EDIT\n\n`;
output += `export interface I18nResources {\n`;

for (const file of files) {
  const namespace = path.basename(file, ".json");
  const filePath = path.join(translationsPath, file);
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  output += `  "${namespace}": ${createType(json)};\n`;
}

output += `}\n`;

// ✨ format with prettier using project config
async function write() {
    // 🔴 THIS is what makes TS config work
    const configPath = await prettier.resolveConfigFile();
    const config = (configPath ? await prettier.resolveConfig(configPath) : null) ?? {};

    const formatted = await prettier.format(output, {
        ...config,
        parser: "typescript",
    });

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, formatted);
}

write().then(() => console.log("✓ i18n resource types generated."));
