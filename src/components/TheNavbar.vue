<template>
  <nav class="navbar">
    <router-link to="/" style="color: black">Online Bank</router-link>

    <ul :class="['navbar-menu', { active: isOpenMenu }]">
      <li>
        <router-link to="/">Заявки</router-link>
      </li>

      <li>
        <router-link to="/help">Помощь</router-link>
      </li>

      <li>
        <a href="#" @click.prevent="open">Сообщение</a>
      </li>

      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>

    <button class="btn-menu" @click="openMenu">
      <img src="@/assets/img/menu.svg" alt="Меню" />
    </button>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const isOpenMenu = ref(false);

    return {
      logout: () => {
        store.commit("auth/logout");
        router.push("/auth");
      },
      isOpenMenu,
      open() {
        store.commit("openSidebar");
      },
      openMenu() {
        isOpenMenu.value = !isOpenMenu.value;
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
