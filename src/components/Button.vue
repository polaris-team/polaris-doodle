<template>
  <button class="button" v-on:click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private onClick!: Function;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/vars';

.button {
  background-color: $navyBlue;
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $white;
  color: $textColor;
  cursor: pointer;
  font-size: 16px;
  outline: none;

  &:hover {
    background-color: $denimBlue;
  }

  &:active {
    background-color: $opacityNavyBlue;
  }
}
</style>
