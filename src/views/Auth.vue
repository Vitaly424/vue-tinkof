<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', { invalid: pError }]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" />
      <small v-if="eError">{{ pError }}</small>
    </div>

    <button
      class="btn primary"
      type="submit"
      :disabled="isSubmitting || isTooManyAttempts"
    >
      Войти
      <span v-if="loading">Загрузка...</span>
    </button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком частов пытаетесь войти в систему. Попробуйте позже
    </div>
  </form>

  <div class="card">
    <p>Логин - v@mail.ru</p>
    <p>Пароль - 123456</p>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useLoginForm } from "../use/login-form";
import { error } from "../utils/error";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    if (route.query.message) {
      store.dispatch("setMessage", {
        value: error(route.query.message),
        type: "warning",
      });
    }

    return {
      ...useLoginForm(),
    };
  },
};
</script>

<style></style>
