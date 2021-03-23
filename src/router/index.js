import Vue from 'vue'
import VueRouter from 'vue-router'
import ContainerTodo from '@/components/ContainerTodo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ContainerTodo',
    component: ContainerTodo
  }
]

const router = new VueRouter({
  routes
})

export default router
