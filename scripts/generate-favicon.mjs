import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import pngToIco from "png-to-ico";

const input = resolve("public/images/logo.png");
const output = resolve("src/app/favicon.ico");

const buf = await pngToIco(input);
writeFileSync(output, buf);
console.log(`Wrote ${output} (${buf.length} bytes)`);
