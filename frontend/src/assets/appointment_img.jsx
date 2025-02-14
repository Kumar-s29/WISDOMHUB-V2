import React from 'react';

const Footer = () => {
  return (
    <footer className='text-black bg-white mt-10 py-8 border-t border-t-black'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-center md:text-left'>
            <h3 className='text-xl font-semibold'>About Us</h3>
            <p className='mt-2'>
              We connect mentees with experienced mentors for guidance and growth.
            </p>
          </div>
          <div className='mt-4 md:mt-0'>
            <h3 className='text-xl font-semibold'>Follow Us</h3>
            <div className='flex mt-2 gap-4'>
              <a href='#' className='hover:text-gray-300'>
                <i className='fab fa-facebook-f'></i> Facebook
              </a>
              <a href='#' className='hover:text-gray-300'>
                <i className='fab fa-twitter'></i> Twitter
              </a>
              <a href='#' className='hover:text-gray-300'>
                <i className='fab fa-linkedin'></i> LinkedIn
              </a>
            </div>
          </div>
          <div className='mt-4 md:mt-0 text-center'>
            <h3 className='text-xl font-semibold'>Contact Us</h3>
            <p className='mt-2'>Email: support@mentors.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className='mt-8 text-center'>
          <p className='text-sm'>© 2025 Mentors Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
