import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route,Routes,Navigate } from 'react-router'
import Home from './Components/Home.jsx'
import Login from './Pages/Login.jsx'
import Upload from './Pages/Upload.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './helper/Theme.js'
import { CssBaseline } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './helper/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId="278589024521-hqnd2nhp76gtee0e86bq0acrvmf15lke.apps.googleusercontent.com">
  <AuthProvider>
     <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Toaster/>
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Navigate to={'/Login'}/>} />
    <Route path='/dashboard' element={<Home />}>

    

    <Route path='Upload'element={<Upload />}/>
    <Route path='list'element={<h1>this is list page</h1>}/>

    </Route>*

    <Route path='/Login' element={<Login/>}/>

    <Route path ="/about" element={<App/>}/>

  </Routes>
  </BrowserRouter>
  </ThemeProvider>
  </AuthProvider>
 </GoogleOAuthProvider>
)
