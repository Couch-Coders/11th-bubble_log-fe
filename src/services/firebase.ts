import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBTDQZ4eVn-ej-n0XlmSakjvmmsBlNakBE',
  authDomain: 'th-bubble-log.firebaseapp.com',
  projectId: 'th-bubble-log',
  storageBucket: 'th-bubble-log.appspot.com',
  messagingSenderId: '629745699260',
  appId: '1:629745699260:web:b5659deb042b4f410e43b9',
  measurementId: 'G-1J3K5XGW8D',
};

const app = initializeApp(config);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<string> => {
  const result = await signInWithPopup(auth, googleProvider);

  const token = await result.user.getIdToken();

  return token;
};

const signOut = async (): Promise<void> => await auth.signOut();

export const FirebaseService = { signInWithGoogle, signOut, auth };
