/**
 * 获取挂件所在的块ID
 * @returns {Promise<string>}
 */
import {getBlockByID, getBlockAttrs, setBlockAttrs, exportMdContent} from "./siyuan/siYuanApi";

/**
 * 获取页面
 * @param pageId 页面ID
 */
export async function getPage(pageId: string) {
    return await getBlockByID(pageId)
}

/**
 * 获取页面属性
 * @param pageId 页面ID
 */
export async function getPageAttrs(pageId: string) {
    return await getBlockAttrs(pageId)
}

/**
 * 保存页面属性
 * @param pageId 页面ID
 * @param attrs 属性对象
 */
export async function setPageAttrs(pageId: string, attrs: any) {
    return await setBlockAttrs(pageId, attrs)
}

/**
 * 获取页面的Markdown
 * @param pageId
 */
export async function getPageMd(pageId: string) {
    return await exportMdContent(pageId);
}