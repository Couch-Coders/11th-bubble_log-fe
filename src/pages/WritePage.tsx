import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import { createLogAPI } from '@apis/log'
import KakaoMap from '@components/KakaoMap'
import { DIVE_TYPE } from '@utils/constants'
import 'react-datepicker/dist/react-datepicker.css'

const WritePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const [diveType, setDiveType] = useState('')
  const [temperature, setTemperature] = useState('')
  const [maxDepth, setMaxDepth] = useState('')
  const [sight, setSight] = useState('')
  const [enterTime, setEnterTime] = useState(new Date())
  const [leaveTime, setLeaveTime] = useState(new Date())
  const [minOxygen, setMinOxygen] = useState('')
  const [maxOxygen, setMaxOxygen] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [content, setContent] = useState('')
  const [position, setPosition] = useState({
    lat: 33.55635,
    lng: 126.795841
  })

  const onChangeDatePicker = (date: Date): void => {
    setDate(date)
  }

  const onChangeDiveType = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setDiveType(event.target.value)
  }

  const onChangeTemperature = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTemperature(event.target.value)
  }

  const onChangeMaxDepth = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxDepth(event.target.value)
  }

  const onChangeSight = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSight(event.target.value)
  }

  const onChangeEnterTime = (date: Date): void => {
    setEnterTime(date)
  }

  const onChangeLeaveTime = (date: Date): void => {
    setLeaveTime(date)
  }

  const onChangeMinOxygen = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMinOxygen(event.target.value)
  }

  const onChangeMaxOxygen = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxOxygen(event.target.value)
  }

  const onChangeImageFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files !== null) {
      setImageFile(event.target.files[0])
    }
  }

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(event.target.value)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    setIsLoading(true)

    event.preventDefault()
    console.log('submit')

    const body = {
      date: JSON.stringify(date),
      diveType,
      enterTime: JSON.stringify(enterTime),
      leaveTime: JSON.stringify(leaveTime),
      sight: Number(sight),
      maxDepth: Number(maxDepth),
      temperature: Number(temperature),
      maxOxygen: Number(maxOxygen),
      minOxygen: Number(minOxygen),
      location: 'location',
      content,
      longitude: 1,
      latitude: 1,
      images: []
    }
    try {
      const response = await createLogAPI(body)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(imageFile)
  console.log(position.lat, position.lng)

  return <main>
    {isLoading && 'loading...'}
    <form onSubmit={() => { void onSubmit }}>
    <DatePicker selected={date} onChange={onChangeDatePicker} />
    <select onChange={onChangeDiveType} defaultValue='type'>
      <option value='type' disabled>다이브 종류</option>
      {DIVE_TYPE.map((option, index) => <option key={index}>{option}</option>)}
    </select>
    <label>수온</label>
    <input value={temperature} onChange={onChangeTemperature} />
    <label>최고 깊이</label>
    <input value={maxDepth} onChange={onChangeMaxDepth} />
    <label>시야</label>
    <input value={sight} onChange={onChangeSight} />
    <label>들어간 시간</label>
    <DatePicker
    selected={enterTime}
    onChange={onChangeEnterTime}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"/>
    <label>나온 시간</label>
  <DatePicker
      selected={leaveTime}
      onChange={onChangeLeaveTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"/>
    <label>들어갈 때 탱크량</label>
    <input value={maxOxygen} onChange={onChangeMaxOxygen} />
    <label>나올 때 탱크량</label>
    <input value={minOxygen} onChange={onChangeMinOxygen} />
    <button>생성하기</button>
    </form>
    <input type='file' onChange={onChangeImageFile} />
    <label>노트</label>
    <textarea value={content} onChange={onChangeDescription}/>
    <KakaoMap position={position} setPosition={setPosition}/>
  </main>
}

export default WritePage
