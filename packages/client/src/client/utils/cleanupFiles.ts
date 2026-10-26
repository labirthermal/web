import { promises as fs } from "fs";
import path from "path";

/**
 * Smaže všechny soubory v poli fileUrls z filesystemu (pokud existují).
 * @param {string[]} fileUrls - pole URL adres souborů (např. http://localhost:8080/data/...) 
 */
export async function cleanupFiles(fileUrls: string[]) {
    if (!fileUrls || !fileUrls.length) return;
    for (const url of fileUrls) {
        // Nahradí http://localhost:8080 za absolutní cestu k www/data
        let relPath = url.replace(/^https?:\/\/localhost:8080\/?/, "");
        // Pokud začíná na data/, přidej ./www/ před to
        if (relPath.startsWith("data/")) {
            relPath = "./www/" + relPath;
        } else {
            relPath = "./www/data/" + relPath;
        }
        const absPath = path.resolve(relPath);
        try {
            await fs.rm(absPath, { force: true });
        } catch (e) {
            console.warn(`ERROR deleting file ${url}:`, (e as Error).message);
        }
    }
}
