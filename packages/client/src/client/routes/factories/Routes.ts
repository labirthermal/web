import type { ApiClient } from "../../ApiClient";
import { GetRoutesFactory } from "./GetRoutesFactory";
import { PostRoutesFactory } from "./PostRoutesFactory";

/** 
 * Object containing instances of all available API routes. 
 * @package `@labirthermal/webcomponents`
 */
export class Routes {

    /** 
     * All the available GET routed of the API 
     */
    public readonly get: GetRoutesFactory;

    /**
     * All the available POST routes of the API
     */
    public readonly post: PostRoutesFactory;

    constructor(
        protected readonly client: ApiClient
    ) {
        this.get = new GetRoutesFactory(this.client);
        this.post = new PostRoutesFactory(this.client);
    }

}