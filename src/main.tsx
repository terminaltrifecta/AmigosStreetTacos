import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header.tsx'
import Slideshow from './components/Slideshow.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <Slideshow />
  </React.StrictMode>,
)