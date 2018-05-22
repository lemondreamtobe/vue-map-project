import Vue from 'vue'
import Vuex from 'vuex'
import {
	MUTATION_INCREMENT,
	MUTATION_DECREMENT
} from './mutation-types.js';
Vue.use(Vuex)
const store = new Vuex.Store({
	// 定义状态
	state: {
			func: 'route',
			pointbegin: {
				lng: 0,
				lat: 0
			},
			pointend: {
				lng: 0,
				lat: 0
			},
			pointby: {
				lng: 0,
				lat: 0
			},
			aim: '',
	},
	mutations: {
			changeState(state, status) {
				state.func = status;
			},
			setPoint(state, obj) {
				({
					lng: state['point'+obj.aim].lng,
					lat: state['point'+obj.aim].lat,
				} = obj.point);
			},
			setAim(state, w) {
					state.aim = w;
			}
	},
	getters: {
		
	},
	actions: {
	
  },
  modules: {
   
  }
})

export default store
