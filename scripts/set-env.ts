const { config } = require("dotenv");
const { writeFileSync } = require("fs");
const { join } = require("path");

config({ path: join(__dirname, "../../.env") });

if (!process.env["API_URL"]) {
  throw new Error("❌ API_URL ist nicht gesetzt. Build abgebrochen.");
}

const targetPath = join(__dirname, "../src/environments/environment.prod.ts");

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env["API_URL"]}'
};`;

writeFileSync(targetPath, envConfigFile);

console.log(
  `environment.prod.ts erstellt mit API_URL=${process.env["API_URL"]}`,
);
