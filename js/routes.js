import welcomePage from './pages/welcome-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import bookApp from './apps/missBook/book-pages/book-app.cmp.js';
import bookAdd from './apps/missBook/book-pages/book-add.cmp.js';
import bookDetails from './apps/missBook/book-pages/book-details.cmp.js';
import keepApp from './apps/missKeep/keep-pages/keep-app.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';


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
        path: '/email',
        component: emailApp,
    },
    {
        path: '/book',
        component: bookApp,
        children: [{
                path: '/:id',
                component: bookDetails
            },
            {
                path: '/add',
                component: bookAdd
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router;