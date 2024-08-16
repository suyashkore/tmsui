import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([LoginRoutes, MainRoutes], {
    basename: import.meta.env.VITE_UI_APP_CONTEXT_ROOT_URL
});

export default router;
