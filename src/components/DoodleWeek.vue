<template>
  <div class="doodle_week">
    <div v-for="(day, i) in weekDays" v-bind:key="i">
      {{ day.format('ddd DD') }}
    </div>

    <DoodleLine
      v-for="(player, playerIndex) in lineup.players"
      v-bind:key="`${daysOffset}.${player._id}`"
      :player="{
        role: player.role,
        name: player.name,
      }"
      :doodle="player.doodle.slice(daysOffset, daysOffset+7)"
      :touchable="player._id === user._id"
      :onClick="(dayIndex) => changeStatus(dayIndex + daysOffset, playerIndex)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment, { Moment } from 'moment';
import { mapState } from 'vuex';

import DoodleLine from './DoodleLine.vue';

@Component({
  components: {
    DoodleLine,
  },
  computed: mapState(['user', 'lineup']),
})
export default class DoodleWeek extends Vue {
  @Prop() private daysOffset!: number;

  // @Prop() private weekAvailabilities!: Array<{player: {name: string, doodle: Array<number>}}>;
  @Prop() private weekValues!: Array<any>;

  @Prop() private onClick!: Function;

  static generateDays(startOfWeek: Moment) {
    const endOfWeek:Moment = moment(startOfWeek).endOf('isoWeek');

    const days:[Moment?] = [];
    let day:Moment = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }

    return days;
  }

  changeStatus(dayIndex: number, playerIndex: number) {
    this.$store.dispatch('toggleStatus', { dayIndex, playerIndex });
  }

  weekDays = DoodleWeek.generateDays(moment().add(this.daysOffset, 'd').startOf('isoWeek'));
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
