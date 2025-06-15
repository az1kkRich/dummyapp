import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/api';
import { Spin, Descriptions, Avatar } from 'antd';

const Profile = () => {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  if (isLoading)
    return <div className="text-center mt-6"><Spin size="large" tip="Loading profile..." /></div>;

  if (isError)
    return <div className="text-center mt-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Your Profile</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white flex flex-col md:flex-row gap-6">
        <Avatar src={user.image} size={120} />

        <Descriptions column={1} bordered layout="vertical" className="w-full text-white">
          <Descriptions.Item label="Full Name">{user.firstName} {user.lastName}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="University">{user.university}</Descriptions.Item>
          <Descriptions.Item label="Company">{user.company?.name}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default Profile;
