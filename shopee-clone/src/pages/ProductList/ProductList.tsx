import Product from '../../components/Product/Product';
import AsideFilter from '../../components/AsideFilter/AsideFilter';
import SortProductList from '../../components/SortProductList/SortProductList';
import { useProducts } from '../../hooks/useProducts';
import { useQueryParams } from '../../hooks/useQueryParams';

const ProductList = () => {
  const queryParams = useQueryParams();
  const { data: products } = useProducts(queryParams);
  console.log({ products });

  return (
    <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-3'>
        <AsideFilter />
      </div>
      <div className='col-span-9'>
        <SortProductList />
        <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {Array(30)
            .fill(0)
            .map((item, index) => (
              <div key={index} className='col-span-1'>
                <Product />
              </div>
            ))}
        </div>
        {/* TODO: Pagination */}
      </div>
    </div>
  );
};

export default ProductList;
