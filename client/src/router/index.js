import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    _Work: ['admin','editor']    control the page _Work (you can set multiple _Work)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all _Work can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首頁', icon: 'dashboard' }
    }]
  },
  {
    path: '/changepassword',
    component: Layout,
    redirect: '/changepassword',
    name: 'ChangePW',
    meta: { title: '修改密碼', icon: 'tree' },
    hidden:true,
    children: [
      {
        path: '',
        name: 'ChangePassword',
        component: () => import('@/views/system/changepassword'),
        meta: { title: '修改密碼', noCache: true, icon: ''},
        hidden: true
      },
    ]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user _Work
 */
export const asyncRoutes = [
  {
    path: '/report_system',
    component: Layout,
    redirect: '/report_system',
	name: 'report_system',
    meta: { title: '報工管理', icon: 'example', _Work: ['work_manage'] },
    children: [{
      path: 'work_plan',
      name: 'Work_plan',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作計畫', icon: 'dashboard' , _Work: ['work_manage']}
    },{
      path: 'report_job',
      name: 'Report_job',
      component: () => import('@/views/report_system/report_job.vue'),
      meta: { title: '排程報工', icon: 'dashboard' , _Work: ['work_manage']}
    },{
      path: 'work_list',
      name: 'Work_list',
      component: () => import('@/views/report_system/work_list.vue'),
      meta: { title: '製令管理', icon: 'dashboard' , _Work: ['work_manage']}
    }]
  },
  {
    path: '/testurl',
    component: Layout,
    redirect: '/testurl',
	name: 'testurl',
    meta: { title: 'Dashboard_url', icon: 'example', _Work: ['work_manage'] },
    children: [{
      path: 'https://192.168.2.3:3000/d/vasKTID7k/ai4?orgId=2&refresh=5s',
      meta: { title: 'AI4', icon: 'dashboard' , _Work: ['work_manage']}
    },{
      path: 'https://192.168.2.3:3000/d/0dpQhmF7k/mj4?orgId=2&refresh=5s',
      meta: { title: 'MJ4', icon: 'dashboard' , _Work: ['work_manage']}
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系統管理', icon: 'example', _Work: ['system_manage'] },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user.vue'),
        meta: { title: '用戶管理', icon: 'user', _Work: ['user_manage'] }
      },
      {
        path: 'organization',
        name: 'Organization',
        component: () => import('@/views/system/organization'),
        meta: { title: '部門管理', icon: 'tree', _Work: ['org_manage'] }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'lock', _Work: ['role_manage'] }
      },
      {
        path: 'position',
        name: 'Postion',
        component: () => import('@/views/system/position'),
        meta: { title: '崗位管理', icon: 'position', _Work: ['position_manage'] }
      },
      {
        path: 'dict',
        name: 'Dict',
        component: () => import('@/views/system/dict'),
        meta: { title: '數據字典', icon: 'example', _Work: ['dict_manage'] }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/system/file'),
        meta: { title: '文件庫', icon: 'documentation', _Work: ['file_room'] }
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/system/task'),
        meta: { title: '定時任務', icon: 'list', _Work: ['ptask_manage'] }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/service',
    name: 'Monitor',
    meta: { title: '系統監控', icon: 'example', _Work: ['monitor_set'] },
    children: [
      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/monitor/service'),
        meta: { title: '服務監控', icon: 'example', _Work: ['service_manage'] }
      }
    ]
  },
  {
    path: '/develop',
    component: Layout,
    redirect: '/develop/perm',
    name: 'Develop',
    meta: { title: '開發配置', icon: 'example', _Work: ['dev_set'] },
    children: [
      {
        path: 'perm',
        name: 'Perm',
        component: () => import('@/views/system/perm'),
        meta: { title: '權限菜單', icon: 'example', _Work: ['perm_manage'] }
      },
      {
        path: 'form-gen-link',
        component: Layout,
        children: [
          {
            path: 'https://jakhuang.github.io/form-generator/',
            meta: { title: '表單設計器', icon: 'link', _Work: ['dev_form_gen'] }
          }
        ]
      },
      {
        path: 'docs',
        component: Layout,
        children: [
          {
            path: process.env.VUE_APP_BASE_API + '/docs/',
            meta: { title: '接口文檔', icon: 'link', _Work: ['dev_docs'] }
          }
        ]
      },
      {
        path: 'swagger',
        component: Layout,
        children: [
          {
            path: process.env.VUE_APP_BASE_API + '/swagger/',
            meta: { title: 'Swagger文檔', icon: 'link', _Work: ['dev_docs'] }
          }
        ]
      },
      {
        path: 'admin-link',
        component: Layout,
        children: [
          {
            path: process.env.VUE_APP_BASE_API + '/admin/',
            meta: { title: 'Django後台', icon: 'link', _Work: ['dev_admin'] }
          }
        ]
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
