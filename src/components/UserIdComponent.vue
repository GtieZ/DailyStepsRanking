<template>
  <div class="userId">

    <p v-if="this.data.lenght == 0">cargando</p>
    <h1>UserId: @{{ username }}</h1>

    <button @click="onClick">accion</button>

    <div v-if="showGraph">
      <BarGraphComponent :series="getSeries(0)" />

    </div>

    

    <hr />


    <div v-if="generalMonthAverage.length > 0">
      <div v-for="(item, i) in generalMonthAverage" :key="i">
        <h2>{{ item.year }}</h2>
        <p>-------------------</p>
        <div v-for="(month, index) in item.monthlyAverageList" :key="index">
          <h3>Month: {{ index + 1 }}</h3>

          <p>avg_steps: {{ month.avg_steps }}</p>
          <p>avg_distance: {{ month.avg_distance }}</p>
          <p>avg_calories: {{ month.avg_calories }}</p>
          <p>avg_active_minutes: {{ month.avg_active_minutes }}</p>
          <hr />
        </div>

        <hr />
      </div>
    </div>

  </div>
</template>


<script>
import axios from "axios";
import general from "../general/general";
import axiosConfig from "../general/axios-config";
import BarGraphComponent from "./BarGraphComponent.vue";

export default {
  name: "UserIdComponent",
  props: {},
  components: {
    BarGraphComponent
  },
  data() {
    return {
      username: '',
      data: [],
      generalMonthAverage: [],
      dataReady: false,
      dataPerYear: null,
      loadDataPerMonth: false,
      loadMonthAverage: false,
      showGraph: false,
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
        this.loadMonthAverage = true;
        this.loadDataPerMonth = false;
      });
    },

    setGeneralMonthAverage() {
      let keys = Object.keys(this.dataPerYear);
      let generalMonthAverage = [];

      keys.forEach((key, i) => {
        let monthArray = this.dataPerYear[key].dataPerMonth;
        let monthAverageArray = [];

        monthArray.forEach((itemArray, index) => {
          let totalSteps = 0;
          let totalDistance = 0;
          let totalCalories = 0;
          let totalMinutes = 0;

          itemArray.forEach((item) => {
            totalSteps += Number(item.steps);
            totalDistance += Number(item.distance);
            totalCalories += Number(item.calories);
            totalMinutes += Number(item.active_minutes);
          });

          let averageSteps = totalSteps / itemArray.length;
          let averageDistance = totalDistance / itemArray.length;
          let averageCalories = totalCalories / itemArray.length;
          let averageMinutes = totalMinutes / itemArray.length;

          monthAverageArray[index] = {
            avg_steps: Math.round(averageSteps),
            avg_distance: Math.round(averageDistance),
            avg_calories: Math.round(averageCalories),
            avg_active_minutes: Math.round(averageMinutes),
          };
        });

        generalMonthAverage[i] = {
          year: key,
          monthlyAverageList: monthAverageArray,
        };
      });
      this.generalMonthAverage = generalMonthAverage;
      this.loadMonthAverage = false;
    },

    getSeries(yearIndex){
      let monthAverageList = this.generalMonthAverage[yearIndex].monthlyAverageList;

      let stepsList = [];
      let distanceList = [];
      let caloriesList = [];
      let minutesList = [];
      monthAverageList.forEach((item) => {
        stepsList.push(item.avg_steps);
        distanceList.push(item.avg_distance);
        caloriesList.push(item.avg_calories);
        minutesList.push(item.avg_active_minutes);
      });
    
      let series = [
        {
          name: 'Average Monthly Steps', 
          data: stepsList
        },
        {
          name: 'Average Monthly Distance', 
          data: distanceList
        },
        {
          name: 'Average Monthly Calories', 
          data: caloriesList
        },
        {
          name: 'Average Monthly Active Minutes', 
          data: minutesList
        }
      ];
      return series;
    },

    onClick() {

      this.showGraph = true;
      console.log(this.getSeries(0));


     


      console.log("---------------------------------")
      console.log("generalMonthAverage: ", this.generalMonthAverage);
    },
  },

  updated() {
    if (this.dataReady && !this.dataPerYear) {
      this.getDataPerYear();
    }
    if (this.loadDataPerMonth) {
      this.getDataPerMonth();
    }
    if (this.loadMonthAverage) {
      this.setGeneralMonthAverage();
    }
  },

  mounted(){
    this.username = this.$route.params.username;
  },

  beforeMount() {
    this.getUserData();
  },
};
</script>
