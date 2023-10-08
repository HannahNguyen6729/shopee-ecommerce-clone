import classNames from 'classnames';
import { omit } from 'lodash';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { path } from 'src/constants/path';
import { QueryConfig } from 'src/hooks/useQueryConfig';
import { OrderType, ProductListConfig, SortType } from 'src/types/product.type';

interface Props {
  queryConfig: QueryConfig;
  pageSize: number;
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const navigate = useNavigate();
  const page = Number(queryConfig.page);
  const { sort_by = SortType.view, order } = queryConfig;

  const { createdAt, view, sold, price } = SortType;
  const { asc, desc } = OrderType;

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    });
    return sortByValue;
  };

  const handlePriceOrder = (value: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: SortType.price,
        order: value
      }).toString()
    });
    return value;
  };

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue;
  };

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sort by</div>
          <button
            onClick={() => handleSort(view)}
            className={classNames('h-8 px-4 text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(view)
            })}
          >
            Relevance
          </button>
          <button
            onClick={() => handleSort(createdAt)}
            className={classNames('h-8 px-4 text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(createdAt)
            })}
          >
            Latest
          </button>
          <button
            onClick={() => handleSort(sold)}
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sold)
            })}
          >
            Top sale
          </button>
          <select
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
            className={classNames('h-8  px-4 text-left text-sm capitalize  outline-none ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(price)
            })}
          >
            <option value='' disabled className='bg-white text-black'>
              Price
            </option>
            <option value={asc} className='bg-white text-black'>
              Price: Low to High
            </option>
            <option value={desc} className='bg-white text-black'>
              Price: High to Low
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize} </span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortProductList;
