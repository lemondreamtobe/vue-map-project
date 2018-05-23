<template>
  <div id="map">
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
          show:false,
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

        if (!aim) {
             this.$router.push({
                path: "/"
            });
        }
    },
    mounted() {
      this.ready();
    },
    methods: {
      route() {

      },
      nearby() {
        let _this = this;
        this.show = true;
        let map = new BMap.Map("BDMap");  
        this.map = map;
        map.centerAndZoom(new BMap.Point(this.pointbegin.lng, this.pointbegin.lat), 14);
        var myKeys = [this.aim];
        var local = new BMap.LocalSearch(map, {
          renderOptions: {
            map: _this.map,
            panel: "r-result"
          },
          pageCapacity: 10
        });
        local.searchInBounds(myKeys, _this.map.getBounds());
      },
      ready() {
        var map = new BMap.Map('BDMap');
        this.map = map;
        var point = new BMap.Point(this.pointbegin.lng, this.pointbegin.lat);
        map.centerAndZoom(point, 14);
        map.addControl(new BMap.MapTypeControl());
        map.enableScrollWheelZoom(true);
        map.enableDoubleClickZoom(true);
        this[this.status]();
      }
    }
  };

</script>
