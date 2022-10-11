import React from 'react'

import LogList from '@components/LogList'
import SearchInput from '@components/SearchInput'
import WriteLogButton from '@components/WriteLogButton'

const Logs: React.FC = () => {
  return <main>
    <SearchInput />
    <LogList />
    <WriteLogButton />
  </main>
}

export default Logs
