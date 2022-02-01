<template>
  <div class="ranking">

    <h1>Ranking</h1>

    <button>Sort by steps</button>
    <button>Sort by distance</button>
    <button>Sort by calories</button>
    <button>Sort by minutes</button>
  

    <div v-for="user in users" :key="user.id">
      <p>id: {{ user.id }}</p>


      <p>
        username: 
        <router-link :to="{ name: 'UserId',  params: { username: user.username }}">
          {{ user.username }}
        </router-link>
      </p>


      <p>email: {{ user.email }}</p>
      <p>date_joined: {{ user.date_joined }}</p>
      <p>avg_steps: {{ user.avg_steps }}</p>
      <p>avg_distance: {{ user.avg_distance }}</p>
      <p>avg_calories: {{ user.avg_calories }}</p>
      <p>avg_active_minutes: {{ user.avg_active_minutes }}</p>
      <hr />


    </div>
  </div>
</template>

<script>
import axios from "axios";
import general from "../general/general";

export default {
  name: "RankingComponent",
  props: {

  },
  data() {
    return {
      data: undefined,
      users: [],
    };
  },
  methods: {
    getUsers() {
      let token = general.token;
      let config = {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json",
        },
        params: { limit: 1000 },
      };

      let url = general.url;
      let endpoint = url + "users/";

      axios.get(endpoint, config).then((response) => {
        this.data = response.data;
        this.users = this.sortBySteps(this.data.results);
      });
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



};
</script>






<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
