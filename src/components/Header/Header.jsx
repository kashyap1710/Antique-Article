import React from 'react';
import { Container, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className="py-4 text-gray-100 shadow-md bg-gradient-to-r from-gray-700 to-gray-900">
      <Container>
        <nav className="flex items-center">
          {/* Logo and Website Name */}
          <div className="flex items-center ml-0 mr-0 space-x-4">
            <Link to="/">
              <img
                src="https://media.istockphoto.com/id/1330788505/vector/news-paper-care-logo-template-design.jpg?s=612x612&w=0&k=20&c=c9loKIAmPQ06pPh07dJny2iNKEv4BMhMXPZx9AGf8VE="
                alt="Logo"
                className="w-12 h-12 transition-transform transform rounded-full hover:scale-110"
              />
            </Link>
            <span className="text-3xl font-semibold tracking-wide text-gray-100">
              Antique-Article
            </span>
          </div>
          {/* Navigation Links */}
          <ul className="flex items-center ml-auto space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-6 py-2 text-sm font-medium text-gray-100 transition-transform duration-300 ease-in-out bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:scale-105 hover:shadow-lg"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
