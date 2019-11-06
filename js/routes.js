
import bookApp from './pages/book-pages/book-app.cmp.js';
import welcomePage from './pages/welcome-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import bookDetails from './pages/book-pages/book-details.cmp.js';
import bookAdd from './pages/book-pages/book-add.cmp.js';
import keepApp from './pages/keep-pages/keep-app.cmp.js';


const routes = [
    {
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
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:id',
        component: bookDetails
    },
    {
        path: '/add',
        component: bookAdd
    }
]

const router = new VueRouter({ routes })

export default router;