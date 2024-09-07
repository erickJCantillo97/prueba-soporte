import Vue from 'vue';
import Vuex from 'vuex';
import TaskList from './components/TaskList.vue';
import store from './store';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(Vuex);
Vue.use(VueSweetalert2);
// Configuración global de Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // Cambia esto a tu URL base si es necesario
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const app = new Vue({
    el: '#app',
    store, // Agrega el store a la instancia de Vue
    components: { TaskList },
});

