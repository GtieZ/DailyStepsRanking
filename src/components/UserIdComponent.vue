<template>
  <div class="userId">
    <h1>This is UserId</h1>

    <div v-for="item in data" :key="item.id">
      <p>id: {{ item.id }}</p>
      <p>date: {{ item.date }}</p>
      <p>steps: {{ item.steps }}</p>
      <p>distance: {{ item.distance }}</p>
      <p>calories: {{ item.calories }}</p>
      <p>active_minutes: {{ item.active_minutes }}</p>

      <p>user: {{ item.user }}</p>

      <hr />
    </div>
  </div>
</template>


<script>
import axios from "axios";
import general from "../general/general";
import axiosConfig from "../general/axios-config";

export default {
  name: "UserIdComponent",
  props: {},

  data() {
    return {
      data: [],
    };
  },

  methods: {
    getUserData() {
      let config = axiosConfig;
      let url = general.url;
      let username = this.$route.params.username;
      let endpoint = url + username + "/workouts";

      axios.get(endpoint, config).then((response) => {
        this.data = response.data.results;
      });
    },

  },

  monted() {},

  beforeMount() {
    this.getUserData();
  },

  
};
</script>
