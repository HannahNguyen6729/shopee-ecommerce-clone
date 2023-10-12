import { useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';
import { PURCHASES_QUERY_KEY } from '../constants/queryKey';
import { PurchaseListStatus } from 'src/types/purchase.type';
import { purchaseUrl } from 'src/constants/path';
import { purchasesStatus } from 'src/constants/purchase';
import { AuthContext } from 'src/context/authContext';
import { useContext } from 'react';

type Props = {
  status: PurchaseListStatus;
};

const fetchPurchases = async (props: Props) => {
  const res = await http.get(`${purchaseUrl}`, { params: props });
  return res.data;
};

export const usePurchases = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const { data, refetch, error, isError, isLoading } = useQuery({
    queryKey: [PURCHASES_QUERY_KEY, { status: purchasesStatus.inCart }],
    queryFn: () => fetchPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated,
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (err) => {
      console.log('error message ', err);
    }
  });

  return { data, refetch, error, isError, isLoading };
};
