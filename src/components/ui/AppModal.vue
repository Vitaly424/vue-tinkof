<template>
  <div class="modal-backdrop"></div>
  <div class="modal">
    <small @click="$emit('close')" style="font-size: 25px; display: block; text-align: right;">&times;</small>
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </div>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
