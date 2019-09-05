<template>
  <div class="doodle_line" v-bind:class="{doodle_line_user: touchable}">
    <div class="doodle_line_name doodle_week_row_label">{{player.name}}</div>
    <div
      class="doodle_week_cell"
      v-for="(day, dayIndex) in doodle"
      v-bind:key="dayIndex"
    >
      <DoodleCheckbox
        :dispoState="day"
        :touchable="touchable"
        :onClick="() => onClick(dayIndex)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DoodleCheckbox from './DoodleCheckbox.vue';

@Component({
  components: {
    DoodleCheckbox,
  },
})
export default class DoodleLine extends Vue {
  @Prop() private touchable!: boolean;

  @Prop() private player!: {name: string, role: Object};

  @Prop() private doodle!: Array<number>;

  @Prop() private onClick!: Function;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/vars';

.doodle_line_user {
  border-radius: 10px;
  background-color: $opacityNavyBlue
}
</style>
