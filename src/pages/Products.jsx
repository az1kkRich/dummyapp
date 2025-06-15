// Product.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input, Pagination, Spin } from 'antd';
import { getProducts, searchProducts } from '../api/api';

const PAGE_LIMIT = 6;

const Product = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const queryFn = searchTerm
        ? () => searchProducts(searchTerm)
        : () => getProducts(page, PAGE_LIMIT);

    const { data, isLoading, isError, error, } = useQuery({
        queryKey: ['products', page, searchTerm],
        queryFn,
        keepPreviousData: true,
    });

    if (isLoading)
        return <div className="text-center mt-6"><Spin size="large" tip="Loading products..." /></div>;

    if (isError)
        return <div className="text-center mt-6 text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Products</h2>
                <Input.Search
                    placeholder="Search products..."
                    enterButton
                    onSearch={(value) => setSearchTerm(value)}
                    allowClear
                    className="max-w-sm"
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.products.map((product) => (
                    <div key={product.id} className="bg-gray-700 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
                        <p className="text-sm mb-2 line-clamp-2">{product.description}</p>
                        <p className="text-yellow-400 font-bold">${product.price}</p>
                    </div>
                ))}
            </div>

            {!searchTerm && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        current={page}
                        pageSize={PAGE_LIMIT}
                        total={data.total}
                        onChange={(page) => setPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </div>
    );
};

export default Product;
