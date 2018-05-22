<template>
  <div id="firstTab">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="出发地:" prop="origin">
        <el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.origin"></el-input>
      </el-form-item>
      <el-form-item label="目的地:" prop="purpose">
        <el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.purpose"></el-input>
      </el-form-item>
      <!-- <el-form-item> -->
      <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">搜索</el-button>
      <!-- </el-form-item> -->
    </el-form>
    <!-- <div id="fm" v-show="show"></div> -->
  </div>
</template>
<script>
import BMap from 'BMap';
  export default {
    data() {
      let _this = this;
      const validateWord = (rule, value, callback) => {
        if (_this.$tool.reg.illegal_word.test(value)) {
          callback(new Error("请输入合法的地点字符"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          origin: '',
          purpose: '',
        },
        rules: {
          origin: [{
              required: true,
              message: "请输入出发点",
              trigger: "blur"
            },
            {
              required: true,
              trigger: "blur",
              validator: validateWord
            }
          ],
          purpose: [{
              required: true,
              message: "请输入目的地",
              trigger: "blur"
            },
            {
              required: true,
              trigger: "blur",
              validator: validateWord
            }
          ],
        }
      }
    },
    created() {
    },
    mounted(){
        let _this = this;
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                let posArr = [];
                ({
                    province: posArr[0],
                    city: posArr[1],
                    street: posArr[2],
                } = r.address);
                _this.ruleForm.origin = posArr.join('');
                _this.$store.commit('setPoint', {
                    aim: 'begin',
                    point: r.point,
                });
                console.log('获取初始化位置成功');
            }
            else {
                alert('failed'+this.getStatus());
            }        
        });
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            let myGeo = new BMap.Geocoder();
            return new Promise(function(resolve, reject) {
                myGeo.getPoint(_this.ruleForm.origin, function(point){
                    if (point) {
                        console.log('获取出发点位置成功');
                        _this.$store.commit('setPoint', {
                            aim: 'begin',
                            point: point
                        });
                        resolve();
                    }
		        });
            }).then(function(resolve, reject) {
                myGeo.getPoint(_this.ruleForm.purpose, function(point){
                    if (point) {
                        console.log('获取目的地位置成功');
                        _this.$store.commit('setPoint', {
                                aim: 'end',
                                point: point
                        });
                        _this.$store.commit('changeState', 'route');
                        _this.$router.push({
                          path: "map"
                        });
                    }
		        });
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }

</script>

