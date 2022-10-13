import { store } from '@stores/index'
import { userActions } from '@stores/slices/user'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Edit from '@pages/Edit'
import Home from '@pages/Home'
import LogDetail from '@pages/LogDetail'
import Logs from '@pages/Logs'
import Mypage from '@pages/Mypage'
import Write from '@pages/Write'
import { FirebaseService } from '@services/firebase'
import GlobalStyle from '@styles/globalStyle'

const App: React.FC = () => {
  // load user here
  const token = false
  if (token) store.dispatch(userActions.setUserLoggedIn(true))

  const { auth } = FirebaseService

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log('@user', user)
      if (user !== null) store.dispatch(userActions.setUserLoggedIn(true))
    })
  }, [])

  return (
        <Provider store={store}>
          <BrowserRouter>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/write" element={<Write />} />
              <Route path="/log/:id" element={<LogDetail />} />
              <Route path="/log/:id/edit" element={<Edit />} />
              <Route path="/mypage" element={<Mypage />} />
            </Routes>
          </BrowserRouter>
        </Provider>
  )
}

export default App
