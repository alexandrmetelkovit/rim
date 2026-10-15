import toast from 'react-hot-toast';
import { QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {
      toast.error('Failed to load characters. Please try again.', {
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
