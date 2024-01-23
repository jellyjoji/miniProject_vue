<template>
  <div class="currentTime" aria-label="currentTime">
    <!-- 현재 시간 표시 -->
    <span class="timeFormat tooltip">
      {{ timeFormat }}

      <!-- 툴팁 안내 -->
      <span class="tooltip-text">데이터는 5초마다 갱신됩니다.</span>
    </span>
  </div>

  <div>
    <div class="filter" aria-label="filter options">
      <!-- Filter -->
      <!-- module filter -->
      <label for="selectedModule">모듈</label>
      <select v-model="selectedModule" id="selectedModule">
        <option v-for="(module, i) in modules" :key="i" :value="module.value">
          {{ module.name }}
        </option>
      </select>

      <!-- status filter -->
      <label for="selectedStatus">상태</label>
      <select v-model="selectedStatus" id="selectedStatus">
        <option v-for="(status, i) in status" :key="i" :value="status.value">
          {{ status.name }}
        </option>
      </select>

      <!-- lag filter -->
      <label for="selectedLag">Lag</label>
      <select v-model="selectedLag" id="selectedLag">
        <option v-for="(lag, i) in lags" :key="i" :value="lag.value">
          {{ lag.name }}
        </option>
      </select>

      <!-- 선택된 filter 값을 출력 -->
      <span>
        선택 : {{ selectedModule }} {{ selectedStatus }} {{ selectedLag }}
      </span>
    </div>

    <!-- Data List Table -->
    <table class="table">
      <thead class="thead">
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="list in filteredData" :key="list.key">
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
  name: "Home",
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

      // filter 선택지
      modules: [
        { name: "All", value: "" },
        { name: "Extract", value: "Extract" },
        { name: "Send", value: "Send" },
        { name: "Post", value: "Post" },
      ],
      status: [
        { name: "All", value: "" },
        { name: "Running", value: "Running" },
        { name: "Stopped", value: "Stopped" },
        { name: "Error", value: "Error" },
      ],
      lags: [
        { name: "All", value: "" },
        { name: "Ascending", value: "asc" },
        { name: "Descending", value: "desc" },
      ],
      // filter 의 기본값
      selectedModule: "",
      selectedStatus: "",
      selectedLag: "",

      //   currentTime
      currentTime: new Date(), // Date 객체로 초기화
      showTooltip: false,
    };
  },
  methods: {
    // axios 를 통한 데이터 불러오기
    async fetchData() {
      // js 로 분류해서 promise async await 으로 받기
      this.getData = (await fetchData()).data.data;
    },
  },

  computed: {
    //  module & status filter : 모듈 & 상태 필터
    filteredData() {
      if (!Array.isArray(this.getData)) {
        console.log(Array);
        return [];
      }
      // 조건문 기본값이 '' 일때 전체 All 출력
      return (
        this.getData
          .filter((list) => {
            // Show all data if selectedModule is empty
            if (this.selectedModule === "") {
              return true;
            }
            return list.type === this.selectedModule;
          })

          .filter((list) => {
            // Show all data if selectedStatus is empty
            if (this.selectedStatus === "") {
              return true;
            }
            return list.state.status === this.selectedStatus;
          })

          // Lag asc & desc : Lag 에 따른 오름차순 & 내림차순
          .sort((a, b) => {
            if (this.selectedLag === "asc") {
              if (
                a?.state?.data?.lag !== undefined &&
                b?.state?.data?.lag !== undefined
              ) {
                // `a`와 `b` 모두에 "lag" 속성이 있는 경우 비교
                return a?.state?.data?.lag - b?.state?.data?.lag;
              } else {
                // `a` 또는 `b` 중 하나에 "lag" 속성이 없는 경우 "lag" 속성이 있는 항목을 우선시
                return a?.state?.data?.lag !== undefined ? -1 : 1;
              }
            } else if (this.selectedLag === "desc") {
              if (
                a?.state?.data?.lag !== undefined &&
                b?.state?.data?.lag !== undefined
              ) {
                return b?.state?.data?.lag - a?.state?.data?.lag;
              } else {
                return a?.state?.data?.lag !== undefined ? 1 : -1;
              }
            } else {
              // 기본 정렬: 현재 순서 유지
              return 0;
            }
          })
      );
    },

    // 시간 형식을 12:00:00 으로 변경
    timeFormat() {
      return this.currentTime.toLocaleTimeString("ko-KR", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
  },

  created() {
    this.fetchData();
  },

  // get currenTime every 5 second
  mounted() {
    setInterval(() => {
      this.currentTime = new Date();
      this.filteredData;
      console.log("데이터가 5초마다 갱신되고 있습니다");
    }, 5000);
  },
};
</script>

<style scoped>
/* filter */
.filter {
  display: flex;
  align-items: center;
  gap: 1rem;
}
select {
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  cursor: pointer;
}
/* currentTime */
.currentTime {
  display: flex;
  align-items: center;
  justify-content: start;
}
.timeFormat {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
/* tooltip */
.tooltip {
  display: inline-block;
  transition: 0.3s;
}
.tooltip:hover {
  background-color: var(--color-gray);
}

.tooltip-text {
  display: none;
  position: absolute;
  border-radius: 5px;
  padding: 5px;
  font-size: 0.8em;
  color: var(--color-white);
  background: var(--color-black);
  margin-left: -40px;
  margin-top: -60px;
}

.tooltip:hover .tooltip-text {
  display: block;
}
</style>
