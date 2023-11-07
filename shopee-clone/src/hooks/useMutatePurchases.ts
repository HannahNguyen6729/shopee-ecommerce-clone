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

type Props = {
  deleteIds?: string[];
  buyProducts?: PurchaseProps[];
  updateProductQuantity?: PurchaseProps;
};

const handleDeleteProduct = async (deleteIds: string[]) => {
  const res = await http.delete(`${purchaseUrl}`, {
    data: deleteIds
  });
  return res.data;
};

const handleUpdatePurchase = async (updateProductQuantity: PurchaseProps) => {
  const res = await http.put(`${purchaseUrl}/update-purchase`, updateProductQuantity);
  return res.data;
};

const handleBuyPurchases = async (buyProducts: PurchaseProps[]) => {
  const res = await http.post(`${purchaseUrl}/buy-products`, buyProducts);
  return res.data;
};

export const useMutatePurchases = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: async ({ deleteIds, buyProducts, updateProductQuantity }: Props) => {
      const results = await Promise.all([
        ...(deleteIds && deleteIds.length > 0 ? [handleDeleteProduct(deleteIds)] : []),
        buyProducts && handleBuyPurchases(buyProducts),
        updateProductQuantity && handleUpdatePurchase(updateProductQuantity)
      ]);
      return results.flat();
    },
    onSettled: () => {
      //invalidateQueries: invalidate queries and refetch requests to renew data
      queryClient.invalidateQueries([PURCHASES_QUERY_KEY, { status: purchasesStatus.inCart }]);
    },
    onSuccess: (response) => {
      const msg = response.filter((item) => item !== undefined);
      toast.success(msg[0].message, { position: 'top-center', autoClose: 1000 });
      console.log('response', response);
    },
    onError: (err) => {
      console.log('error message ', err);
    }
  });
  return { mutate, isLoading, isError, error, data };
};
