import { useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';
import { PRODUCTS_QUERY_KEY } from '../constants/queryKey';
import { ProductList, ProductListConfig } from '../types/product.type';
import { SuccessResponseApi } from '../types/util.type';

type ProductsResponse = {
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  data?: SuccessResponseApi<ProductList>;
};

const fetchProducts = async (queryParams: ProductListConfig): Promise<SuccessResponseApi<ProductList>> => {
  const res = await http.get(`products`, { params: queryParams });
  return res.data;
};

export const useProducts = (queryParams: ProductListConfig): ProductsResponse => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, queryParams],
    queryFn: () => fetchProducts(queryParams),
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (err) => {
      console.log('error message ', err);
    }
  });
  return { data, error, isError, isLoading };
};

export const useProduct = () => {};
