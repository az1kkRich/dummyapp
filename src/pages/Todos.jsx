import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/api';
import { Spin, Progress } from 'antd';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Todo = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  if (isLoading)
    return <div className="text-center mt-5"><Spin size="large" tip="Loading..." /></div>;

  if (isError)
    return <div className="text-center mt-5 text-red-500">Error: {error.message}</div>;

  const todos = data.todos;

  // To-do bajargan progress
  const completedCount = todos.filter((t) => t.completed).length;
  const total = todos.length;
  const progress = Math.round((completedCount / total) * 100);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Todos</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`rounded-md p-4 shadow-sm border ${
              todo.completed ? 'bg-green-700/20 border-green-600' : 'bg-red-700/20 border-red-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{todo.todo}</h3>
              {todo.completed ? (
                <FaCheckCircle className="text-green-400 text-xl" />
              ) : (
                <FaTimesCircle className="text-red-400 text-xl" />
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">User ID: {todo.userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
