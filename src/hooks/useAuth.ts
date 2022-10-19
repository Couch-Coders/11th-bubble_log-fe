import { useDispatch, useSelector } from '@stores/index';
import { fetchUser, userActions } from '@stores/slices/user';
import { useNavigate } from 'react-router-dom';

import { authAPI } from '@apis/auth';
import { FirebaseService } from '@services/firebase';

const useAuth = () => {
  const { signInWithGoogle, signOut } = FirebaseService;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const login = async () => {
    const token = await signInWithGoogle();
    await dispatch(fetchUser(token));
  };

  const logOut = async () => {
    await signOut();
    await authAPI.logOut();
    navigate('/', {
      replace: true,
    });
    dispatch(userActions.setIsLoggedIn(false));
  };

  return { isLoggedIn, login, logOut };
};

export default useAuth;
