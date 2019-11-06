
import bookApp from './pages/book-app.cmp.js';
import welcomePage from './pages/welcome-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import bookDetails from './pages/book-details.cmp.js';
import bookAdd from './pages/book-add.cmp.js';


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