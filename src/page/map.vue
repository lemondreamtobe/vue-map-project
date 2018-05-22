<template>
  <div id="map">
     <div id="BDMap">
         
     </div>
  </div>
</template>
<script>
import BMap from 'BMap';
import { mapState } from 'vuex'
export default {
  data() {
    return {
     
    };
  },
  computed: Object.assign(
			{},
			mapState({		
                pointbegin: 'pointbegin',
				pointend: 'pointend',
				pointby: 'pointby',
				aim: 'aim',
			})
		),
  created() {

  },
  mounted() {
     this.ready();
  },
  methods: {
    ready() {
        var map = new BMap.Map('BDMap');
        var point = new BMap.Point(104.075796, 30.659684);
        map.centerAndZoom(point, 14);
        map.addControl(new BMap.MapTypeControl());
        map.enableScrollWheelZoom(true);
        map.enableDoubleClickZoom(true);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }
  }
};
</script>