<template>
  <div class="dropdown-wrapper">
    <button class="dropdown-title" type="button" :aria-label="computes.dropdownAriaLabel.value" @click="methods.toggle">
      <NuxtLink v-if="props.item.link" :to="props.item.link" class="link-title">{{ props.item.text }}</NuxtLink>
      <span class="title" v-show="!props.item.link">{{ props.item.text }}</span>
      <span class="arrow" :class="datas.open ? 'down' : 'right'"></span>
    </button>

    <transition>
      <ul class="nav-dropdown" v-show="datas.open">
        <li class="dropdown-item" :key="subItem.link || index" v-for="(subItem, index) in props.item.items">
          <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>

          <ul class="dropdown-subitem-wrapper" v-if="subItem.type === 'links'">
            <li class="dropdown-subitem" :key="childSubItem.link" v-for="childSubItem in subItem.items">
              <NavLink
                @focusout="
                  methods.isLastItemOfArray(childSubItem, subItem.items) &&
                    methods.isLastItemOfArray(subItem, props.item.items) &&
                    methods.toggle()
                "
                :item="childSubItem"
              />
            </li>
          </ul>

          <NavLink
            v-else
            @focusout="methods.isLastItemOfArray(subItem, props.item.items) && methods.toggle()"
            :item="subItem"
          />
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import last from "lodash/last"

import NavLink from "~/components/vdoing/NavLink.vue"

// props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// uses
const route = useRoute()

// datas
const datas = reactive({
  open: false,
  isMQMobile: false,
})

// computes
const computes = {
  dropdownAriaLabel: computed(() => {
    return props.item.ariaLabel || props.item.text
  }),
}

// methods
const methods = {
  toggle: () => {
    if (datas.isMQMobile) {
      datas.open = !datas.open
    }
  },
  isLastItemOfArray: (item: any, array: any) => {
    return last(array) === item
  },
}

// lifecycle
onBeforeMount(() => {
  datas.isMQMobile = window.innerWidth < 720

  window.addEventListener("resize", () => {
    datas.isMQMobile = window.innerWidth < 720
  })
})

watch(
  () => route.params,
  () => {
    datas.open = false
  }
)
</script>

<style lang="stylus" scoped>
@require "../../assets/vdoing/styles/index"

.dropdown-wrapper
  cursor pointer
  .dropdown-title
    display block
    font-size 0.9rem
    font-family inherit
    cursor inherit
    padding inherit
    line-height 1.4rem
    background transparent
    border none
    font-weight 500
    color var(--textColor)
    a
      color var(--textColor)
    &:hover
      border-color transparent
    .arrow
      vertical-align middle
      margin-top -1px
      margin-left 0.4rem
  .nav-dropdown
    .dropdown-item
      color inherit
      line-height 1.7rem
      h4
        margin 0.45rem 0 0
        border-top 1px solid var(--borderColor)
        padding 0.45rem 1.5rem 0 1.25rem
      .dropdown-subitem-wrapper
        padding 0
        list-style none
        .dropdown-subitem
          font-size 0.9em
      a
        display block
        color var(--textColor)
        line-height 1.7rem
        position relative
        border-bottom none
        font-weight 400
        margin-bottom 0
        padding 0 1.5rem 0 1.25rem
        &:hover
          color $accentColor
        &.router-link-active
          color $accentColor
          &::after
            content ''
            width 0
            height 0
            border-left 5px solid $accentColor
            border-top 3px solid transparent
            border-bottom 3px solid transparent
            position absolute
            top calc(50% - 2px)
            left 9px
      &:first-child h4
        margin-top 0
        padding-top 0
        border-top 0
@media (max-width $MQMobile)
  .dropdown-wrapper
    &.open .dropdown-title
      margin-bottom 0.5rem
    .dropdown-title
      font-weight 600
      font-size inherit
      &:hover
        color $accentColor
      .link-title
        display none
      .title
        display inline-block !important
    .nav-dropdown
      transition height 0.1s ease-out
      overflow hidden
      .dropdown-item
        h4
          border-top 0
          margin-top 0
          padding-top 0
        h4, & > a
          font-size 15px
          line-height 2rem
        .dropdown-subitem
          font-size 14px
          padding-left 1rem
@media (min-width $MQMobile)
  .dropdown-wrapper
    height 1.8rem
    &:hover .nav-dropdown, &.open .nav-dropdown
      // override the inline style.
      display block !important
    &.open:blur
      display none
    .dropdown-title .arrow
      // make the arrow always down at desktop
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-top 6px solid $arrowBgColor
      border-bottom 0
    .nav-dropdown
      display none
      // Avoid height shaked by clicking
      height auto !important
      box-sizing border-box
      max-height calc(100vh - 2.7rem)
      overflow-y auto
      position absolute
      top 100%
      right 0
      background-color var(--mainBg)
      padding 0.6rem 0
      border 1px solid var(--borderColor)
      border-bottom-color var(--borderColor)
      text-align left
      border-radius 0.25rem
      white-space nowrap
      margin 0
  .nav-item .dropdown-title a
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
