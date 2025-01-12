import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout(); // Log out the user
      dispatch(logout()); // Clear Redux auth state
      window.location.reload(true); // Perform a hard reload (similar to F5)
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button
      className="px-6 py-2 text-sm font-medium text-gray-100 transition-transform duration-300 ease-in-out bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:scale-105 hover:shadow-lg"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
