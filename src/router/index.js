import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/app'
import Project from '@/components/Project/project'
import ProjectApplication from '@/components/Project/ProjectApplication'
import ProjectSchedule from '@/components/Project/ProjectSchedule'
import UserSettings from '@/components/UserSettings/userSettings' // 用户设置
import Login from '@/components/Login' // 登录
import MatterIndex from '@/components/importantMatter/matterIndex' // 重点事项跟踪
Vue.use(Router)

export default new Router({
  routes: [
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
        }, {
          path: '/importMatter',
          name: 'MatterIndex',
          component: MatterIndex
        }
      ]
    }
  ]
})
