import { useQuery } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import React from 'react'
import { FcReading } from 'react-icons/fc';
import { IoHeart, IoHeartDislikeCircleSharp } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { getPostById } from '../../api/api';
import { HiHome } from 'react-icons/hi2';

const PostDetail = () => {

    const {id} = useParams();
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['postDetail', id],
        queryFn: () => getPostById(id),
    });

    if (isLoading) return <div className="text-center mt-5"><Spin className="mt-5!" size="large" tip="Loading..." /></div>;
    if (error) return <div className="text-center mt-5 text-red-500">Error: {error.message}</div>;


  return (
    <div className='bg-gray-700 rounded-lg shadow-xs w-[80%] mt-3 shadow-gray-700 p-4 hover:shadow-lg transition flex flex-col justify-between'>
      <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {console.log(data)}
                                {data.title}
                            </h3>
                            <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                                {data.body}
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <span className="truncate">Tags:📁 {data.tags.join(', ')}</span>
                            <div className="flex justify-between items-center text-xs text-gray-300 pt-2 border-t border-gray-600 mt-auto">
                                <span className="flex items-center gap-1">
                                    <IoHeart color="red" className="text-lg" />
                                    {data.reactions.likes} likes
                                </span>
                                <span className="flex items-center gap-1">
                                    <FcReading className="text-lg" /> {data.views} views
                                </span>
                                <span className="flex items-center gap-1">
                                    <IoHeartDislikeCircleSharp
                                        color="white"
                                        className="text-lg"
                                    />
                                    {data.reactions.dislikes} dislikes
                                </span>
                            </div>
                            <Link to='/posts' >
                                <Button
                                    type="primary"
                                    className="mt-4  bg-gray-600! hover:bg-blue-700! transition-colors"
                                >
                                    <HiHome /> Back to Posts
                                </Button>
                            </Link>
                        </div>
    </div>
  )
}

export default PostDetail
