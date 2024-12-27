import {createApp} from "vue"

const createBootStrap = (content: any, props: any, container: string | HTMLElement) => {
  createApp(content, props).mount(container)
}

export {createBootStrap}