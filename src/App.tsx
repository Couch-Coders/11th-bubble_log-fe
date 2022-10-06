import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@stores/index'
import Home from '@pages/Home'
import Edit from '@pages/Edit'
import Mypage from '@pages/Mypage'
import Logs from '@pages/Logs'
import Write from '@pages/Write'
import LogDetail from '@pages/LogDetail'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
