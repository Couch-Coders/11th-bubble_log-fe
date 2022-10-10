import { storage } from 'config/config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { blob } from 'stream/consumers'

function ImageUpload(): any {
  const [imgUrl, setImgUrl] = useState(null)
  const [progresspercent, setProgresspercent] = useState(0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const file = event.target[0]?.files[0] as HTMLInputElement
    if (!file) return
    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgresspercent(progress)
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
          setImgUrl(downloadURL)
        })
      }
    )
  }

  return (
    <div className="ImageUpload">
      <form onSubmit={handleSubmit} className="form">
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
      {!imgUrl && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
      {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
    </div>
  )
}
export default ImageUpload
