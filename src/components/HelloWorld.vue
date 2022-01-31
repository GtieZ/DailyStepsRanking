<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div v-for="user in users.results" :key="user.id">
      
      <p>id: {{user.id}}</p>
      <p>username: {{user.username}}</p>
      <p>email: {{user.email}}</p>
      <p>date_joined: {{user.date_joined}}</p>
      <p>avg_steps: {{user.avg_steps}}</p>
      <p>avg_distance: {{user.avg_distance}}</p>
      <p>avg_calories: {{user.avg_calories}}</p>
      <p>avg_active_minutes: {{user.avg_active_minutes}}</p>
      <hr>

    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      users: "",
    };
  },

  beforeMount() {
    let config = {
      headers: {
        Authorization: "Token af61aed7399dc6a636e443cdc8a2d55db97c524a",
        "Content-Type": "application/json",
      },
    };

    axios
      .get("https://step-meter-pp4publmdq-ez.a.run.app/users/", config)
      .then((response) => {
        this.users = response.data;
      });


  },
};
</script>






<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
