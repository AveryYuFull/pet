import Vue from 'vue'
import Router from 'vue-router'
import Personal from '../pages/Personal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    }
  ]
})
