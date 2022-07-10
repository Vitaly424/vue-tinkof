<template>
  <app-loader v-if="loading" />

  <app-page v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <request-modal @created="modal = false" />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import AppPage from "@/components/ui/AppPage.vue";
import RequestTable from "@/components/request/RequestTable.vue";
import RequestModal from "@/components/request/RequestModal.vue";
import RequestFilter from "../components/request/RequestFilter.vue";
import AppModal from "@/components/ui/AppModal.vue";
import AppLoader from "../components/ui/AppLoader.vue";

export default {
  name: "Home",
  components: {
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
  },

  setup() {
    const modal = ref(false);
    const store = useStore();
    const filter = ref({});

    const requests = computed(() =>
      store.getters["request/requests"]
        .filter((request) => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name);
          }

          return request;
        })
        .filter((request) => {
          if (filter.value.status) {
            return filter.value.status === request.status;
          }
          return request;
        })
    );

    const loading = ref(false);

    onMounted(async () => {
      loading.value = true;
      await store.dispatch("request/load");
      loading.value = false;
    });

    watch(filter, (val) => console.log(val));

    return {
      modal,
      requests,
      loading,
      RequestFilter,
      filter,
    };
  },
};
</script>
