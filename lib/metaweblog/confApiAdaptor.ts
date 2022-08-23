import {IApi} from "../api";
import {MetaWeblogApiAdaptor} from "./metaWeblogApiAdaptor";
import {API_TYPE_CONSTANTS} from "../constants";
import {MetaWeblogApi} from "./metaWeblogApi";

/**
 * Confluence的API适配器
 */
export class ConfApiAdaptor extends MetaWeblogApiAdaptor implements IApi {

    constructor() {
        super();

        this.apiUrl = process.env.CONF_API_URL || ""
        this.username = process.env.CONF_USERNAME || ""
        this.password = process.env.CONF_PASSWORD || ""
        this.appkey = API_TYPE_CONSTANTS.API_TYPE_CONF

        this.metaWeblog = new MetaWeblogApi(this.appkey, this.apiUrl, this.username, this.password);
    }
}