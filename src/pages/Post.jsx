import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getPostsLImit } from '../api/api';
import { Button, Input, Pagination, Spin } from 'antd';
import { IoHeart, IoHeartDislikeCircleSharp } from 'react-icons/io5';
import { FcReading } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Post = () => {
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', page, searchText],
        queryFn: getPostsLImit,
        keepPreviousData: true,
    });

    

    if (isLoading)
        return (
            <div className="text-center mt-5">
                <Spin className="mt-5!" size="large" tip="Loading..." />
            </div>
        );

    if (isError)
        return (
            <div className="text-center mt-5 text-red-500">
                Error: {error.message}
            </div>
        );



    return (
        <div className="py-4">
            <div className="flex items-center justify-between gap-2 mb-6">
            <h2 className="text-2xl font-bold mb-3 text-white">All Posts</h2>
                <Input.Search
                    placeholder="Search posts..."
                    onSearch={(value) => setSearchText(value)}
                    className="w-full max-w-md"
                    enterButton
                    allowClear
                    size='large'
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {data.posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-gray-700 rounded-lg shadow-xs shadow-gray-700 p-4 hover:shadow-lg transition flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                                {post.body}
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <span className="truncate">Tags:📁 {post.tags.join(', ')}</span>
                            <div className="flex justify-between items-center text-xs text-gray-300 pt-2 border-t border-gray-600 mt-auto">
                                <span className="flex items-center gap-1">
                                    <IoHeart color="red" className="text-lg" />
                                    {post.reactions.likes} likes
                                </span>
                                <span className="flex items-center gap-1">
                                    <FcReading className="text-lg" /> {post.views} views
                                </span>
                                <span className="flex items-center gap-1">
                                    <IoHeartDislikeCircleSharp
                                        color="white"
                                        className="text-lg"
                                    />
                                    {post.reactions.dislikes} dislikes
                                </span>
                            </div>

                            <Link to={`/posts/${post.id}`} className=" flex justify-end">
                                <Button
                                    type="primary"
                                    className="mt-4  bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Read More
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                current={page}
                pageSize={6}
                total={data.total}
                onChange={(value) => setPage(value)}
                showSizeChanger={false}
                className="text-white flex justify-center"
            />
        </div>
    );
};

export default Post;
