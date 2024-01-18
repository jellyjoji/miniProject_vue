<template>
  <h1>Table</h1>
  <!-- Filter -->
  <!-- 모듈 필터 선택 -->
    <select v-model="selectedModule">
        <option v-for="(module, i) in modules" :key="i" :value="module.value">
            {{ module.name }}
        </option>
    </select>
    <span>{{ selectedModule }} 선택</span>

    <select v-model="selectedStatus">
        <option v-for="(status, i) in status" :key="i" :value="status.value">
            {{ status.name }}
        </option>
    </select>
    <span>{{ selectedStatus }} 선택</span>

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
            <td>{{ list.state.data.lag }}</td>
            <td>{{ list.state.data.last_processed_time }}</td>
            <td>{{ list.state.status }}</td>
            <td>{{ list.state.code }}</td>
            <td>{{ list.state.message }}</td>
            <td>{{ list.state.start_time }}</td>
            <td>{{ list.state.elapsed_time }}</td>
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
            columns:['key','agent','type','name','lag','last processed time','status','code','message','start time','elapsed time'],
            
            // filter 선택지
            modules:[
                {name:'All', value:undefined},
                {name:'Extract', value:'Extract'},
                {name:'Send', value:'Send'},
                {name:'Post', value:'Post'},
            ],
            status:[
                {name:'All', value:undefined},
                {name:'Running', value:'Running'},
                {name:'Stopped', value:'Stopped'},
                {name:'Error', value:'Error'},
            ],
            // filter 의 기본값
            selectedModule:'All',
            selectedStatus:'All',
            // fillter Data 의 초기값 
            filteredData: []
        }
    },
    
    filter:{
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

            this.filteredData = this.getData.filter(item => item.type === this.selectedModule);


        }, 1000); // Execute every 5 second
        },
        
    },
    

    created() {
    this.fetchData();
  }

}
</script>

<style>

</style>