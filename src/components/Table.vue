<template>
  <h1>Table</h1>
  <!-- Filter -->
  <!-- module filter -->
    <select v-model="selectedModule">
        <option v-for="(module, i) in modules" :key="i" :value="module.value">
            {{ module.name }}
        </option>
    </select>
    <span>{{ selectedModule }} 선택</span>

    <!-- status filter -->
    <select v-model="selectedStatus">
        <option v-for="(status, i) in status" :key="i" :value="status.value">
            {{ status.name }}
        </option>
    </select>
    <span>{{ selectedStatus }} 선택</span>

    <!-- lag filter -->
    <select v-model="selectedLag" >
        <option v-for="(lag, i) in lags" :key="i" :value="lag.value">
            {{ lag.name }}
        </option>
    </select>
    <span>{{ selectedLag }} 선택</span>

  <!-- Data List Table -->
  <table>
    <thead>
        <tr style="background-color: gray;">
            <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="list in filteredData" :key="list.key">
            
            <td>{{ list.key }}</td>
            <td>{{ list.agent }}</td>
            <td>{{ list.type }}</td>
            <td>{{ list.name }}</td>
            <!-- state 와 data 의 값이 null 인 경우를 대비하여 .? 옵셔널 체이닝 적용 -->
            <td>{{ list?.state?.data?.lag }}</td>
            <td>{{ list?.state?.data.last_processed_time }}</td>
            <td>{{ list?.state?.status }}</td>
            <td>{{ list?.state?.code }}</td>
            <td>{{ list?.state?.message }}</td>
            <td>{{ list?.state?.start_time }}</td>
            <td>{{ list?.state?.elapsed_time }}</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios'

export default {
    name:'Table',
    data(){
        return{
            getData:[],
            // Table 생성을 위한 Table column list
            // columns:['key','agent','type','name','lag','status','code','message','start time','elapsed time'],
            columns:['key','agent','type','name','lag','last processed time','status','code','message','start time','elapsed time'],
            
            // filter 선택지
            modules:[
                {name:'All', value:''},
                {name:'Extract', value:'Extract'},
                {name:'Send', value:'Send'},
                {name:'Post', value:'Post'},
            ],
            status:[
                {name:'All', value:''},
                {name:'Running', value:'Running'},
                {name:'Stopped', value:'Stopped'},
                {name:'Error', value:'Error'},
            ],
            lags:[
                {name:'All', value:''},
                {name:'Ascending', value:'asc'},
                {name:'Descending', value:'desc'},
            ],
            // filter 의 기본값
            selectedModule:'',
            selectedStatus:'',
            selectedLag:'',

            // fillter Data 의 초기값 
            filteredData: []
        }
    },
    methods:{
        // axiox 를 통한 데이터 불러오기
        fetchData(){
            // data 5초마다 갱신 : setInterval 5000
            setInterval(() => {

            axios.get('http://172.16.0.60:38080/api/open/module/list',{
            headers: {
                        'Authorization': 'Bearer dGVzdG1hbmFnZXI=',
                },
            })
            .then(result => {
                this.getData = result.data.data;
            })
            .catch(error => {
                console.error(error);
                
            });
            
            console.log("데이터가 5초마다 갱신되고 있습니다");
            // this.filteredData = this.getData.filter(list => list.type === this.selectedModule);
            // this.filteredData = this.getData.filter(list => list.state.status === this.selectedStatus);
            // this.filteredData = this.getData.filter(list => list.state.data.lag === this.selectedLag);


            }, 1000); // Execute every 5 second

            // setInterval() 함수를 중단
            clearInterval(setInterval);
        },
        
    },
    
    computed: {
            
        // 모듈과 상태 필터
        filteredData() {
            return this.getData
            // 조건문 selectedModule 이 all 아닐때 조건을 충족하도록 하는 and 연산자  혹은 '' 일때 전체가 보이게 하기
            .filter(list =>list.type === this.selectedModule)              
            .filter(list => list.state.status === this.selectedStatus)
            // Lag 순 정렬
            .sort((a, b) => {
                if (this.selectedLag === 'asc') {
                    return a.state.data.lag - b.state.data.lag;
                } else if (this.selectedLag === 'desc') {
                    return b.state.data.lag - a.state.data.lag;
                } else {
                    // 기본 정렬 방향 지정 (생략 시 오름차순)
                    return a.state.data.lag - b.state.data.lag;
                }
            })
        }
    },


    created() {
    this.fetchData();
  }

}
</script>

<style>

</style>