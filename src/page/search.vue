<template>
  <div id="search">
    <!-- <router-link to="/map">前进</router-link> -->
    <div id="searchTab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="搜索路线" name="first-tab">
          <firstTab></firstTab>
        </el-tab-pane>
        <el-tab-pane label="搜索附近" name="second-tab">
          <secondTab></secondTab>
        </el-tab-pane>
        <el-tab-pane label="联系我吧" name="third-tab">
          <thirdTab></thirdTab>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import firstTab from "../components/first_tab.vue";
import secondTab from "../components/seconde_tab.vue";
import thirdTab from "../components/third_tab.vue";;
export default {
    components: {
     firstTab,
     secondTab,
     thirdTab
    },
    data() {
      return {
        activeName: 'first-tab',
      };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        handleClick() {

        }
    }
  };

</script>

