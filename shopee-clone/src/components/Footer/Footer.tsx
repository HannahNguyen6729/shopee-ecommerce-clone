import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import tiktok from '../../assets/images/tiktok.png';
import youtube from '../../assets/images/youtube.png';

const Footer = () => {
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6 mb-5'>
          <div className='col-span-3'>
            <p className='text-sm font-semibold text-gray-600'>CUSTOMER SERVICE</p>
            <p className='mt-4 text-sm text-gray-600'>Help Centre</p>
            <p className='mt-2 text-sm text-gray-600'>How To Buy</p>
            <p className='mt-2 text-sm text-gray-600'>How To Sell </p>
            <p className='mt-2 text-sm text-gray-600'>Payment Methods</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Coins</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Guarantee </p>
            <p className='mt-2 text-sm text-gray-600'>Return & Refund</p>
            <p className='mt-2 text-sm text-gray-600'> Shopee Mall</p>
            <p className='mt-2 text-sm text-gray-600'>Return & Refund</p>
            <p className='mt-2 text-sm text-gray-600'> Contact Us</p>
          </div>
          <div className='col-span-3'>
            <p className='text-sm font-semibold text-gray-600'>ABOUT SHOPEE</p>
            <p className='mt-4 text-sm text-gray-600'>About Us</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Careers</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Policies </p>
            <p className='mt-2 text-sm text-gray-600'>Privacy Policy</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Blog</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Mall </p>
            <p className='mt-2 text-sm text-gray-600'>Seller Centre</p>
            <p className='mt-2 text-sm text-gray-600'> Flash Deals</p>
            <p className='mt-2 text-sm text-gray-600'>Media Contact</p>
            <p className='mt-2 text-sm text-gray-600'> Shopee Seller</p>
          </div>
          <div className='col-span-3'>
            <p className='text-sm font-semibold text-gray-600'>FOLLOW US</p>
            <div className='mt-4 text-sm text-gray-600 flex'>
              <div className='mr-1'>
                <img src={facebook} alt='facebook' width={18} height={18} />
              </div>
              <span> Facebook</span>
            </div>
            <div className='mt-2 text-sm text-gray-600 flex'>
              <div className='mr-1'>
                <img src={instagram} alt='instagram' width={18} height={18} />
              </div>
              <span> Instagram</span>
            </div>
            <div className='mt-2 text-sm text-gray-600 flex'>
              <div className='mr-1'>
                <img src={tiktok} alt='tiktok' width={18} height={18} />
              </div>
              <span>Tiktok</span>
            </div>
            <div className='mt-2 text-sm text-gray-600 flex'>
              <div className='mr-1'>
                <img src={youtube} alt='youtube' width={18} height={18} />
              </div>
              <span>Youtube</span>
            </div>
          </div>
          <div className='col-span-3'>
            <p className='text-sm font-semibold text-gray-600'>PAYMENT</p>
            <div className='flex gap-2'>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100 '>
                <img src='https://down-sg.img.susercontent.com/file/27f8706bf1e76f48fd403ae94fe8f89d' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/244d04e08cb94810bbbd1bdba3963b1e' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/75208a3560e600016e8c2afe482f2089' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/bb11637fc6801c7be1bc0eec44b4483d' alt='logo' />
              </div>
            </div>
            <p className='text-sm font-semibold text-gray-600 mt-4'>LOGISTIC</p>
            <div className='flex flex-wrap gap-2'>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100 '>
                <img
                  src='https://down-sg.img.susercontent.com/file/sg-50009109-5c039f3a5e4393ddd69f67fd9de8d748'
                  alt='logo'
                />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/d3e8c3431cbe8451acf869aad4064f02' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/8fd7478a86cbb33568d39a313a38dcda' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/542ab038cc1a9d0f7acdd95cae2124aa' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/542ab038cc1a9d0f7acdd95cae2124aa' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/d27ba145f934d56a2056c340a35faf91' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/2f0e116fd55a95b3dfe6f8ea52771829' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/c0a6f9dcf3bec653e678cb245859442f' alt='logo' />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 text-sm text-gray-600 mt-10'>
          <div className='lg:col-span-1'>
            <div>© 2023 Shopee. All Rights Reserved.</div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              Country & Region: Singapore | Indonesia | Taiwan | Thailand| Malaysia | Vietnam | Philippines | Germany |
              Chile | Japan | China
            </div>
          </div>
        </div>
        <div className='text-center text-sm text-gray-600 mt-10'>
          <p>Shopee Company Limited</p>
          <p className='mt-6'>
            Address: 4th floor, Capital Place Building, 29 Bukit Street, Tengah City, Phone: 19001221 - Email:
            customer@support.shopee.vn
          </p>
          <p className='mt-2'>Person in charge of information management: Thomas Smith</p>
          <p className='mt-2'>Business Registration Certificate No: 0106773786</p>
          <p className='mt-2'>© 2023 - Copyright belongs to Shopee Company Limited</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
