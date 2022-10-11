import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useDispatch } from '@stores/index'
import { logActions } from '@stores/slices/log'
import React, { useState } from 'react'

import { DIVE_DEPTH, DIVE_LOCATION, DIVE_TEMPERATURE, DIVE_TYPE } from '@utils/constants'

type SearchFilterType = 'diveType' | 'location' | 'temperature' | 'depth'

interface getSearchFilterReturnType {
  filterAction: ActionCreatorWithPayload<string, string>
  options: string[]
}

const getSearchFilterType = (type: SearchFilterType): getSearchFilterReturnType => {
  switch (type) {
    case 'diveType': {
      return {
        filterAction: logActions.setQueryType,
        options: DIVE_TYPE
      }
    }
    case 'location': {
      return {
        filterAction: logActions.setQueryLocation,
        options: DIVE_LOCATION
      }
    }
    case 'temperature': {
      return {
        filterAction: logActions.setQueryTemperature,
        options: DIVE_TEMPERATURE
      }
    }
    case 'depth': {
      return {
        filterAction: logActions.setQueryDepth,
        options: DIVE_DEPTH
      }
    }
  }
}

interface ReturnType {
  selectValue: string
  options: typeof DIVE_TYPE | typeof DIVE_LOCATION | typeof DIVE_TEMPERATURE | typeof DIVE_DEPTH
  onChangeFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void

}

const useSearchFilter = (type: SearchFilterType): ReturnType => {
  const [selectValue, setSelectValue] = useState('')

  const { filterAction, options } = getSearchFilterType(type)

  const dispatch = useDispatch()

  const onChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectValue(event.target.value)

    dispatch(filterAction(event.target.value))
  }

  return { selectValue, options, onChangeFilter }
}

interface Props {
  type: SearchFilterType
}

const SearchFilter: React.FC<Props> = ({ type }) => {
  const { selectValue, options, onChangeFilter } = useSearchFilter(type)

  return (
    <>
      <label>{type}</label>
      <select value={selectValue} onChange={onChangeFilter}>
        {options.map((option, index) => <option key={index}>{option}</option>)}
      </select>
    </>
  )
}

export default SearchFilter
