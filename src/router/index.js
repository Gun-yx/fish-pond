import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Users from '../views/Users.vue'
import Rights from '../views/Rights.vue'
import Roles from '../views/Roles.vue'
import Goods from '../views/Goods.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { 
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login', 
      component: Login
    },
    { 
      path: '/home', 
      component: Home,
      redirect:'/welcome',
      children:[
        { 
        path: '/welcome', 
        component:Welcome
        },
        { 
          path: '/users', 
          component: Users
        },
        { 
          path: '/rights', 
          component: Rights
        },
        { 
          path: '/roles', 
          component: Roles
        },
        { 
          path: '/goods', 
          component: Goods
        },
    ]},
  ]
})

//挂载路由导航守卫
router.beforeEach((to,form,next) =>{
  //to ：将要访问的路径
  //from ：从哪个路径跳转而来
  //next : 它是一个函数，表示放行
  // next()放行 next('/login') 强制跳转

  //如果用户是直接去登录页那就直接放行，如果不是，进行下面的判断
  if( to.path === '/login') return next();
  //先获取token，如果拿到了token，就放行，没拿到就不放
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router