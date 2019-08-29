<template>
  <div id="app">
    <div id="background-wrapper">

      <main v-if="token">

        <template v-if="lineup.name">
          <h1>{{ lineup.name }}</h1>

          <button v-if="change" v-on:click="saveUpdates(lineup.players[0]._id)">Save</button>

          <section>
            <div v-for="day in thisWeek">
              {{ day.format('ddd DD') }}
            </div>

            <div v-for="(player, playerIndex) in lineup.players">
              <h2>{{ player.name }}</h2>

              <div v-for="(day, dayIndex) in player.doodle">
                <div v-on:click="changeStatus(dayIndex, playerIndex)">{{day}}</div>
              </div>
            </div>
          </section>
        </template>

      </main>

      <main v-else>
        Please Login
        <button v-on:click="login">Login</button>
      </main>
      <!-- <section>
        <div v-for="day in nextWeek">
          {{ day.format('ddd DD') }}
        </div>

        <div v-for="player in lineup.players">
          <h2>{{ player.name }}</h2>

          <div v-for="day in player.doodle.slice(7, 14)">
            {{ day }}
          </div>
        </div>
      </section> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import moment, { Moment } from 'moment';
import Cookies from 'js-cookie';

@Component({
  components: {
  },
  computed: mapState(['lineup', 'change', 'user', 'token']),
  beforeCreate() {
    // console.log(process);
    const token = Cookies.get('token');
    console.log('token', token);


    if (token) {
      this.$store.dispatch('loginPlayer', token);
    }
  },
})
export default class App extends Vue {
  login() {
    // window.location.href = `${process.env.VUE_APP_API_URL}/auth/bnet?url=${encodeURIComponent(window.location.href)}&useCookie=true`
    window.location.href = `http://localhost:8080/auth/bnet?url=${encodeURIComponent(window.location.href)}&useCookie=true`;
  }

  changeStatus(dayIndex: Number, playerIndex: Number) {
    this.$store.dispatch('toggleStatus', { dayIndex, playerIndex });
  }

  saveUpdates(playerId: String) {
    this.$store.dispatch('updateDoodle', playerId);
  }

  static week(startOfWeek: Moment) {
    const endOfWeek:Moment = moment(startOfWeek).endOf('isoWeek');

    const days:[Moment?] = [];
    let day:Moment = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }
    console.log(days);

    return days;
  }

  thisWeek = App.week(moment().startOf('isoWeek'));

  nextWeek = App.week(moment().add(7, 'd').startOf('isoWeek'));
}
</script>

<style lang="scss">
@import './style/vars';

html, body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textColor;

  background-image: url('./assets/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#background-wrapper {
  background-image: $blueGradient;
}

main {
  padding: 20px;
}
</style>
