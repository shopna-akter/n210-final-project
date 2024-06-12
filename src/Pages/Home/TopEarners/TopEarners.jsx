// src/TopEarners.js
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const TopEarners = () => {
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic()
  useEffect(() => {
    axiosPublic.get('http://localhost:5000/featuredUsers')
      .then(response => {
        setUsers(response.data);
      })
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl text-center font-bold my-4">Top 6 Workers by Coins Earned</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Picture</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Available Coins</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Task Completion</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.worker_id}>
                <td className="px-4 py-2 border-b border-gray-200">
                  <img src={user.profilePicture} alt={`Picture of ${user.name}`} className="w-12 rounded-full h-auto"/>
                </td>
                <td className="px-4 py-2 border-b border-gray-200 font-medium text-lg lg:pl-24">{user.name}</td>
                <td className="px-4 py-2 border-b border-gray-200 font-medium text-lg lg:pl-24">{user.coin}</td>
                <td className="px-4 py-2 border-b border-gray-200 font-medium text-lg lg:pl-24">{user.taskCompletion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopEarners;
