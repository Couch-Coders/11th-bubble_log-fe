import React from 'react'

import LogList from '@components/LogList'
import SearchInput from '@components/SearchInput'

const Logs: React.FC = () => {
  return <main>
    <SearchInput />
    <LogList />
  </main>
}

export default Logs
