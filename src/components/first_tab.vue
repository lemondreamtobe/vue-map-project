<template>
  <div id="firstTab">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="出发地:" prop="origin">
        <el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.origin"></el-input>
      </el-form-item>
      <el-form-item label="目的地:" prop="purpose">
        <el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.purpose"></el-input>
      </el-form-item>
      <el-form-item label="路线类型" prop="route_type">
					<el-radio-group v-model="ruleForm.route_type">
						<el-radio label="traffic">交通</el-radio>
						<el-radio label="walk">步行</el-radio>
						<el-radio label="car">自驾</el-radio>
					</el-radio-group>
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
          purpose: '广东省广州市黄陂地铁站',
          route_type: 'traffic'
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
         const loading = this.$loading({
          lock: true,
          text: '正在拼命获取当前位置中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
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
                 _this.ruleForm.origin = '广东省广州市高新兴科技集团';
                _this.$store.commit('setPoint', {
                    aim: 'begin',
                    point: r.point,
                });
                loading.close();
                console.log('获取初始化位置成功');
            }
            else {
                loading.close();
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
                        _this.$store.commit('setPointWord', {
                          b: _this.ruleForm.origin,
                          e: _this.ruleForm.purpose
                        });
                        _this.$store.commit('changeRoute', _this.ruleForm.route_type);
                        _this.$router.push({
                          path: "route"
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

