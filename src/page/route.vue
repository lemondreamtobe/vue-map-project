<template>
  <div id="route">
    <div id="r-result" v-show="show"></div>
    <div id="BDMap">

    </div>
  </div>
</template>
<script>
  import BMap from 'BMap';
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        show: true,
      };
    },
    computed: Object.assign({},
      mapState({
        status: 'func',
        pointbegin: 'pointbegin',
        pointend: 'pointend',
        aim: 'aim',
        pointWord: 'pointWord',
        route_type: 'route_type'
      })
    ),
    created() {

        if (!this.pointbegin.lat || !this.pointbegin.lat || !this.pointend.lat || !this.pointend.lat) {
             this.$router.push({
                path: "/"
            });
        }
    },  
    mounted() {
      this.ready();
    },
    methods: {
      traffic() {
          let _this = this;
        var transit = new BMap.TransitRoute(this.map, {
          renderOptions: {
            map: this.map
          },
          onSearchComplete: function (result) {
            if (transit.getStatus() == BMAP_STATUS_SUCCESS) {
              var firstPlan = result.getPlan(0);
              // 绘制步行线路
              for (var i = 0; i < firstPlan.getNumRoutes(); i++) {
                var walk = firstPlan.getRoute(i);
                if (walk.getDistance(false) > 0) {
                  // 步行线路有可能为0
                  _this.map.addOverlay(new BMap.Polyline(walk.getPath(), {
                    lineColor: "green"
                  }));
                }
              }
              // 绘制公交线路
              for (i = 0; i < firstPlan.getNumLines(); i++) {
                var line = firstPlan.getLine(i);
                _this.map.addOverlay(new BMap.Polyline(line.getPath()));
              }
              // 输出方案信息
              var s = [];
              for (i = 0; i < result.getNumPlans(); i++) {
                s.push('<div class="rr_word">' +(i + 1) + ". " + result.getPlan(i).getDescription(false) + '</div>');
              }
              document.getElementById("r-result").innerHTML = s.join("<br/>");
            }
          }
        });
        transit.search(_this.pointWord.b, _this.pointWord.e);
      },
      walk() {
        let walking = new BMap.WalkingRoute(this.map, {
          renderOptions: {
            map: this.map,
            panel: "r-result",
            autoViewport: true
          }
        });
        walking.search(this.pointWord.b, this.pointWord.e);
      },
      car() {
        var transit = new BMap.DrivingRoute(this.map, {
          renderOptions: {
            map: this.map,
            panel: "r-result",
            // enableDragging : true //起终点可进行拖拽
          },
        });
        transit.search(this.pointWord.b, this.pointWord.e);
      },
      ready() {
        let map = new BMap.Map('BDMap');
        this.map = map;
        let point = new BMap.Point(this.pointbegin.lng, this.pointbegin.lat);
        map.centerAndZoom(point, 14);
        map.addControl(new BMap.MapTypeControl());
        map.enableScrollWheelZoom(true);
        map.enableDoubleClickZoom(true);
        this[this.route_type]();
      }
    }
  };

</script>

