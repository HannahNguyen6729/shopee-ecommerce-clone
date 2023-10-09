import { useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';
import { CATEGORIES_QUERY_KEY } from '../constants/queryKey';
import { SuccessResponseApi } from '../types/util.type';
import { Category } from 'src/types/category.type';

type CategoriesResponse = {
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  data?: SuccessResponseApi<Category[]>;
};

const fetchCategories = async (): Promise<SuccessResponseApi<Category[]>> => {
  const res = await http.get(`categories`);
  return res.data;
};

export const useCategories = (): CategoriesResponse => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: () => fetchCategories(),
    keepPreviousData: true,
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (err) => {
      console.log('error message ', err);
    }
  });
  return { data, error, isError, isLoading };
};
