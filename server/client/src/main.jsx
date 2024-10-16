import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './assets/app.css'
import { UserProvider } from './contexts/UserContext'
import { PostProvider } from './contexts/PostContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>
  </StrictMode>,
)
