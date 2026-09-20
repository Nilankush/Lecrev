import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProjectPage from './pages/projectPage.tsx'
import ErrorPage from './pages/errorPage.tsx'
import Provider from './provider.tsx'
import UploadPage from './pages/uploadPage.tsx'
import AccountPage from './pages/accountPage.tsx'
import LogsPage from './pages/logsPage.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/projects",
    element: <ProjectPage/>
  },
  {
    path:"/uploadPage",
    element: <UploadPage/>
  },
  {
    path:"/account",
    element: <AccountPage/>
  },
  {
    path:"/logs",
    element:<LogsPage/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
