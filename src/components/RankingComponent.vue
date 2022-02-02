<template>
  <div class="ranking">
    <h1>Ranking</h1>

    <h3 v-if="!this.dailyDataCompleted">cargando...</h3>

    <button @click="onClickBtn1">Daily Average</button>
    <button @click="onClickBtn2">Last Week Average</button>
    <button @click="onClickBtn3">Last Month Average</button>

    <div v-for="user in users" :key="user.id">
      <p>
        username:
        <router-link
          :to="{ name: 'UserId', params: { username: user.username } }"
        >
          {{ user.username }}
        </router-link>
      </p>

      <div v-if="dailySorted">
        <p>daily avg_steps: {{ user.avg_steps }}</p>
        <p>daily avg_distance: {{ user.avg_distance }}</p>
        <p>daily avg_calories: {{ user.avg_calories }}</p>
        <p>daily avg_active_minutes: {{ user.avg_active_minutes }}</p>
      </div>

      <p>---------------</p>

      <div v-if="weekSorted">
        <p>last week average steps: {{ user.lastWeekAverage.steps }}</p>
        <p>last week average distance: {{ user.lastWeekAverage.distance }}</p>
        <p>last week average calories: {{ user.lastWeekAverage.calories }}</p>
        <p>
          last week average activeMinutes:
          {{ user.lastWeekAverage.activeMinutes }}
        </p>
      </div>

      <p>---------------</p>

      <div v-if="monthSorted">
        <p>last month average steps: {{ user.lastMonthAverage.steps }}</p>
        <p>last month average distance: {{ user.lastMonthAverage.distance }}</p>
        <p>last month average calories: {{ user.lastMonthAverage.calories }}</p>
        <p>
          last month average activeMinutes:
          {{ user.lastMonthAverage.activeMinutes }}
        </p>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import general from "../general/general";
import axiosConfig from "../general/axios-config";
import { getUserAverage, isLastWeek, isLastMonth } from "../general/utils";

export default {
  name: "RankingComponent",
  props: {},
  data() {
    return {
      users: [],
      dailyDataCompleted: false,
      dailySorted: false,
      weekSorted: false,
      monthSorted: false,
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

    getLastWeekAverage() {
      this.users.forEach((user, index) => {
        let dailyData = user.user_daily_data;

        let filteredData = dailyData.filter((item) => {
          return isLastWeek(item.date);
        });
        this.users[index].lastWeekAverage = getUserAverage(filteredData);
      });
    },

    getLastMonthAverage() {
      this.users.forEach((user, index) => {
        let dailyData = user.user_daily_data;

        let filteredData = dailyData.filter((item) => {
          return isLastMonth(item.date);
        });

        this.users[index].lastMonthAverage = getUserAverage(filteredData);
      });
    },

    sortByDailySteps(users) {
      this.dailySorted = true;
      this.weekSorted = false;
      this.monthSorted = false;

      return users.sort((a, b) => b.avg_steps - a.avg_steps);
    },

    sortByWeekSteps(users) {
      this.dailySorted = false;
      this.weekSorted = true;
      this.monthSorted = false;

      return users.sort((a, b) => {
        if (!a.lastWeekAverage.steps) {
          return 1;
        }
        if (!b.lastWeekAverage.steps) {
          return -1;
        }
        return b.lastWeekAverage.steps - a.lastWeekAverage.steps;
      });
    },

    sortByMonthSteps(users) {
      this.dailySorted = false;
      this.weekSorted = false;
      this.monthSorted = true;

      return users.sort((a, b) => {
        if (!a.lastMonthAverage.steps) {
          return 1;
        }
        if (!b.lastMonthAverage.steps) {
          return -1;
        }
        return b.lastMonthAverage.steps - a.lastMonthAverage.steps;
      });
    },

    onClickBtn1() {
      this.users = this.sortByDailySteps(this.users);
    },

    onClickBtn2() {
      this.users = this.sortByWeekSteps(this.users);
    },

    onClickBtn3() {
      this.users = this.sortByMonthSteps(this.users);
    },
  }, //methods

  beforeMount() {
    this.getUsers();
  },

  updated() {
    if (this.users.length > 0 && !this.users[0].user_daily_data) {
      this.appendUserDailyDataToUsers();
    }

    if (this.dailyDataCompleted) {
      this.dailyDataCompleted = false;
      this.getLastMonthAverage();
      this.getLastWeekAverage();
      this.users = this.sortByDailySteps(this.users);

      console.log(this.users);
    }
  },
};
</script>






<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
