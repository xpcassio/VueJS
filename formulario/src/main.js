import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'

Vue.config.productionTip = false

Vue.mixin({
  data: function() {
    return {
      globalVar: 1
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
