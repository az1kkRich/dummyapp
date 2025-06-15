import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getMe } from '../api/api';
import { Spin } from 'antd';

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  return (
    <div >
      <h1 className='text-2xl font-bold my-3 text-white'>Short Info </h1>
      <div className="w-full flex justify-center">
        {isLoading && <Spin className='mt-5!' size='large' tip='Loading...' />}
        {error && <p>Error: {error.message}</p>}

      </div>
      {data && (
        <div className='flex flex-col lg:flex-row gap-3 mt-3'>
          <div className="bg-gray-700 rounded-lg shadow-xs w-full xl:w-1/4 shadow-gray-700 p-4 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Your Address</h2>
            <p><strong>Address:</strong> {data.address.address}</p>
            <p><strong>State:</strong> {data.address.state}</p>
            <p><strong>City:</strong> {data.address.city}</p>
          </div>
          <div className="bg-gray-700 rounded-lg shadow-xs w-full xl:w-1/4 shadow-gray-700 p-4 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Bank Accaunt</h2>
            <p><strong>Card Number:</strong> {data.bank.cardNumber}</p>
            <p><strong>Currency:</strong> {data.bank.currency}</p>
            <p><strong>Tugash vaqti:</strong> {data.bank.cardExpire}</p>
          </div>
          <div className="bg-gray-700 rounded-lg shadow-xs w-full xl:w-1/4 shadow-gray-700 p-4 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Your Crypto</h2>
            <p><strong>Coin:</strong> {data.crypto.coin}</p>
            <p><strong>Network:</strong> {data.crypto.network}</p>
          </div>
          <div className="bg-gray-700 rounded-lg shadow-xs w-full xl:w-1/4 shadow-gray-700 p-4 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Your Company</h2>
            <p><strong>Department:</strong> {data.company.department}</p>
            <p><strong>Name:</strong> {data.company.name}</p>
            <p><strong>City:</strong> {data.company.address.city}, {data.company.address.address}</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home
