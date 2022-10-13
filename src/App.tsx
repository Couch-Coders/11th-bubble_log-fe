import { store } from '@stores/index'
import { userActions } from '@stores/slices/user'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import EditPage from '@pages/EditPage'
import HomePage from '@pages/HomePage'
import LogDetailPage from '@pages/LogDetailPage'
import LogsPage from '@pages/LogsPage'
import MyPage from '@pages/MyPage'
import WritePage from '@pages/WritePage'
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
              <Route path="/" element={<HomePage />} />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="/write" element={<WritePage />} />
              <Route path="/log/:id" element={<LogDetailPage />} />
              <Route path="/log/:id/edit" element={<EditPage />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </BrowserRouter>
        </Provider>
  )
}

export default App
