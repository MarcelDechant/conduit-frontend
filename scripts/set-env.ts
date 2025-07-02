const { config } = require("dotenv");
const { writeFileSync } = require("fs");
const { join } = require("path");

// Liest die .env aus dem Root (eine Ebene höher)
config({ path: join(__dirname, "../../.env") });

const targetPath = join(__dirname, "../src/environments/environment.prod.ts");

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env["API_URL"]}'
};
`;

writeFileSync(targetPath, envConfigFile);

console.log(
  `✅ environment.prod.ts erstellt mit API_URL=${process.env["API_URL"]}`,
);
