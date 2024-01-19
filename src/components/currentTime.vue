<template>
  <div class="currentTime" aria-label="currentTime">
    <!-- 현재 시간 표시 -->
    <p class="timeFormat">{{ timeFormat }}</p>

    <!-- 툴팁 안내 -->
    <div v-show="showTooltip" class="tooltip">
      <p class="tooltiptext tooltip-top">데이터는 5초마다 갱신됩니다.</p>
    </div>
    <span @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
      <img src="../../public/helpIcon.svg" alt="helpIcon">
    </span>

  </div>
</template>

<script>
export default {
    name:'currentTime',
    data(){
      return{
        currentTime: new Date(), // Date 객체로 초기화
        showTooltip: false
      }
    },
    computed:{
      // 시간 형식을 12:00:00 으로 변경
      timeFormat(){
        return this.currentTime.toLocaleTimeString("ko-KR", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      }
    },

    // get current time in realtime
    mounted() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  },
}
</script>

<style scoped>
.tooltip{
  position: relative;
}
.tooltip .tooltiptext {
  width: 120px;             /* 툴팁 영역의 넓이를 설정 */
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;       /* 절대 위치를 사용 */
  z-index: 1;
}
.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
.tooltip .tooltip-top {
  width: 120px;
  bottom: 150%;
  /* 위치 조정 */
  /* right: 10%; */
  /* margin-left: -60px; */
}

.tooltip .tooltip-top::after {
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-color: black transparent transparent transparent;
}
.currentTime{
  display: flex;
  align-items: center;
  justify-self: center;
  gap: 0.5rem;

}
.timeFormat{
  margin-bottom: 0.3rem;
}

</style>