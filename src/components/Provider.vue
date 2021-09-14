<template>
  <SProviderWrapper
    :theme-colors="themeColors"
    :class="PROVIDER_WRAPPER_CLASSNAME"
    @click="onClick"
  >
    <SProviderContainer :theme-colors="themeColors" :class="PROVIDER_CONTAINER_CLASSNAME">
      <SIcon :class-name="PROVIDER_ICON_CLASSNAME">
        <img :src="logo" :alt="name" />
      </SIcon>
      <SName :theme-colors="themeColors" :class="PROVIDER_NAME_CLASSNAME">{{ name }}</SName>
      <SDescription :theme-colors="themeColors" :class="PROVIDER_DESCRIPTION_CLASSNAME">{{
        description
      }}</SDescription>
    </SProviderContainer>
  </SProviderWrapper>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */
import { defineComponent } from "vue"
import styled from "vue3-styled-components"
import {
  PROVIDER_WRAPPER_CLASSNAME,
  PROVIDER_CONTAINER_CLASSNAME,
  PROVIDER_ICON_CLASSNAME,
  PROVIDER_NAME_CLASSNAME,
  PROVIDER_DESCRIPTION_CLASSNAME
} from "../constants"

const SIcon = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 50%;
  overflow: visible;
  box-shadow: none;
  justify-content: center;
  align-items: center;

  & img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 8.5vw;
    height: 8.5vw;
  }
`
const SName = styled("div", { themeColors: Object })`
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  margin-top: 0.5em;
  color: ${({ themeColors }) => (themeColors ? themeColors.main : "rgb(12, 12, 13)")};
  @media screen and (max-width: 768px) {
    font-size: 5vw;
  }
`
const SDescription = styled("div", { themeColors: Object })`
  width: 100%;
  font-size: 18px;
  margin: 0.333em 0;
  color: ${({ themeColors }) => (themeColors ? themeColors.secondary : "rgb(169, 169, 188)")};
  @media screen and (max-width: 768px) {
    font-size: 4vw;
  }
`
const SProviderContainer = styled("div", { themeColors: Object })`
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ themeColors }) =>
    themeColors ? themeColors.background : "rgb(255, 255, 255)"};
  border-radius: 12px;
  padding: 24px 16px;
  @media screen and (max-width: 768px) {
    padding: 1vw;
  }
`
const SProviderWrapper = styled("div", { themeColors: Object })`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 0;
  border: ${({ themeColors }) =>
    `1px solid ${themeColors ? themeColors.border : "rgba(195, 195, 195, 0.14)"}`};
  @media (hover: hover) {
    &:hover > div {
      background-color: ${({ themeColors }) =>
        themeColors ? themeColors.hover : "rgba(195, 195, 195, 0.14)"};
    }
  }
`

export default defineComponent({
  name: "Provider",
  components: {
    SProviderWrapper,
    SProviderContainer,
    SDescription,
    SName,
    SIcon
  },
  props: {
    name: {
      type: String
    },
    logo: {
      type: Object
    },
    description: {
      type: String
    },
    themeColors: {
      type: Object
    }
  },
  emits: ["onClick"],
  setup(props, { emit }) {
    // methods
    const onClick = () => {
      emit("onClick")
    }

    return {
      onClick,
      PROVIDER_WRAPPER_CLASSNAME,
      PROVIDER_CONTAINER_CLASSNAME,
      PROVIDER_ICON_CLASSNAME,
      PROVIDER_NAME_CLASSNAME,
      PROVIDER_DESCRIPTION_CLASSNAME
    }
  }
})
</script>
