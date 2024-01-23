<template>
  <div>
    <!-- Raw Data List Table -->
    <table class="table">
      <thead class="thead">
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="list in getData" :key="list.key">
          <td>{{ list.type }}</td>
          <td>{{ list.name }}</td>
          <!-- state 와 data 의 값이 null 인 경우를 대비하여 .? 옵셔널 체이닝 적용 -->
          <td>{{ list?.state?.data?.lag }}</td>
          <td>{{ list?.state?.data?.last_processed_time }}</td>
          <td>{{ list?.state?.status }}</td>
          <td>{{ list?.state?.start_time }}</td>
          <td>{{ list?.state?.elapsed_time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import fetchData from "../assets/fetchData.js";

export default {
  name: "Data",
  data() {
    return {
      getData: [],
      // Table 생성을 위한 Table column list
      columns: [
        "type",
        "name",
        "lag",
        "last processed time",
        "status",
        "start time",
        "elapsed time",
      ],
    };
  },
  methods: {
    // axiox 를 통한 데이터 불러오기
    async fetchData() {
      // js 로 분류해서 promise aync await 으로 받기
      this.getData = (await fetchData()).data.data;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
