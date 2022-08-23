import {fetchNode} from "./nodeXmlrpc";
import logUtil from "../logUtil";
import {fetchCustom} from "./customXmlrpc";

/**
 * Xmlrpc客户端封装类
 */
export class XmlrpcClient {
    private readonly apiType: string
    private readonly apiUrl: string
    private readonly username: string
    private readonly password: string

    constructor(apiType: string, apiUrl: string, username: string, password: string) {
        this.apiType = apiType
        this.apiUrl = apiUrl
        this.username = username
        this.password = password
    }

    /**
     * 同时兼容浏览器和思源宿主环境的xmlrpc API
     * @param apiUrl 端点
     * @param reqMethod 方法
     * @param reqParams 参数数组
     */
    private async fetchXmlrpc(apiUrl: string, reqMethod: string, reqParams: Array<string>) {
        let result

        logUtil.logWarn("开始使用node来fetch获取数据")
        // result = await fetchNode(apiUrl, reqMethod, reqParams)
        result = await fetchCustom(apiUrl, reqMethod, reqParams)
        if (!result || result == "") {
            throw new Error("请求错误或者返回结果为空")
        }

        logUtil.logInfo("最终返回给前端的数据=>", result)

        return result
    }

    /**
     * xmlrpc统一调用入口
     * @param reqMethod 方法
     * @param reqMarams 参数
     */
    public async methodCallEntry(reqMethod: string, reqMarams: Array<any>) {
        const result = await this.fetchXmlrpc(this.apiUrl, reqMethod, reqMarams)
        logUtil.logInfo("请求结果，result=>")
        logUtil.logInfo(result)
        return result
    }
}

/**
 * Xmlrpc服务器封装类
 */
export class XmlrpcServer {

}
