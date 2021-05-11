import { Login } from './views/login/Login'
//import { UserInfo } from './views/admin/UserInfo'
import { Home } from './views/home/Home'
import { UserTable } from './views/admin/UserTable'
import { ProductTable } from './views/admin/ProductTable'
import { EmailTable } from './views/admin/EmailTable'



export const ROUTES = [
//    {path: '/admin/info/:id', component: UserInfo},
    {path: '/admin/users', component: UserTable},
    {path: '/admin/products', component: ProductTable},
    {path: '/admin/emails', component: EmailTable},
    {path: '/home', component: Home},
    {path: '/', component: Login}
]
