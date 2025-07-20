import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import CountdownPage from './pages/CountdownPage'
import FlipImagePage from './pages/FlipImagePage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.scss'
import CountdownCreate from './components/CountdownCreate'
import CountdownList from './components/CountdownList'
import SignOut from './components/SignOut'
import SignUp from './components/SignUp'

const RootComponent: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
        <Route path={ROUTES.SIGNOUT_ROUTE} element={<SignOut />} />
        <Route path={ROUTES.REGISTER_ROUTE} element={<SignUp />} />
        <Route path={ROUTES.FLIPIMAGEPAGE_ROUTE} element={<FlipImagePage />} />
        <Route path={ROUTES.COUNTDOWNPAGE_ROUTE} element={<CountdownPage />} >
          <Route index element={<CountdownList />} />
          <Route path="create" element={<CountdownCreate />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RootComponent
