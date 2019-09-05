<template>
  <div id="app">
    <div id="background-wrapper" v-bind:class="{'login-layout': !token}">

      <main v-if="token">

        <template v-if="lineup.name">

          <div class="page-header">
            <img src="./assets/logo_color-bg.png" />
            <h1>{{ lineup.name }}</h1>

            <div class="page-header_right">
              <Button v-if="change" :onClick="saveUpdates">Save</Button>

              <v-popover
                :autoHide="true"
                placement="bottom-start"
              >
                <!-- Button -->
                <div class="tooltip-target">
                  <!-- <img src="./assets/settings.svg" /> -->
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 54 54" style="enable-background:new 0 0 54 54;" xml:space="preserve">
                    <path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571
                      c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571
                      c-0.475,0.475-0.997,0.574-1.352,0.574c-0.5,0-0.997-0.196-1.364-0.539C33.324,8.984,33,8.534,33,7.832V2.78
                      C33,1.247,31.753,0,30.22,0H23.78C22.247,0,21,1.247,21,2.78v5.052c0,1.218-0.997,1.945-1.961,1.945c-0.354,0-0.876-0.1-1.351-0.574
                      l-3.571-3.571c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966
                      l3.572,3.571c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.438C0,31.752,1.247,33,2.78,33
                      h5.052c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966
                      c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.571c0.475-0.475,0.997-0.574,1.352-0.574
                      c0.963,0,1.96,0.728,1.96,1.945v5.051C21,52.752,22.247,54,23.78,54h6.439c1.533,0,2.78-1.248,2.78-2.781v-5.051
                      c0-1.218,0.997-1.945,1.96-1.945c0.354,0,0.877,0.1,1.352,0.574l3.571,3.571c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553
                      c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114
                      S45.356,33,46.168,33h5.052c1.533,0,2.78-1.248,2.78-2.781V23.78C54,22.247,52.753,21,51.22,21z M34,27c0,3.859-3.141,7-7,7
                      s-7-3.141-7-7s3.141-7,7-7S34,23.141,34,27z"/>
                  </svg>
                </div>
                <!-- Content -->
                <template slot="popover">
                  <span>Default availability :</span>
                  <DoodleCheckbox
                    :dispoState="user.defaultAvailability"
                    :touchable="true"
                    :onClick="changeDefaultAvailability"
                  />
                </template>
              </v-popover>
            </div>
          </div>

          <section>
            <DoodleWeek
              :daysOffset=0
            />

            <DoodleWeek
              :daysOffset=7
            />

          </section>
        </template>

      </main>

      <main v-else>
        <img id="logo" src="./assets/logo.png" />
        <p>Please login</p>
        <Button :onClick="login">Login</Button>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Cookies from 'js-cookie';
import DoodleWeek from './components/DoodleWeek.vue';
import DoodleCheckbox from './components/DoodleCheckbox.vue';
import Button from './components/Button.vue';

@Component({
  components: {
    DoodleWeek,
    DoodleCheckbox,
    Button,
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

  changeDefaultAvailability() {
    this.$store.dispatch('changeDefaultAvailability');
  }

  saveUpdates() {
    this.$store.dispatch('updateDoodle');
  }
}
</script>

<style lang="scss">
@import './style/vars';

html, body {
  margin: 0;
}

body {
  background-color: $navyBlue;
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

  min-height: 100vh;
}

#background-wrapper {
  background-image: $blueGradient;
  min-height: 100vh;

  &.login-layout {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-bottom: 40px;
    }

    p {
      margin-bottom: 20px;
    }
    .button {
      margin: auto;
    }
  }
}

main {
  padding: 20px;

}
section {
  max-width: 720px;
  margin: auto;
}

#logo {
  display: block;
  width: 250px;
  margin: auto;
}

.page-header {
  position: relative;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    margin-right: 20px;
  }

  h1 {
    margin: 0;
  }
}

.page-header_right {
  display: flex;
  position: absolute;
  right: 0;
  top: 12px;

  .v-popover {
    margin-left: 20px;
  }
}

.tooltip-target {
  height: 40px;
  width: 40px;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }

  svg {
    fill: $tabDefault;
  }

  img {
    height: 100%;
    width: 100%;
  }
}

.tooltip {
  left: -10px !important;
  top: 10px !important;

  .tooltip-arrow {
    z-index: 1;

    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #000;

    border-width: 0 5px 5px 5px;
    border-left-color: transparent!important;
    border-right-color: transparent!important;
    border-top-color: transparent!important;
    top: -5px;
    margin-top: 0;
    margin-bottom: 0;

    left: unset !important;
    right: 15px !important;
  }

  &.popover {
    $color: rgba(0, 0, 0, 0.7);

    .popover-inner {
      background: $color;
      color: $textColor;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 5px 30px rgba(black, .1);

      font-family: 'Avenir', Helvetica, Arial, sans-serif;

      .doodle_checkbox {
        margin: 10px auto 0;
      }
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>
