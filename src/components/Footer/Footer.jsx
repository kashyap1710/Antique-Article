import React from 'react';

function Footer() {
  return (
    <section className="relative py-12 overflow-hidden text-gray-100 border-t-2 border-gray-800 bg-gradient-to-r from-gray-700 to-gray-900">
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <p className="mb-6 text-center text-gray-400">
          © {new Date().getFullYear()} Copyright - Antique-Article
        </p>

        <div className="flex items-center justify-center space-x-6">
          <p className="text-lg font-semibold text-gray-300">Social Media Platforms</p>

          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/_kashyap_1710/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition duration-300 hover:text-blue-500"
            >
              <i className="text-2xl fab fa-instagram"></i>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kashyapbhesdadia@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition duration-300 hover:text-blue-500"
            >
              <i className="text-2xl fas fa-envelope"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/kashyap-bhesdadia-65b7ab277/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition duration-300 hover:text-blue-500"
            >
              <i className="text-2xl fab fa-linkedin"></i>
            </a>

            <a
              href="https://studio.youtube.com/channel/UCqVF7-1f4skHCfnOxcBcEvA/videos/upload?filter=%5B%5D&sort= %7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition duration-300 hover:text-blue-500"
            >
              <i className="text-2xl fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
