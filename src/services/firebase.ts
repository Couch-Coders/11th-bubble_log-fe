import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { config } from '@services/firebaseConfig';

const app = initializeApp(config);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  const token = await result.user.getIdToken();

  return token;
};

const signOut = async () => await auth.signOut();

export const FirebaseService = { signInWithGoogle, signOut, auth };
