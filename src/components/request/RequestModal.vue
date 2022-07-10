<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{ invalid: fError }">
      <label for="fio">Имя</label>
      <input type="text" id="fio" v-model="fio" @blur="fBlur" />
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: pError }">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone" ref="maskTelephone"/>
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: aError }">
      <label for="amount">Суммы</label>
      <input type="number" id="amount" v-model.number="amount" @blur="aBlur" />
      <small v-if="aError">{{ aError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting" type="submit">
      Создать
    </button>
  </form>
</template>

<script>
import { useRequestForm } from "../../use/request-form";
import { useStore } from "vuex";
import { useIMask } from "vue-imask";

export default {
  emits: ["created"],
  setup(_, { emit }) {
    const store = useStore();
    const { el: maskTelephone, masked } = useIMask({
      mask: "+7 000 000-00-00",
      startsWith: "7",
      lazy: false,
      country: "Russia",
    });

    const submit = async (values) => {
      await store.dispatch("request/create", values);
      emit("created");
    };

    return {
      maskTelephone,
      ...useRequestForm(submit),
    };
  },
};
</script>
