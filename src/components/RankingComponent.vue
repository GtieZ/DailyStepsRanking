<template>
  <div class="ranking container">
    <h3 v-if="!this.dailyDataCompleted"></h3>

    <div v-if="!checkLoading" class="mt-4">
      <h2 class="text-dark mb-4">
        <strong>STEP RANKING</strong>
      </h2>
      <button class="btn btn-dark" @click="onClickBtn1">Daily Average</button>
      <button class="btn btn-dark mx-2" @click="onClickBtn2">
        Last Week Average
      </button>
      <button class="btn btn-dark" @click="onClickBtn3">
        Last Month Average
      </button>
    </div>

    <div v-if="checkLoading">
      <h4 class="text-dark mb-3">loading...</h4>
      <p><em>(it can take longer)</em></p>
      <img
        src="../assets/images/loading.gif"
        alt="loading.."
        class="load-gif"
      />
    </div>

    <div v-for="user in users" :key="user.id" class="mt-5">
      <!-- CARDS -->
      <div
        class="card mx-3 my-4 info-card text-white bg-dark border-white"
        style="width: 18rem"
      >
        <div class="card-header text-end bg-light">
          <router-link class="text-primary"
            :to="{ name: 'UserId', params: { username: user.username } }"
          >
            @{{ user.username }}
          </router-link>
        </div>
        <!-- SORTED DAILY -->
        <div v-if="dailySorted">
          <div class="card-body">
            <p class="card-text">
              <em>Daily Average Steps:</em>
            </p>
            <h2 class="card-title">
              {{ user.avg_steps }}
            </h2>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item bg-dark"></li>
            <li class="list-group-item bg-light">
              <em>daily average distance: </em>
              <strong>{{ user.avg_distance }}</strong>
            </li>
            <li class="list-group-item bg-light">
              <em>daily average calories: </em>
              <strong>{{ user.avg_calories }}</strong>
            </li>
            <li class="list-group-item bg-light">
              <em>daily average active minutes: </em>
              <strong>{{ user.avg_active_minutes }}</strong>
            </li>
          </ul>
        </div>
        <!-- SORTED LAST WEEK -->
        <div v-if="weekSorted && user.lastWeekAverage.steps">
          <div class="card-body">
            <p class="card-text">
              <em>Last Week Average Steps:</em>
            </p>
            <h2 class="card-title">
              {{ user.lastWeekAverage.steps }}
            </h2>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item bg-dark"></li>
            <li class="list-group-item bg-light">
              <em>last week average distance: </em>
              <strong>{{ user.lastWeekAverage.distance }}</strong>
            </li>
            <li class="list-group-item bg-light">
              <em>last week average calories: </em>
              <strong>{{ user.lastWeekAverage.calories }}</strong>
            </li>
            <li class="list-group-item bg-light">
              <em>last week average minutes: </em>
              <strong>{{ user.lastWeekAverage.activeMinutes }}</strong>
            </li>
          </ul>
        </div>
        <!-- SORTED LAST MONTH -->
        <div v-if="monthSorted && user.lastMonthAverage.steps">
          <div class="card-body">
            <p class="card-text">
              <em>Last Month Average Steps:</em>
            </p>
            <h2 class="card-title">
              {{ user.lastMonthAverage.steps }}
            </h2>
          </div>

          <ul class="list-group list-group-flush">
            <li class="list-group-item bg-dark"></li>
            <li class="list-group-item bg-light">
              <em>last month average distance: </em>
              <strong>{{ user.lastMonthAverage.distance }}</strong>
            </li>
            <li class="list-group-item bg-light">
              <em>last month average calories: </em>
              <strong>{{ user.lastMonthAverage.calories }}</strong>
            </li>
            <li class="list-group-item bg-light">
              <em>last month average minutes: </em>
              <strong>{{ user.lastMonthAverage.activeMinutes }}</strong>
            </li>
          </ul>
        </div>
        <!-- CARD FOOTER -->
        <div class="card-footer"></div>
      </div>
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
      checkLoading: true,
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
      this.checkLoading = false;
    }
  },
};
</script>


<style>
.info-card {
  float: left;
}

.load-gif {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: -80px -87px;
}
</style>
