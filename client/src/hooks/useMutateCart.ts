import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { purchaseUrl } from 'src/constants/path';
import { purchasesStatus } from 'src/constants/purchase';
import { PURCHASES_QUERY_KEY } from 'src/constants/queryKey';
import { http } from 'src/utils/http';

type PurchaseProps = {
  product_id: string;
  buy_count: number;
};

export const useMutateCart = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isLoading, isError, error, data } = useMutation({
    mutationFn: async (purchaseInfo: PurchaseProps) => {
      const res = await http.post(`${purchaseUrl}/add-to-cart`, purchaseInfo);
      return res.data;
    },
    onSettled: () => {
      //invalidateQueries: invalidate queries and refetch requests to renew data
      queryClient.invalidateQueries({ queryKey: [PURCHASES_QUERY_KEY, { status: purchasesStatus.inCart }] });
    },
    onSuccess: (response) => {
      toast.success(response.message, { autoClose: 1000 });
      console.log('response', response);
    },
    onError: (err) => {
      console.log('error message ', err);
    }
  });
  return { mutate, mutateAsync, isLoading, isError, error, data };
};
