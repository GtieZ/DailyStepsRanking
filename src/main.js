import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueApexCharts from "vue3-apexcharts";
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/styles.css'


createApp(App).use(router).use(VueApexCharts).mount('#app')

