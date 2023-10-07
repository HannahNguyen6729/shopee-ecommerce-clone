import AsideFilter from '../../components/AsideFilter/AsideFilter';
import SortProductList from '../../components/SortProductList/SortProductList';

const ProductList = () => {
  return (
    <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-3'>
        <AsideFilter />
      </div>
      <div className='col-span-9'>
        <SortProductList />
        <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          <div className='col-span-1'>
            <div>render Product detail</div>
          </div>
        </div>
        {/* TODO: Pagination */}
      </div>
    </div>
  );
};

export default ProductList;
