<template>
  <div
    class="body-bg"
    :style="`background: url(${datas.bgImg}) center center / cover no-repeat;opacity:${datas.opacity}`"
  ></div>
</template>

<script lang="ts" setup>
import VdoingUtil from "~/utils/vdoingUtil"

const appConfig = useAppConfig()

// datas
const datas = reactive({
  bgImg: "",
  opacity: 0.5,
})

// lifecycle
onMounted(() => {
  let { bodyBgImg, bodyBgImgOpacity, bodyBgImgInterval = 15 } = appConfig.themeConfig

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
