import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', redirect: '/tag-governance' },
        { path: 'tag-governance', component: () => import('../views/TagGovernance/index.vue') },
        { path: 'tag-management', component: () => import('../views/TagManagement/index.vue') },
        { path: 'tag-management/create', component: () => import('../views/TagManagement/TagCreate.vue') },
        { path: 'tag-management/detail/:id', component: () => import('../views/TagManagement/TagDetail.vue') },
        { path: 'tag-management/edit/:id', component: () => import('../views/TagManagement/TagEdit.vue') },
        { path: 'tag-management/point/:id', component: () => import('../views/TagManagement/PointDetail.vue') },
        { path: 'fusion-search', component: () => import('../views/FusionSearch/index.vue') },
        { path: 'my-approvals', component: () => import('../views/MyApprovals/index.vue') },
        { path: 'tag-sharing', component: () => import('../views/TagSharing/index.vue') },
      ]
    }
  ]
})

export default router
