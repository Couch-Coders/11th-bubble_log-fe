import { useDispatch, useSelector } from '@stores/index';
import { fetchUser, userActions } from '@stores/slices/user';
import { useNavigate } from 'react-router-dom';

import { logoutAPI } from '@apis/auth';
import { FirebaseService } from '@services/firebase';

interface ReturnType {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logOut: () => Promise<void>;
}

const useAuth = (): ReturnType => {
  const { signInWithGoogle, signOut } = FirebaseService;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const login = async (): Promise<void> => {
    const token = await signInWithGoogle();
    await dispatch(fetchUser(token));
  };

  const logOut = async (): Promise<void> => {
    await signOut();
    await logoutAPI();
    navigate('/', {
      replace: true,
    });
    dispatch(userActions.setIsLoggedIn(false));
  };

  return { isLoggedIn, login, logOut };
};

export default useAuth;
