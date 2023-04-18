<template>
  <div id="meili-search-box">
    <ais-instant-search :search-client="client" index-name="movies">
      <ais-search-box placeholder="输入关键字..." class="searchbox" tabindex="0"></ais-search-box>
      <ais-hits>
        <template v-slot="{ items }">
          <ul class="suggestions">
            <li class="suggestion" v-for="{ id, title, overview, genres } in items" :key="id">
              <a href="/pages/d0d7eb/#语法-2"
                ><div class="parent-page-title">{{ title }}</div>
                <div class="suggestion-row">
                  <div class="page-title">{{ title }}</div>
                  <div class="suggestion-content">
                    <div class="header">{{ title }}</div>
                    <div>
                      {{ overview }} <span class="highlight">{{ genres[0] }}</span>
                    </div>
                  </div>
                </div></a
              >
            </li>
          </ul>
        </template>
      </ais-hits>
    </ais-instant-search>
  </div>
</template>

<script setup lang="ts">
import { AisInstantSearch, AisHits, AisSearchBox } from "vue-instantsearch/vue3/es"
const client = useMeilisearchClient()
</script>

<style lang="stylus" scoped>
@require "../../assets/vdoing/styles/index"

#meili-search-box
  ::v-deep(.ais-InstantSearch)
    &:hover
      .ais-Hits
        display:block
    .searchbox
      .ais-SearchBox-form
        input
          font-family $fontFamily
          color var(--textColor)
          border 1px solid var(--borderColor, #ccc)
          cursor text
          width 12rem
          height 2rem
          display inline-block
          border-radius 2rem
          font-size .9rem;
          line-height 2rem;
          padding 0 0.5rem 0 2rem
          outline none
          transition all .2s ease
          background transparent url(/img/search.svg) 0.6rem 0.5rem no-repeat
          background-size 1rem
          margin-right 20px
          &:focus
            cursor auto
            border-color #11a8cd
        .ais-SearchBox-submit
          display none
        .ais-SearchBox-reset
          display none
      &::after
        content: " "
        width 12rem
        height 2rem
        position absolute
    .ais-Hits
      display none
      .suggestions
        overflow auto
        max-height calc(100vh - 6rem)
        background-color var(--mainBg)
        min-width 500px
        max-width 700px
        position absolute
        top 2rem
        border 1px solid var(--borderColor)
        border-radius 6px
        padding .4rem
        list-style-type none
        .suggestion
          line-height 1.4
          border-radius 4px
          cursor pointer
          width 100%
          &.focused
            background-color: #f3f4f5
          a
            display block
            white-space normal
            color #415b75
            width 100%
            .parent-page-title
              color var(--textColor)
              font-weight 600
              background-color var(--pageTitleBg)
              padding 5px
            .suggestion-row
              border-collapse collapse
              width 100%
              display table
              .page-title
                width 35%
                color var(--textColor)
                background-color var(--bodyBg)
                border 1px solid var(--borderColor)
                border-left none
                display table-cell
                text-align right
                padding 5px
                font-weight 600
              .suggestion-content
                font-weight 400
                border 1px solid var(--borderColor)
                color var(--textColor)
                border-right none
                width 65%
                display table-cell
                padding 5px
                &:hover
                  background var(--bodyBg)
                .highlight
                  font-weight 600
                  color #11a8cd
                  text-decoration underline
                .header
                  font-weight 600

@media (max-width: 959px)
  #meili-search-box
    ::v-deep(.ais-InstantSearch)
      .searchbox
        .ais-SearchBox-form
          input
            cursor pointer
            width 0
            border-color transparent
            position relative
          &:focus
            cursor text
            left 0
            width 10rem

@media (max-width: 959px) and (min-width:719px)
  #meili-search-box
    ::v-deep(.ais-InstantSearch)
      .ais-Hits
        .suggestions
          left 0

@media (max-width: 719px)
  #meili-search-box
    ::v-deep(.ais-InstantSearch)
      .searchbox
        input
          left: 1rem
      .ais-Hits
        .suggestions
          min-width unset
          right: 0

@media (max-width: 419px)
  #meili-search-box
    ::v-deep(.ais-InstantSearch)
      .searchbox
        input
          &:focus
            width: 8rem
      .ais-Hits
        .suggestions
          min-width unset
          width:calc(100vw - 4rem)
</style>
