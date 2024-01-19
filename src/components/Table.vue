<template>
    <div>
        <div class="filter" aria-label="filter options">
            <!-- Filter -->
            <!-- module filter -->
            <select v-model="selectedModule">
                <option v-for="(module, i) in modules" :key="i" :value="module.value">
                    {{ module.name }}
                </option>
            </select>

            <!-- status filter -->
            <select v-model="selectedStatus">
                <option v-for="(status, i) in status" :key="i" :value="status.value">
                    {{ status.name }}
                </option>
            </select>

            <!-- lag filter -->
            <select v-model="selectedLag" >
                <option v-for="(lag, i) in lags" :key="i" :value="lag.value">
                    {{ lag.name }}
                </option>
            </select>

            <!-- 선택된 filter 값을 출력 -->
            <span> 필터 : {{ selectedModule }} {{ selectedStatus }} {{ selectedLag }} </span>
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
                    
                    <td>{{ list.key }}</td>
                    <td>{{ list.agent }}</td>
                    <td>{{ list.type }}</td>
                    <td>{{ list.name }}</td>
                    <!-- state 와 data 의 값이 null 인 경우를 대비하여 .? 옵셔널 체이닝 적용 -->
                    <td>{{ list?.state?.data?.lag }}</td>
                    <td>{{ list?.state?.data?.last_processed_time }}</td>
                    <td>{{ list?.state?.status }}</td>
                    <td>{{ list?.state?.code }}</td>
                    <td>{{ list?.state?.message }}</td>
                    <td>{{ list?.state?.start_time }}</td>
                    <td>{{ list?.state?.elapsed_time }}</td>
                </tr>
            </tbody>
        </table>

        </div>
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
            // filteredData: []
        }
    },
    methods:{
        // axiox 를 통한 데이터 불러오기
        fetchData(){
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

            }, 3000); // 데이터는 5초마다 갱신

            // setInterval() 함수를 중단
            clearInterval(setInterval);
        },
        
    },
    
    computed: {
            
        //  module & status filter : 모듈 & 상태 필터
        filteredData() {
            // 조건문 기본값이 '' 일때 전체 All 출력
            return this.getData
            .filter(list => {
                // Show all data if selectedModule is empty
                if (this.selectedModule === '') {
                return true;
                }
                return list.type === this.selectedModule;
            })

            .filter(list => {
                // Show all data if selectedModule is empty
                if (this.selectedStatus === '') {
                return true;
                }
                return list.state.status === this.selectedStatus;
            })
            
            // Lag asc & desc : Lag 에 따른 오름차순 & 내림차순
            .sort((a, b) => {
                if (this.selectedLag === 'asc') {
                    return a?.state?.data?.lag - b?.state?.data?.lag;
                } else if (this.selectedLag === 'desc') {
                    return b?.state?.data?.lag - a?.state?.data?.lag;
                } else {
                    // 기본 정렬 방향 지정 (생략 시 오름차순)
                    return 0;
                }
            })
        }
    },


    created() {
    this.fetchData();
  }

}
</script>

<style scoped>

.table{
    border: 1px solid gray;
    text-wrap: nowrap;
}
.thead{
    background-color: gray;
    color: white;
}
.thead tr th{
    padding: 0.5rem 1rem;
}
.tbody tr td{
    padding: 0.5rem 1rem;

}
.filter{
    display: flex;
    align-items: center;
    gap: 1rem;
}
select{
    padding: 0.5rem 1rem;
    margin: 1rem 0;
    border-radius: 5px;
    cursor: pointer;
}

</style>