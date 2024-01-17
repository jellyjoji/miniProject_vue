<template>
  <h1>Table</h1>
  <!-- Filter -->
  <table>
    <select v-model="selectedValue">
        <option value="1">Extract</option>
        <option value="2">Send</option>
        <option value="3">Post</option>
    </select>
  </table>

  <!-- Data List Table -->
  <table>
    <thead>
        <tr style="background-color: gray;">
            <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="list in getData" :key="list.key">
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
            selectedValue:'',
            // Table 생성을 위한 Table column list
            columns:['key','agent','type','name','lag','last processed time','status','code','message','start time','elapsed time']
        }
    },
    methods:{
        // axiox 를 통한 데이터 불러오기
        fetchData(){
            axios.get('https://86927d7e-6241-470a-b535-508d30a31fa9.mock.pstmn.io/list')
            .then(result => {
                this.getData = result.data.data;
            })
            .catch(error => {
                console.error(error);
            });
        },
    },
    created() {
    this.fetchData();
  }

}
</script>

<style>

</style>