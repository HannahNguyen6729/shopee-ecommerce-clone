import Product from '../../components/Product/Product';
import AsideFilter from '../../components/AsideFilter/AsideFilter';
import SortProductList from '../../components/SortProductList/SortProductList';
import { useProducts } from '../../hooks/useProducts';
import { useQueryParams } from '../../hooks/useQueryParams';

const ProductList = () => {
  const queryParams = useQueryParams();
  const { data: productsData } = useProducts(queryParams);
  console.log({ productsData });

  return (
    <div className='container'>
      {productsData && (
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {productsData.data.products.map((item) => (
                <div key={item._id} className='col-span-1'>
                  <Product product={item} />
                </div>
              ))}
            </div>
            {/* TODO: Pagination */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
