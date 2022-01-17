import MainPage from '../router/MainPage'
import Login from '../router/Login'

export const routers = [
  {
    label: 'Main Page',
    icon: '',
    path: '/dashboard/mainPage',
    component: MainPage
  },
  {
    label: 'Login',
    icon: '',
    path: '/login',
    component: Login
  },
];