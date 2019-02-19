// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'


// import vuescroll from 'vuescroll';
// import 'vuescroll/dist/vuescroll.css';

// // 你可以在这里设置全局配置
// Vue.use(vuescroll);

import VueBetterScroll from 'vue2-better-scroll'
Vue.use(VueBetterScroll)

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import 'videojs-contrib-hls/dist/videojs-contrib-hls'


Vue.prototype.$http = axios
import vuePicturePreview from './components/picture/index.js'
Vue.use(vuePicturePreview)
Vue.config.productionTip = false
Vue.use(VueVideoPlayer)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})