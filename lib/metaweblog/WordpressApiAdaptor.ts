import {MetaWeblogApiAdaptor} from "./metaWeblogApiAdaptor";
import {IApi} from "../api";
import {API_TYPE_CONSTANTS} from "../constants";
import {MetaWeblogApi} from "./metaWeblogApi";

/**
 * Wordpress的API适配器
 */
export class WordpressApiAdaptor extends MetaWeblogApiAdaptor implements IApi{
    constructor() {
        super();

        this.apiUrl = process.env.WORDPRESS_API_URL || ""
        this.username = process.env.WORDPRESS_USERNAME || ""
        this.password = process.env.WORDPRESS_PASSWORD || ""
        this.appkey = API_TYPE_CONSTANTS.API_TYPE_WORDPRESS

        this.metaWeblog = new MetaWeblogApi(this.appkey, this.apiUrl, this.username, this.password);
    }
}