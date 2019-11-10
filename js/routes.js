import welcomePage from './pages/welcome-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import bookApp from './apps/missBook/book-pages/book-app.cmp.js';
import bookAdd from './apps/missBook/book-pages/book-add.cmp.js';
import bookDetails from './apps/missBook/book-pages/book-details.cmp.js';
import keepApp from './apps/missKeep/keep-pages/keep-app.cmp.js';
import emailApp from './apps/mrEmail/pages/email-app.cmp.js';
import emailList from './apps/mrEmail/pages/email-list.cmp.js';
import emailCompose from './apps/mrEmail/pages/email-compose.cmp.js';
import emailDetails from './apps/mrEmail/pages/email-details.cmp.js';


const routes = [{
    path: '/',
    component: welcomePage
},
{
    path: '/about',
    component: aboutPage
},
{
    path: '/keep',
    component: keepApp
},
{
    path: '/email/',
    component: emailApp,
    children: [
        {
            path: 'compose/:id?',
            component: emailCompose
        },

        {
            path: '',
            component: emailList
        },
        {
            path: ':id',
            component: emailDetails
        },
    ]
},
{
    path: '/book/',
    component: bookApp,
    children: [
        {
            path: 'add',
            component: bookAdd
        },
        {
            path: ':id',
            component: bookDetails
        },

    ]
}]


const router = new VueRouter({
    routes
})

export default router;