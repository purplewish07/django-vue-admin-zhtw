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
    perms: ['admin','editor']    control the page perms (you can set multiple perms)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all perms can be accessed
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
 * the routes that need to be dynamically loaded based on user perms
 */
export const asyncRoutes = [
  {
    path: '/task_system',
    component: Layout,
    redirect: '/task_system',
    name: 'task_system',
    meta: { title: '生產管理', icon: 'example', perms: ['work_manage'] },
    children: [{
      path: 'task_plan',
      name: 'Task_plan',
      component: () => import('@/views/task_system/task_system.vue'),
	  //component: () => import('@/views/task_system/test.vue'),
      meta: { title: '工作計畫', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'setting',
      name: 'setting',
      component: () => import('@/views/task_system/parameters.vue'),
      meta: { title: '生產參數', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'week_plan',
      name: 'week_plan',
      component: () => import('@/views/task_system/week_plan_123.vue'),
      meta: { title: '機台附載狀態', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'machine_worktime',
      name: 'machine_worktime',
      component: () => import('@/views/task_system/machine_worktime.vue'),
      meta: { title: '機台工時設定', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'machine_worktime2',
      name: 'machine_worktime2',
      component: () => import('@/views/task_system/machine_schedule.vue'),
      meta: { title: '機台工時設定2', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'machine_worktime3',
      name: 'machine_worktime3',
      component: () => import('@/views/task_system/machine_schedule2.vue'),
      meta: { title: '機台工時設定3', icon: 'dashboard' , perms: ['work_manage']}
    }]
  },
  {
    path: '/report_system',
    component: Layout,
    redirect: '/report_system',
    name: 'report_system',
    meta: { title: '報工管理', icon: 'example', perms: ['work_manage'] },
    children: [{
      path: 'report_job',
      name: 'Report_job',
      component: () => import('@/views/report_system/report_job.vue'),
      meta: { title: '排程報工', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'work_list',
      name: 'Work_list',
      component: () => import('@/views/report_system/work_list.vue'),
      meta: { title: '製令管理', icon: 'dashboard' , perms: ['work_manage']}
    }]
  },
  {
    path: '/warehouse_management',
    component: Layout,
    redirect: '/warehouse_management',
    name: 'warehouse_management',
    meta: { title: '倉儲管理', icon: 'example', perms: ['work_manage'] },
    children: [{
      path: 'storage_spaces',
      name: 'storage_spaces',
      component: () => import('@/views/warehouse_management/storage_spaces.vue'),
      meta: { title: '儲位管理', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'storage_update',
      name: 'storage_update',
      component: () => import('@/views/warehouse_management/storage_update.vue'),
      meta: { title: '儲位更新', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'barcode',
      name: 'barcode',
      component: () => import('@/views/warehouse_management/barcode.vue'),
      meta: { title: 'barcode', icon: 'dashboard' , perms: ['work_manage']}
    }]
  },
  {
    path: '/testurl',
    component: Layout,
    redirect: '/testurl',
	name: 'testurl',
    meta: { title: 'Dashboard_url', icon: 'example', perms: ['work_manage'] },
    children: [{
      path: 'https://192.168.2.3:3000/d/vasKTID7k/ai4?orgId=2&refresh=5s',
      meta: { title: 'AI4', icon: 'dashboard' , perms: ['work_manage']}
    },{
      path: 'https://192.168.2.3:3000/d/0dpQhmF7k/mj4?orgId=2&refresh=5s',
      meta: { title: 'MJ4', icon: 'dashboard' , perms: ['work_manage']}
    }]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test',
	children: [{
      path: '',
	  name: 'test',
	  component: () => import('@/views/task_system/test8.vue'),
      meta: { title: 'test', icon: 'dashboard' , perms: ['work_manage']}
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系統管理', icon: 'example', perms: ['system_manage'] },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user.vue'),
        meta: { title: '用戶管理', icon: 'user', perms: ['user_manage'] }
      },
      {
        path: 'organization',
        name: 'Organization',
        component: () => import('@/views/system/organization'),
        meta: { title: '部門管理', icon: 'tree', perms: ['org_manage'] }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'lock', perms: ['role_manage'] }
      },
      {
        path: 'position',
        name: 'Postion',
        component: () => import('@/views/system/position'),
        meta: { title: '崗位管理', icon: 'position', perms: ['position_manage'] }
      },
      {
        path: 'dict',
        name: 'Dict',
        component: () => import('@/views/system/dict'),
        meta: { title: '數據字典', icon: 'example', perms: ['dict_manage'] }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/system/file'),
        meta: { title: '文件庫', icon: 'documentation', perms: ['file_room'] }
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/system/task'),
        meta: { title: '定時任務', icon: 'list', perms: ['ptask_manage'] }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/service',
    name: 'Monitor',
    meta: { title: '系統監控', icon: 'example', perms: ['monitor_set'] },
    children: [
      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/monitor/service'),
        meta: { title: '服務監控', icon: 'example', perms: ['service_manage'] }
      }
    ]
  },
  {
    path: '/develop',
    component: Layout,
    redirect: '/develop/perm',
    name: 'Develop',
    meta: { title: '開發配置', icon: 'example', perms: ['dev_set'] },
    children: [
      {
        path: 'perm',
        name: 'Perm',
        component: () => import('@/views/system/perm'),
        meta: { title: '權限菜單', icon: 'example', perms: ['perm_manage'] }
      },
      {
        path: 'form-gen-link',
        component: Layout,
        children: [
          {
            path: 'https://jakhuang.github.io/form-generator/',
            meta: { title: '表單設計器', icon: 'link', perms: ['dev_form_gen'] }
          }
        ]
      },
      {
        path: 'docs',
        component: Layout,
        children: [
          {
            path: process.env.VUE_APP_BASE_API + '/docs/',
            meta: { title: '接口文檔', icon: 'link', perms: ['dev_docs'] }
          }
        ]
      },
      {
        path: 'swagger',
        component: Layout,
        children: [
          {
            path: process.env.VUE_APP_BASE_API + '/swagger/',
            meta: { title: 'Swagger文檔', icon: 'link', perms: ['dev_docs'] }
          }
        ]
      },
      {
        path: 'admin-link',
        component: Layout,
        children: [
          {
            path: process.env.VUE_APP_BASE_API + '/admin/',
            meta: { title: 'Django後台', icon: 'link', perms: ['dev_admin'] }
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
