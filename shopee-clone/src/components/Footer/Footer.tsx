import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>© 2023 Shopee. All Rights Reserved.</div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              Country & Region: Singapore Indonesia Taiwan Thailand Malaysia Vietnam Philippines Brazil México Colombia
              Chile
            </div>
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          <div>Công ty TNHH Shopee</div>
          <div className='mt-6'>
            Address: 4th floor, Capital Place Building, 29 Bukit Street, Tengah City, Phone: 19001221 - Email:
            customer@support.shopee.vn
          </div>
          <div className='mt-2'>Business code: 0106773786</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
