<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./style/style";
</style>
