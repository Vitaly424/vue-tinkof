<template>
  <div class="breadcrumbs" v-if="back">
    <router-link class="text-white" to="/">Вернуться на главную</router-link>
  </div>
  <div class="card">
    <div class="card-head">
      <h1 class="card-title">
        {{ title }}
      </h1>
      <slot name="header"></slot>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    back: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    document.title = `${props.title} || Клон Банка`;
  },
};
</script>

<style></style>
