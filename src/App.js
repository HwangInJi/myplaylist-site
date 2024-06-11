import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Main from './components/Main'
import Aside from './components/Aside'
import Secrch from './components/Secrch'

import Home from './pages/Home'
import MelonPage from './pages/MelonPage'
import BugsPage from './pages/BugsPage'
import ApplePage from './pages/ApplePage'
import GeniePage from './pages/GeniePage'
import BillPage from './pages/BillPage'
import RecentPage from './pages/RecentPage'
import FavoritePage from './pages/FavoritePage'
import MymusicPage from './pages/MymusicPage'

import MusicPlayerProvider from './context/MusicPlayerProvider'

const App = () => {
  return (
    <MusicPlayerProvider>
      <BrowserRouter>
        <Header />
        <Main>
          <Secrch />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/melon' element={<MelonPage />} />
            <Route path='/bugs' element={<BugsPage />} />
            <Route path='/apple' element={<ApplePage />} />
            <Route path='/genie' element={<GeniePage />} />
            <Route path='/bill' element={<BillPage />} />
            <Route path='/recent' element={<RecentPage />} />
            <Route path='/favorite' element={<FavoritePage />} />
            <Route path='/mymusic' element={<MymusicPage />} />
          </Routes>
        </Main>
        <Aside />
      </BrowserRouter>
    </MusicPlayerProvider>
  )
}

export default App