import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/app'
import Project from '@/components/Project/project' // 项目
import ProjectApplication from '@/components/Project/ProjectApplication'
import Progress from '@/components/Project/Progress'
import ProjectSchedule from '@/components/Project/ProjectSchedule'
import Reminder from '@/components/Project/reminder' // 事项提醒
import UserSettings from '@/components/UserSettings/userSettings' // 用户设置
import Login from '@/components/Login' // 登录
import MatterIndex from '@/components/importantMatter/matterIndex' // 重点事项跟踪
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      // name: 'Login'
      component: Login
    }, {
      path: '/',
      component: AppIndex,
      children: [
        {
          path: '/',
          component: Project
        },
        {
          path: '/progress',
          component: Progress
        },
        {
          path: '/projectApplication',
          component: ProjectApplication
        },
        {
          path: '/projectSchedule',
          component: ProjectSchedule
        },
        {
          path: '/reminder',
          component: Reminder
        },
        {
          path: '/userSettings',
          component: UserSettings
        },
        {
          path: '/login',
          component: Login
        }, {
          path: '/importMatter',
          component: MatterIndex
        }
      ]
    }
  ]
})
