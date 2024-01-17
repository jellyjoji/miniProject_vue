<template>
  <h1>time</h1>
  <p>{{ timeFormat }}</p>

</template>

<script>
export default {
    name:'time',
    data(){
      return{
        currentTime: new Date() // Date 객체로 초기화
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

<style>

</style>