import * as workerpool from "workerpool"

import Pool from "workerpool/types/Pool";


let pool: Pool|undefined = undefined;

export const getPool = async () => {
   if ( !pool ) {
        // const workerpool = await import( "workerpool" );
        pool = workerpool.pool({
            maxWorkers: 6
        });
   }
   return pool;

}