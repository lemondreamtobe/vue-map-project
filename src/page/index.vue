<template>
  <div id="index">
    <a class="logo-img">
      <img src="../../static/img/bee.png">
    </a>
    <router-link class="logo-title" to="/" title="回到首页">小蜜蜂个人自助地图</router-link>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>
<script>
  import $ from 'jquery'
  import Footer from "../components/footer.vue";
  export default {
      	components: {
			Footer
		},
    data() {
      return {
        show: false,
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.transitionName = this.transitionName == 'slide-right' ? 'slide-left' : 'slide-right'
      next()
    },
    created() {
    //   this.getLocation();
    },
    mounted() {

    },
    methods: {
    }
  };

</script>

