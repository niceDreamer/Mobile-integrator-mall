<template>
  <div id="app">
    <loading v-show="LOADING"></loading>
    <keep-alive :include="['Index', 'GoodsList', 'VirtualCard']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from './components/LoadingGif'
export default {
  computed: {
    ...mapState([
      'LOADING'
    ])
  },
  name: 'App',
  components: {
    Loading
  }
}
</script>

<style lang="less">
@import "assets/css/comm.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
