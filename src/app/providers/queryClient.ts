import toast from 'react-hot-toast';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import i18n from '@/shared/i18n/i18n';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {
      toast.error(i18n.t('common:errors.server'), {
        id: 'characters-error'
      });
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
