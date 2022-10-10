import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBTDQZ4eVn-ej-n0XlmSakjvmmsBlNakBE',
  authDomain: 'th-bubble-log.firebaseapp.com',
  projectId: 'th-bubble-log',
  storageBucket: 'th-bubble-log.appspot.com',
  messagingSenderId: '629745699260',
  appId: '1:629745699260:web:b5659deb042b4f410e43b9',
  measurementId: 'G-1J3K5XGW8D'
}
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
