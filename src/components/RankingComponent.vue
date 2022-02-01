<template>
  <div class="ranking">
    <h1>Ranking</h1>

    <button @click="onClick">Sort by steps</button>
    <button>Sort by distance</button>
    <button>Sort by calories</button>
    <button>Sort by minutes</button>

    <div v-for="user in users" :key="user.id">
      <p>id: {{ user.id }}</p>

      <p>
        username:
        <router-link
          :to="{ name: 'UserId', params: { username: user.username } }"
        >
          {{ user.username }}
        </router-link>
      </p>

      <p>email: {{ user.email }}</p>
      <p>date_joined: {{ user.date_joined }}</p>
      <p>avg_steps: {{ user.avg_steps }}</p>
      <p>avg_distance: {{ user.avg_distance }}</p>
      <p>avg_calories: {{ user.avg_calories }}</p>
      <p>avg_active_minutes: {{ user.avg_active_minutes }}</p>



      <h3>dailyData:</h3>
      

      <div  v-for="item in user.user_daily_data" :key="item.id">

        <p>---------------</p>

        <p>active_minutes: {{ item.active_minutes }}</p>
        <p>calories: {{ item.calories }}</p>
        <p>date: {{ item.date }}</p>
        <p>distance: {{ item.distance }}</p>
        <p>id: {{ item.id }}</p>
        <p>steps: {{ item.steps }}</p>
        <p>user: {{ item.user }}</p>


      </div>

      <hr />

    </div>
  </div>
</template>

<script>
import axios from "axios";
import general from "../general/general";
import axiosConfig from "../general/axios-config";

//import { isLastWeek, isLastMonth } from '../general/utils'

export default {
  name: "RankingComponent",
  props: {},
  data() {
    return {
      users: [],
      dailyDataCompleted: false,
    };
  },
  methods: {
    getUsers() {
      let config = axiosConfig;
      let url = general.url;
      let endpoint = url + "users/";

      axios.get(endpoint, config).then((response) => {
        this.users = response.data.results;
      });
    },

    async getUserData(username) {
      let config = axiosConfig;
      let url = general.url;
      let endpoint = url + username + "/workouts";

      let userData = await axios.get(endpoint, config);
      return userData.data.results;
    },

    async appendUserDailyDataToUsers() {
      for (let i = 0; i < this.users.length; i++) {
        let userDailyData = await this.getUserData(this.users[i].username);
        this.users[i].user_daily_data = userDailyData;
      }
      this.dailyDataCompleted = true;
    },

 



    onClick() {
      
      

    },





    sortBySteps(users) {
      return users.sort((a, b) => b.avg_steps - a.avg_steps);
    },

    sortByDistance(users) {
      return users.sort((a, b) => b.avg_distance - a.avg_distance);
    },

    sortByCalories(users) {
      return users.sort((a, b) => b.avg_calories - a.avg_calories);
    },

    sortByActiveMinutes(users) {
      return users.sort((a, b) => b.active_minutes - a.active_minutes);
    },
  },




  beforeMount() {
    this.getUsers();
  },

  updated(){
    if(this.users.length > 0 && !this.users[0].user_daily_data){
      this.appendUserDailyDataToUsers();
    }

    

  },





};
</script>






<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
