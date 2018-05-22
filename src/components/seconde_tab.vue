<template>
  <div id="secondTab">
    <el-input placeholder="请输入内容" v-model="by" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="submitForm"></el-button>
    </el-input>
    <div id="tagGroup" @click="selectTag">
        <el-tag type="info">美食</el-tag>
        <el-tag type="info">景点</el-tag>
        <el-tag type="info">酒店</el-tag>
        <el-tag type="info">银行</el-tag>
        <el-tag type="info">医院</el-tag>
        <el-tag type="info">电影院</el-tag>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        show:false,
        by: '',
      }
    },
    mounted(){
        let _this = this;
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                _this.$store.commit('setPoint', {
                    aim: 'by',
                    point: r.point,
                });
            }
            else {
                alert('failed'+this.getStatus());
            }        
        });
    },
    methods: {
      selectTag(e) {
          this.by = e.target.innerText;
      },
      submitForm() {

        if (!this.by || this.$tool.reg.illegal_word.test(this.by)) {
           this.$message.error('请输入合法的字符');
        } else {
          this.$store.commit('setAim', this.by);
          this.$router.push({
            path: "map"
          });
        }
      },
      resetForm() {
        
      },
    },
  }

</script>

