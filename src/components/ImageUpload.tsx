import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'

import { storage } from '../config/config'

const ImageUpload: React.FC = () => {
  const [imageUpload, setImageUpload] = useState<File>()
  const [imageList, setImageList] = useState<string[]>([])
  const imageListRef = ref(storage, 'images/')
  const uuid: string = v4()
  const UploadImage = (): void => {
    if (imageUpload == null) return
    const imageRef = ref(storage, `image/${imageUpload.name}${uuid}`)
    void uploadBytes(imageRef, imageUpload).then(snapshot => {
      void getDownloadURL(snapshot.ref).then(url => {
        alert('image uploaded')
        setImageList(prev => [...prev, url])
      })
    })
  }
  useEffect(() => {
    void listAll(imageListRef).then(response => {
      console.log(response)
      response.items.forEach(item => {
        void getDownloadURL(item).then(url => {
          setImageList(prev => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <div className="ImageUpload">
      <input
        type="file"
        onChange={event => {
          if (event.target.files !== null) setImageUpload(event.target.files[0])
        }}
      />
      <button onClick={UploadImage}>Upload Image</button>
      {imageList.map((url, idx) => {
        return <img src={url} key={idx} />
      })}
    </div>
  )
}

export default ImageUpload
