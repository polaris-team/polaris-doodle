<template>
  <div class="doodle_checkbox"
    v-on="{click: touchable ? onClick : () => {}}"
    v-bind:class="{yes: dispoState===1, no: dispoState===0, maybe: dispoState===2, touchable}"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DoodleCheckbox extends Vue {
  @Prop() private touchable!: boolean;

  @Prop() private dispoState!: number;

  @Prop() private onClick!: Function;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/vars';

.doodle_checkbox {
  width: 40px;
  height: 40px;
  border: 1px solid $white;
  border-radius: 40px;

  &.yes {
    background-color: $checkboxYes;
  }
  &.no {
    background-color: 'transparent';
    background-color: $checkboxNo;
  }
  &.maybe {
    background-color: $checkboxMaybe;
  }
  &.touchable {
    cursor: pointer;
  }
}

</style>
