import fs from "fs";
import path from "path";

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

async function write() {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, output);
}

write().then(() => console.log("✓ i18n resource types generated."));
