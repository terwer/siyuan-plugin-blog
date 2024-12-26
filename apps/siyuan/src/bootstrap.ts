import {createApp} from "vue"
import Share from "./share.vue"

const createBootStrap = (container: string | HTMLElement, props: any) => {
  createApp(Share, props).mount(container)
}

export {createBootStrap}