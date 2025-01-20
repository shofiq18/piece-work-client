
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const UserProfile = () => {
  const {user} = useContext(AuthContext);
  

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-4 mt-20">
      <div className="card w-full max-w-md mx-auto bg-base-100 shadow-xl rounded-lg">
        <figure className="flex justify-center pt-6">
          <img src={user.photo} alt={user.name} className="w-32 h-32 rounded-full border-4 border-primary" />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <div className="badge badge-secondary">{user.role}</div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-800">Coins: {user.coins}</p>
          </div>
          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-outline btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
