import { supabase } from '@/src/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }
      console.log("data",data);
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(newProduct: Omit<Product, 'id'>) {
      const { error, data } = await supabase
        .from('products')
        .insert(newProduct)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] });

    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(updatedProduct: Product) {
      const { error, data } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          image: updatedProduct.image,
          price: updatedProduct.price,
        })
        .eq('id', updatedProduct.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['products'] });

      await queryClient.invalidateQueries({ queryKey: ['products', id] });
      
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] });

    },
  });
};
