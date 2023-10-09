import { Link, createSearchParams } from 'react-router-dom';
import { path } from '../../constants/path';
import Button from '../button/Button';
import { Category } from 'src/types/category.type';
import { QueryConfig } from 'src/hooks/useQueryConfig';
import classNames from 'classnames';

type Props = {
  queryConfig: QueryConfig;
  categories: Category[];
};

const AsideFilter = ({ queryConfig, categories }: Props) => {
  const handleRemoveAll = () => {};

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold uppercase', {
          'text-orange': !queryConfig.category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        all categories
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((item) => {
          const isActive = queryConfig.category === item._id;
          return (
            <li key={item._id} className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: item._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        search filter
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div>Price Range </div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <input
              type='text'
              placeholder='$ MIN'
              className=' grow p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>

            <input
              type='text'
              placeholder='$ MAX'
              className='grow p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'> error messages</div>
          <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            Apply
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Rating</div>
      {/* TODO: Rating stars */}
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
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        onClick={handleRemoveAll}
        className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
      >
        Clear all
      </Button>
    </div>
  );
};

export default AsideFilter;
