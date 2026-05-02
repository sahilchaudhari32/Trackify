import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';

export const useAuth = () => {
  const { user, isAuthenticated, token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    isAuthenticated,
    token,
    loading,
    logout,
  };
};
