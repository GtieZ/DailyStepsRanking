<template>
  <div class="userId">
    <p v-if="this.data.lenght == 0">cargando</p>
    <h1>This is UserId</h1>

    <button @click="onClick">accion</button>

    <hr />

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
      dataReady: false,
      dataPerYear: null,
      loadDataPerMonth: false
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
        this.dataReady = true;
      });
    },

    getDataPerYear() {
      let dataPerYear = {};

      this.data.forEach((item) => {
        let key = item.date.substring(0, 4);

        if (key in dataPerYear) {
          dataPerYear[key].items.push(item);
        } else {
          dataPerYear[key] = {};
          dataPerYear[key].items = [];
          dataPerYear[key].items.push(item);
        }
      });
      this.dataPerYear = dataPerYear;
      this.loadDataPerMonth = true;
    },

    getDataPerMonth() {
      let keys = Object.keys(this.dataPerYear);

      keys.forEach((key) => {
        let yearArray = this.dataPerYear[key].items;
        let dataPerMonth = [];

        yearArray.forEach((item) => {
          let currentMonthIndex = Number(item.date.substring(5, 7)) - 1;

          if (!dataPerMonth[currentMonthIndex]) {
            dataPerMonth[currentMonthIndex] = [];
            dataPerMonth[currentMonthIndex].push(item);
          } else {
            dataPerMonth[currentMonthIndex].push(item);
          }
        });
        this.dataPerYear[key].dataPerMonth = dataPerMonth;
        this.loadDataPerMonth = false;
      });
    },

    onClick() {

      console.log("dataPerYear: ", this.dataPerYear);

    },
  },

  monted() {},

  updated() {
    if (this.dataReady && !this.dataPerYear) {
      this.getDataPerYear(); 
    }
    if(this.loadDataPerMonth){
      this.getDataPerMonth();
      console.log("listo");
    }
  },

  beforeMount() {
    this.getUserData();
  },
};
</script>
