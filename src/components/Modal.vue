<template>
  <transition name="fade">
    <SLightbox
      v-show="show"
      ref="lightboxRef"
      :class="MODAL_LIGHTBOX_CLASSNAME"
      :offset="lightboxOffset"
      :opacity="lightboxOpacity"
      :show="show"
    >
      <SModalContainer :class="MODAL_CONTAINER_CLASSNAME" :show="show">
        <SHitbox :class="MODAL_HITBOX_CLASSNAME" @click="onClose" />
        <SModalCard
          :class="MODAL_CARD_CLASSNAME"
          :show="show"
          :theme-colors="themeColors"
          :max-width="userOptions.length < 3 ? 500 : 800"
        >
          <template v-for="(provider, index) in userOptions">
            <Provider
              v-if="provider"
              :key="index"
              :name="provider.name"
              :logo="provider.logo"
              :description="provider.description"
              :theme-colors="themeColors"
              @onClick="provider.onClick"
            />
          </template>
        </SModalCard>
      </SModalContainer>
    </SLightbox>
  </transition>
</template>

<script lang="ts">
import styled from "vue3-styled-components"
import { defineComponent, inject, onMounted, onUpdated, ref } from "vue"
import {
  MODAL_LIGHTBOX_CLASSNAME,
  MODAL_CONTAINER_CLASSNAME,
  MODAL_HITBOX_CLASSNAME,
  MODAL_CARD_CLASSNAME
} from "../constants"
import Provider from "./Provider.vue"

const SLightbox = styled("div", { offset: Number, opacity: Number, show: Boolean })`
  text-align: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin-left: -50vw;
  top: ${({ offset }) => (offset ? `-${offset}px` : 0)};
  left: 50%;
  z-index: 2;
  will-change: opacity;
  background-color: ${({ opacity }) => {
    let alpha = 0.4
    if (typeof opacity === "number") {
      alpha = opacity
    }
    return `rgba(0, 0, 0, ${alpha})`
  }};

  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    box-sizing: border-box !important;
  }
`
const SModalContainer = styled("div", { show: Boolean })`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
`
const SHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const SModalCard = styled("div", { themeColors: Object, show: Boolean, maxWidth: Number })`
  position: relative;
  width: 100%;
  background-color: ${({ themeColors }) =>
    themeColors ? themeColors.background : "rgb(255, 255, 255)"};
  border-radius: 12px;
  margin: 10px;
  padding: 0;

  pointer-events: ${({ show }) => (show ? "auto" : "none")};

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "800px")};
  min-width: fit-content;
  max-height: 100%;
  overflow: auto;
  @media screen and (max-width: 768px) {
    max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "500px")};
    grid-template-columns: 1fr;
  }

}
`

export default defineComponent({
  name: "Modal",
  components: { SModalCard, SHitbox, SModalContainer, SLightbox, Provider },
  props: {
    themeColors: {
      type: Object,
      required: true
    },
    userOptions: {
      type: Array,
      required: true
    },
    lightboxOpacity: {
      type: Number,
      default: 0.4
    }
  },
  emits: ["onClose"],
  setup(props, { emit }) {
    const lightboxRef = ref<typeof SLightbox>()
    const lightboxOffset = ref(0)
    const show = inject("show")

    // mounted
    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.updateWeb3Modal = this
    })

    // updated
    onUpdated(() => {
      if (lightboxRef.value) {
        const _lightboxRect = lightboxRef.value
        const _lightboxOffset = _lightboxRect.top > 0 ? _lightboxRect.top : 0

        if (_lightboxOffset !== lightboxOffset.value) {
          lightboxOffset.value = _lightboxOffset
        }
      }
    })

    const onClose = () => {
      emit("onClose")
    }

    return {
      show,
      onClose,
      lightboxOffset,
      MODAL_LIGHTBOX_CLASSNAME,
      MODAL_CONTAINER_CLASSNAME,
      MODAL_HITBOX_CLASSNAME,
      MODAL_CARD_CLASSNAME
    }
  }
})
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
