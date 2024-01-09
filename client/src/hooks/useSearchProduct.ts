import { yupResolver } from '@hookform/resolvers/yup';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import useQueryConfig from './useQueryConfig';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from 'src/constants/path';
import { InputSchema, inputSchema } from 'src/utils/inputSchema';

type FormData = Pick<InputSchema, 'name'>;

const nameSchema = inputSchema.pick(['name']);

export default function useSearchProduct() {
  const queryConfig = useQueryConfig();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  });
  const navigate = useNavigate();

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        };

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    });
  });
  return { onSubmitSearch, register };
}
