<template>
  <div class="doodle_week">
    <div class="doodle_week_head doodle_line">
      <div class="doodle_week_row_label"></div>
      <div class="doodle_week_cell" v-for="(day, i) in weekDays" v-bind:key="i">
        {{ day.format('ddd DD') }}
      </div>
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
.doodle_week_head {
  display: flex;
}
.doodle_week {
  margin-bottom: 40px;
}
</style>

<style lang="scss">
.doodle_week_row_label {
  flex-basis: 150px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  flex-shrink: 0;
}
.doodle_week_cell {
  flex-basis: 50px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  display: flex;
}

.doodle_line {
  display: flex;
  padding: 5px;
  margin: 5px 0;
  justify-content: space-between;
}

</style>
