import request from "@/api/index";
import type { ProductsPagination } from '@/models/ProductsPagination';
import type { Product } from '@/models/Product';

export const getProducts = async (params: any): Promise<ProductsPagination> => {
    const { data } = await request({
        url: 'products/search',
        method: 'get',
        params,
    });

    return data;
};

export const getProduct = async (id: string): Promise<Product> => {
    const { data } = await request({
        url: `/products/${id}`,
        method: 'get',
    });

    return data;
};
