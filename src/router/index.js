import { createRouter, createWebHashHistory } from 'vue-router';
import Ranking from '../views/Ranking.vue';
import UserId from '../views/UserId.vue';
import NotFoundComponent from '../components/NotFoundComponent.vue';

import prueba from '../components/prueba.vue';

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
    path: '/prueba',
    name: 'prueba',
    component: prueba
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
