import HomePage from './components/homepage.jsx';
import Shop from './components/shop.jsx';

const routes = [
    {
        path: '/',
        element: <HomePage />,
        
    },
    {
        path: '/shop',
        element: <Shop />,
    }
]

export default routes