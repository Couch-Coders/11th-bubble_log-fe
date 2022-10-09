import { store } from '@stores/index'
import { initializeApp } from 'firebase/app'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavBar from '@components/NavBar'
import Edit from '@pages/Edit'
import Home from '@pages/Home'
import LogDetail from '@pages/LogDetail'
import Logs from '@pages/Logs'
import Mypage from '@pages/Mypage'
import Write from '@pages/Write'
import Body from '@styles/body'
import GlobalStyle from '@styles/globalStyle'

import { config } from './config/config'

initializeApp(config.firebaseConfig)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Body>
          <GlobalStyle />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/write" element={<Write />} />
            <Route path="/log/:id" element={<LogDetail />} />
            <Route path="/log/:id/edit" element={<Edit />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </Body>
      </BrowserRouter>
    </Provider>
  )
}

export default App
