<template>
  <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
  <div class="wrapper-table" v-else>
    <table class="table">
      <thead>
        <tr>
          <th>№</th>
          <th>Имя</th>
          <th>ТЕЛЕФОН</th>
          <th>Сумма</th>
          <th>Статус</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, idx) in requests" :key="r.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ r.fio }}</td>
          <td>{{ r.phone }}</td>
          <td>{{ currency(r.amount) }}</td>
          <td>
            <AppStatus :type="r.status" />
          </td>
          <td>
            <router-link
              v-slot="{ navigate }"
              custom
              @click="navigate"
              :to="{ name: 'Request', params: { id: r.id } }"
            >
              <button class="btn" @click="navigate">Открыть</button>
            </router-link>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { currency } from "../../utils/currency";
import AppStatus from "../ui/AppStatus";

export default {
  props: ["requests"],
  components: {
    AppStatus,
  },
  setup() {
    return {
      currency,
    };
  },
};
</script>

<style scoped>
 
</style>
