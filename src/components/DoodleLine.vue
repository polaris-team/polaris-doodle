<template>
  <div class="doodle_line">
    <div>{{player.name}}</div>
    <DoodleCheckbox
      v-for="(day, dayIndex) in doodle"
      v-bind:key="dayIndex"
      :dispoState="day"
      :touchable="touchable"
      :onClick="() => onClick(dayIndex)"
    />
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

</style>
