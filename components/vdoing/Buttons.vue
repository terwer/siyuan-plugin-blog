<template>
  <div class="buttons">
    <transition name="fade">
      <div
        title="返回顶部"
        class="button blur go-to-top iconfont icon-fanhuidingbu"
        v-show="computes.showToTop.value"
        @click="methods.scrollToTop"
      />
    </transition>
    <div
      title="去评论"
      class="button blur go-to-comment iconfont icon-pinglun"
      v-show="datas.showCommentBut"
      @click="methods.scrollToComment"
    />
    <div
      title="主题模式"
      class="button blur theme-mode-but iconfont icon-zhuti"
      @mouseenter="datas.showModeBox = true"
      @mouseleave="datas.showModeBox = false"
      @click="datas.showModeBox = true"
    >
      <transition name="mode">
        <ul class="select-box" ref="modeBoxRef" v-show="datas.showModeBox" @click.stop @touchstart.stop>
          <li
            v-for="item in datas.modeList"
            :key="item.KEY"
            class="iconfont"
            :class="[item.icon, { active: item.KEY === datas.currentMode }]"
            @click="methods.toggleMode(item.KEY)"
          >
            {{ item.name }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import storage from "good-storage"
import { debounce } from "lodash" // 本地存储

const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl

// refs
const modeBoxRef = ref()

// uses
const route = useRoute()
const appConfig = useAppConfig()

// datas
const datas = reactive({
  threshold: 100,
  scrollTop: 0,
  showCommentBut: false,
  commentTop: null,
  currentMode: "",
  showModeBox: false,
  modeList: [
    {
      name: "跟随系统",
      icon: "icon-zidong",
      KEY: "auto",
    },
    {
      name: "浅色模式",
      icon: "icon-rijianmoshi",
      KEY: "light",
    },
    {
      name: "深色模式",
      icon: "icon-yejianmoshi",
      KEY: "dark",
    },
    {
      name: "阅读模式",
      icon: "icon-yuedu",
      KEY: "read",
    },
  ],
  _scrollTimer: null,
  _textareaEl: null,
  _recordScrollTop: null,
  COMMENT_SELECTOR_1: "#vuepress-plugin-comment", // 评论区元素的选择器1
  COMMENT_SELECTOR_2: "#valine-vuepress-comment", // 评论区元素的选择器2
  COMMENT_SELECTOR_3: ".vssue", // 评论区元素的选择器3
})

// computes
const computes = {
  showToTop: computed(() => {
    return datas.scrollTop && datas.scrollTop > datas.threshold
  }),
}

// emits
const emit = defineEmits(["toggle-theme-mode"])

// methods
const methods = {
  toggleMode: (key: string) => {
    datas.currentMode = key
    emit("toggle-theme-mode", key)
  },
  getScrollTop: () => {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  },
  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    datas.scrollTop = 0
  },

  getCommentTop: () => {
    setTimeout(() => {
      let commentEl =
        document.querySelector(datas.COMMENT_SELECTOR_1) ||
        document.querySelector(datas.COMMENT_SELECTOR_2) ||
        document.querySelector(datas.COMMENT_SELECTOR_3)
      // if (commentEl) {
      //   datas.showCommentBut = this.$frontmatter.comment !== false && this.$frontmatter.home !== true
      //   this.commentTop = commentEl.offsetTop - 58
      // }
    }, 500)
  },
  scrollToComment: () => {
    // window.scrollTo({ top: datas.commentTop, behavior: 'smooth' })
    // datas._textareaEl = document.querySelector(datas.COMMENT_SELECTOR_1 + ' textarea') || document.querySelector(datas.COMMENT_SELECTOR_2 + ' input') || document.querySelector(datas.COMMENT_SELECTOR_3 + ' textarea')
    // if (datas._textareaEl && methods.getScrollTop() !== datas._recordScrollTop) {
    //   document.addEventListener("scroll", this._handleListener)
    // } else if (this._textareaEl && this.getScrollTop() === this._recordScrollTop) {
    //   this._handleFocus()
    // }
  },
  _handleListener: () => {
    // clearTimeout(this._scrollTimer)
    // this._scrollTimer = setTimeout(() => {
    //   document.removeEventListener('scroll', this._handleListener)
    //   this._recordScrollTop = this.getScrollTop()
    //   this._handleFocus()
    // }, 30)
  },
  _handleFocus: () => {
    // this._textareaEl.focus()
    // this._textareaEl.classList.add('yellowBorder')
    // setTimeout(() => {
    //   this._textareaEl.classList.remove('yellowBorder')
    // }, 500)
  },
}

// lifecycle
onMounted(() => {
  datas.currentMode = storage.get("mode") || appConfig.themeConfig.defaultMode || "auto"

  datas.scrollTop = methods.getScrollTop()
  window.addEventListener(
    "scroll",
    debounce(() => {
      datas.scrollTop = methods.getScrollTop()
    }, 100)
  )

  // window.addEventListener("load", () => {
  //   methods.getCommentTop()
  // })

  // 小屏时选择主题模式后关闭选择框
  if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
    modeBoxRef.value.onclick = () => {
      datas.showModeBox = false
    }
    window.addEventListener(
      "scroll",
      debounce(() => {
        if (datas.showModeBox) {
          datas.showModeBox = false
        }
      }, 100)
    )
  }

  // 移动端对类似:hover效果的处理
  const buttons = document.querySelectorAll(".buttons .button")
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    button.addEventListener("touchstart", function () {
      button.classList.add("hover")
    })
    button.addEventListener("touchend", function () {
      setTimeout(() => {
        button.classList.remove("hover")
      }, 150)
    })
  }
})

watch(
  () => route.params,
  () => {
    // datas.showCommentBut = false
    // methods.getCommentTop()
  }
)
</script>

<style lang="stylus">
@require "../assets/vdoing/styles/index"

.yellowBorder
  // border: #FFE089 1px solid!important
  border-radius 5px
  box-shadow 0 0 15px #FFE089 !important
.buttons
  position fixed
  right 2rem
  bottom 2.5rem
  z-index 99
  @media (max-width $MQNarrow)
    right 1rem
    bottom 1.5rem
  .button
    width 2.2rem
    height 2.2rem
    line-height 2.2rem
    border-radius 50%
    box-shadow 0 2px 6px rgba(0, 0, 0, 0.15)
    margin-top 0.9rem
    text-align center
    cursor pointer
    transition all 0.5s
    background var(--blurBg)
    &.hover
      background $accentColor
      box-shadow 0 0 15px $accentColor
      &:before
        color #fff
    @media (any-hover hover)
      &:hover
        background $accentColor
        box-shadow 0 0 15px $accentColor
        &:before
          color #fff
    .select-box
      margin 0
      padding 0.8rem 0
      position absolute
      bottom 0rem
      right 1.5rem
      background var(--mainBg)
      border 1px solid var(--borderColor)
      width 120px
      border-radius 6px
      box-shadow 0 0 15px rgba(255, 255, 255, 0.2)
      li
        list-style none
        line-height 2rem
        font-size 0.95rem
        &:hover
          color $accentColor
        &.active
          background-color rgba(150, 150, 150, 0.2)
          color $accentColor
.mode-enter-active, .mode-leave-active
  transition all 0.3s
.mode-enter, .mode-leave-to
  opacity 0
  transform scale(0.8)
.fade-enter-active, .fade-leave-active
  transition opacity 0.2s
.fade-enter, .fade-leave-to
  opacity 0
</style>
