import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className="flex items-center justify-center my-6 space-x-4">
      <a href="https://github.com/raminhuk" target="_blank" rel="noopener noreferrer">
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
          <FaGithub size={20} />
        </div>
      </a>
      <a href="https://www.linkedin.com/in/fabio-junior-raminhuk-740669121" target="_blank" rel="noopener noreferrer">
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
          <FaLinkedin size={20} />
        </div>
      </a>
      <a href="https://www.instagram.com/fabiormk" target="_blank" rel="noopener noreferrer">
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
          <FaInstagram size={20} />
        </div>
      </a>
      <a href="https://twitter.com/fabio_rmk" target="_blank" rel="noopener noreferrer">
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
          <FaTwitter size={20} />
        </div>
      </a>
      <a href="https://www.facebook.com/fabio.raminhuk" target="_blank" rel="noopener noreferrer">
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
          <FaFacebook size={20} />
        </div>
      </a>
    </div>
  );
};

export default SocialMedia;
