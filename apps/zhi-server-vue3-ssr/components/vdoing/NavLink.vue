<template>
  <router-link
    v-if="!VdoingUtil.isExternal(computes.link.value)"
    class="nav-link"
    :to="computes.link.value"
    :exact="computes.exact.value"
    @focusout.native="methods.focusoutAction"
    >{{ props.item.text }}</router-link
  >
  <a
    v-else
    :href="computes.link.value"
    class="nav-link external"
    :target="VdoingUtil.isMailto(computes.link.value) || VdoingUtil.isTel(computes.link.value) ? '' : '_blank'"
    :rel="
      VdoingUtil.isMailto(computes.link.value) || VdoingUtil.isTel(computes.link.value) ? '' : 'noopener noreferrer'
    "
    @focusout="methods.focusoutAction"
  >
    {{ props.item.text }}
    <OutboundLink />
  </a>
</template>

<script setup lang="ts">
import VdoingUtil from "~/utils/vdoingUtil"
import OutboundLink from "~/components/vdoing/OutboundLink.vue"
import { computed } from "vue"

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// computes
const computes: any = {
  link: computed(() => {
    return VdoingUtil.ensureExt(props.item.link)
  }),

  exact: computed(() => {
    // if (this.$site.locales) {
    //   return Object.keys(this.$site.locales).some((rootLink) => rootLink === this.link)
    // }
    return computes.link === "/"
  }),
}

// methods
const methods = {
  focusoutAction: () => {
    // this.$emit("focusout")
  },
}
</script>
