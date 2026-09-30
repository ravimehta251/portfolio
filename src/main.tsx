import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import '@fontsource-variable/manrope/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource/dm-mono/latin-400.css'
import '@fontsource/dm-mono/latin-500.css'
import './index.css'
import './sections.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></React.StrictMode>,
)
