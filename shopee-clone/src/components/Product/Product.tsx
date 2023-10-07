import { Link } from 'react-router-dom';
import { Product as ProductType } from '../../types/product.type';
import { formatCurrency, formatNumberToSocialStyle } from '../../types/util.type';

type ProductProps = {
  product: ProductType;
};
const Product = ({ product }: ProductProps) => {
  const { name, image, price_before_discount, sold, price } = product;
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={image} alt={name} className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'> {name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>$</span>
              <span className='text-sm'>{formatCurrency(price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>$</span>
              <span className='text-sm'>{formatCurrency(price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            {/* TODO: Product Rating stars */}
            <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4'>
              <defs>
                <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                  <stop offset={0} stopColor='#ffca11' />
                  <stop offset={1} stopColor='#ffad27' />
                </linearGradient>
                <polygon
                  id='ratingStar'
                  points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                />
              </defs>
              <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                <g transform='translate(-876 -1270)'>
                  <g transform='translate(155 992)'>
                    <g transform='translate(600 29)'>
                      <g transform='translate(10 239)'>
                        <g transform='translate(101 10)'>
                          <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div className='ml-2 text-sm'>
              <span> {formatNumberToSocialStyle(sold)}k</span>
              <span className='ml-1'> Sold </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
