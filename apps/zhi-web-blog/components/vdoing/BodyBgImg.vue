<template>
  <div
    v-if="methods.hasBg()"
    class="body-bg"
    :style="`background: url(${appBase + datas.bgImg}) center center / cover no-repeat;opacity:${datas.opacity}`"
  />
</template>

<script lang="ts" setup>
import VdoingUtil from "~/utils/vdoingUtil"
import Env from "zhi-env"

const appConfig = useAppConfig()
const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv.public)
ZhiWebBlogUtil.initEnv(env)

// datas
const datas = reactive({
  appBase: window.location.origin + env.getStringEnv("VITE_APP_BASE"),
  bgImg: "",
  opacity: 0.5,
})

// methods
const methods = {
  hasBg: () => {
    const { bodyBgImg } = appConfig.themeConfig
    if (typeof bodyBgImg === "string") {
      console.log(datas.bgImg)
      return datas.bgImg !== ""
    } else if (VdoingUtil.type(bodyBgImg) === "array") {
      return datas.bgImg.length > 0
    }
    console.log(datas.bgImg)
    return fasle
  },
}

// lifecycle
onMounted(() => {
  const { bodyBgImg, bodyBgImgOpacity, bodyBgImgInterval = 15 } = appConfig.themeConfig

  // 没有背景忽略
  if (!methods.hasBg()) {
    return
  }
  if (typeof bodyBgImg === "string") {
    datas.bgImg = bodyBgImg
  } else if (VdoingUtil.type(bodyBgImg) === "array") {
    let count = 0
    let timer: any = null

    datas.bgImg = bodyBgImg[count]
    clearInterval(timer)
    timer = setInterval(() => {
      if (++count >= bodyBgImg.length) {
        count = 0
      }
      datas.bgImg = bodyBgImg[count]

      // 预加载下一张图片
      if (bodyBgImg[count + 1]) {
        const img = new Image()
        img.src = bodyBgImg[count + 1]
      }
    }, bodyBgImgInterval * 1000)
  }

  if (bodyBgImgOpacity !== undefined) {
    datas.opacity = bodyBgImgOpacity
  }
})
</script>

<style lang="stylus">
.body-bg
  position fixed
  left 0
  top 0
  z-index -999999
  height 100vh
  width 100vw
  transition background 0.5s
</style>
