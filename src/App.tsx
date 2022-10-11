import { store } from '@stores/index'
// import { initializeApp } from 'firebase/app'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import AuthRoute from '@components/AuthRoute'
import NavBar from '@components/NavBar'
import Edit from '@pages/Edit'
import Home from '@pages/Home'
import LogDetail from '@pages/LogDetail'
import Logs from '@pages/Logs'
import Mypage from '@pages/Mypage'
import Write from '@pages/Write'
import Body from '@styles/body'
import GlobalStyle from '@styles/globalStyle'

// import { app } from './config/config'

// initializeApp(app)

const App: React.FC = () => {
  return (
    <div>
      <Body>
        <Provider store={store}>
          <BrowserRouter>
            <GlobalStyle />
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <AuthRoute> */}
              <Route path="/logs" element={<Logs />} />
              <Route path="/write" element={<Write />} />
              <Route path="/log/:id" element={<LogDetail />} />
              <Route path="/log/:id/edit" element={<Edit />} />
              <Route path="/mypage" element={<Mypage />} />
              {/* </AuthRoute> */}
            </Routes>
          </BrowserRouter>
        </Provider>
      </Body>
    </div>
  )
}

export default App
