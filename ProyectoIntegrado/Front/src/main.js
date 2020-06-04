import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/es'
import Login from '@/components/Login.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import Empleados from '@/components/Empleados.vue'
import CrearEmpleado from '@/components/CrearEmpleado.vue'
import EditarEmpleado from '@/components/EditarEmpleado.vue'
import Articulos from '@/components/Articulos.vue'

Vue.use(VueRouter)
Vue.use(Vuelidate)

Vue.use(VueMoment, {
  moment
})

const routes = [
  // RUTAS
  {path: '/', component: Login, name: 'Login'},
  {path: '/empleados', component: Empleados, name: 'empleados'},
  {path: '/crearempleado', component: CrearEmpleado, name: 'crearempleado'},
  {path: '/editarempleado/:idEmpleado', component: EditarEmpleado, name: 'editarempleado'},
  {path: '/articulos', component: Articulos, name: 'articulos'},

  // RUTAS GESTION
  {path: '*', component: ErrorComponent}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
