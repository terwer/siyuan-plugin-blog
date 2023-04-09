import App from "./App.vue"
import { createSSRApp, defineComponent, h } from "vue"
import { setPageContext } from "../renderer/usePageContext"
import type { Component, PageContext, PageProps } from "../renderer/types"

export { createApp }

function createApp(Page: Component, pageProps: PageProps | undefined, pageContext: PageContext) {
    const PageWithLayout = defineComponent({
        render() {
            return h(
                App,
                {},
                {
                    default() {
                        return h(Page, pageProps || {})
                    },
                }
            )
        },
    })

    const app = createSSRApp(PageWithLayout)

    // Make pageContext available from any Vue component
    setPageContext(app, pageContext)

    return app
}
