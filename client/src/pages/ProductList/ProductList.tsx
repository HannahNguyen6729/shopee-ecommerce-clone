import Product from '../../components/Product/Product';
import AsideFilter from '../../components/AsideFilter/AsideFilter';
import SortProductList from '../../components/SortProductList/SortProductList';
import { useProducts } from '../../hooks/useProducts';
import Pagination from '../../components/Pagination/Pagination';
import useQueryConfig from 'src/hooks/useQueryConfig';
import { ProductListConfig } from 'src/types/product.type';
import { useCategories } from 'src/hooks/useCategories';
import ImageCarousel from 'src/components/ImageCarousel/ImageCarousel';
import img3 from '../../assets/slider/img3.jpg';
import img4 from '../../assets/slider/img4.png';

const ProductList = () => {
  const queryParams = useQueryConfig();
  const { data: productsData } = useProducts(queryParams as ProductListConfig);
  const { data: categoriesData } = useCategories();

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {/* Carousel */}
        <div className='flex flex-row mb-8'>
          <div className='flex flex-col  items-center grow basis-2/3 w-screen '>
            <ImageCarousel />
          </div>
          <div className='flex flex-col  items-center grow-0 basis-1/3  w-screen gap-0.5 pl-1'>
            <img src={img3} alt='slider 3' className='rounded' />
            <img src={img4} alt='slider 4' className='rounded' />
          </div>
        </div>

        {/* ProductList */}
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryParams} categories={categoriesData?.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryParams} pageSize={productsData.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.products.map((item) => (
                  <div key={item._id} className='col-span-1'>
                    <Product product={item} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryParams} pageSize={productsData.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
