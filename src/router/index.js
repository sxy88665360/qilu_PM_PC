import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/app'
import HelloWorld from '@/components/HelloWorld'
import Project from '@/components/Project/project'
import ProjectApplication from '@/components/Project/ProjectApplication'
import ProjectSchedule from '@/components/Project/ProjectSchedule'
import UserSettings from '@/components/UserSettings/userSettings'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/00',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/',
      component: AppIndex,
      children: [
        {
          path: '/',
          name: 'Project',
          component: Project
        },
        {
          path: '/projectApplication',
          name: 'ProjectApplicationoject',
          component: ProjectApplication
        },
        {
          path: '/projectSchedule',
          name: 'ProjectSchedule',
          component: ProjectSchedule
        },
        {
          path: '/userSettings',
          name: 'UserSettings',
          component: UserSettings
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
})
