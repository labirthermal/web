import { promises as fs } from "fs";
import path from "path";

/**
 * Smaže všechny složky v poli createdFolders z filesystemu (pokud existují).
 * @param {string[]} createdFolders - pole relativních cest ke složkám
 */
export async function cleanupFolders(createdFolders: string[]) {

    console.info("Provedu úklid testovacích složek...", createdFolders);
    
    for (const folder of createdFolders) {
        const relPath = "./www/data/" + folder;
        const absPath = path.resolve( relPath );
        try {

            await fs.rm(absPath, { recursive: true, force: true });

        } catch (e) {
            console.warn(`ERROR ${folder}:`, (e as Error).message);
        }
    }
    if (createdFolders.length) {
        // console.info("Testovací složky byly promazány.");
    }
}
