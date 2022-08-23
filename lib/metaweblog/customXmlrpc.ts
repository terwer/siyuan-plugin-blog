import logUtil from "../logUtil";

const Serializer = require('xmlrpc/lib/serializer')
// const xmlParser = require('xml2json');
const {XMLParser} = require('fast-xml-parser');
const options = {
    ignoreAttributes : false
};
const xmlParser = new XMLParser(options);

/**
 * 自定义xmlrpc的请求与解析，解决apache xmlrpc的扩展问题
 * @param apiUrl
 * @param reqMethod
 * @param reqParams
 */
export async function fetchCustom(apiUrl: string, reqMethod: string, reqParams: Array<string>) {
    let ret

    try {
        const methodBodyXml = Serializer.serializeMethodCall(reqMethod, reqParams, "utf8")

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "content-type": "text/xml"
            },
            body: methodBodyXml
        })
        const resXml = await response.text()
        logUtil.logInfo("resXml=>", resXml)

        const parseResult: any = xmlParser.parse(resXml)
        logUtil.logInfo("parseResult=>", parseResult)

        const resJson = parseResult.methodResponse || {}
        logUtil.logInfo("resJson=>", JSON.stringify(resJson))

        return resJson
    } catch (e: any) {
        throw new Error(e)
    }

    return ret
}