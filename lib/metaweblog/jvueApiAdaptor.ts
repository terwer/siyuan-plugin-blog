import {IApi} from "../api";
import {MetaWeblogApiAdaptor} from "./metaWeblogApiAdaptor";
import {API_TYPE_CONSTANTS} from "../constants";
import {MetaWeblogApi} from "./metaWeblogApi";

/**
 * JVue的API适配器
 */
export class JvueApiAdaptor extends MetaWeblogApiAdaptor implements IApi {
    constructor() {
        super();

        this.apiUrl = process.env.JVUE_API_URL || ""
        this.username = process.env.JVUE_USERNAME || ""
        this.password = process.env.JVUE_PASSWORD || ""
        this.appkey = API_TYPE_CONSTANTS.API_TYPE_JVUE

        this.metaWeblog = new MetaWeblogApi(this.appkey, this.apiUrl, this.username, this.password);
    }
}