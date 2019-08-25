<template>
  <div id="app">
    
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
              <div v-on:click="changeStatus(dayIndex, playerIndex)">{{ day }}</div>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import { mapState } from 'vuex';
import moment, { Moment } from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';


@Component({
  components: {
    HelloWorld,
  },
  computed: mapState(['lineup', 'change', 'user', 'token']),
  beforeCreate() {
    const token = Cookies.get('token')
    console.log('token', token)


    if (token) {
      this.$store.dispatch('loginPlayer', token)
    }
  }
})
export default class App extends Vue {

  login() {
    window.location.href = `http://api.polaris.team/auth/bnet?url=${encodeURIComponent(window.location.href)}&useCookie=true`
  }

  changeStatus(dayIndex: Number, playerIndex: Number) {
    console.log(dayIndex, playerIndex)
    this.$store.dispatch('toggleStatus', {dayIndex, playerIndex})
  }

  saveUpdates(playerId: String) {
    this.$store.dispatch('updateDoodle', playerId)
  }

  week(startOfWeek: Moment) {
    let endOfWeek:Moment = moment(startOfWeek).endOf('isoWeek');

    let days:[Moment?] = [];
    let day:Moment = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }
    console.log(days)

    return days;
  }

  thisWeek = this.week(moment().startOf('isoWeek'));
  nextWeek = this.week(moment().add(7, 'd').startOf('isoWeek'));

  

  


  

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
