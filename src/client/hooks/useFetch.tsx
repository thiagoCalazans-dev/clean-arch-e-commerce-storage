import { useQuery } from "@tanstack/react-query";

interface useFetchProps<T> {
  queryKey?: any[];
  queryFn: () => Promise<T | any>;
}

export function useFetch<T>({ queryKey, queryFn }: useFetchProps<T>) {
  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });
}
