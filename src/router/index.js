import { createRouter, createWebHashHistory } from 'vue-router';
import Ranking from '../views/Ranking.vue';
import UserId from '../views/UserId.vue';
import NotFoundComponent from '../components/NotFoundComponent.vue';

const routes = [
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking,
    alias: '/'
  },
  {
    path: '/userId/:username',
    name: 'UserId',
    component: UserId
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundComponent
  }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
