import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";
import useUsers from "../../hooks/useUsers";
import LoadingPage from "../../Components/Loader/LoadingPage";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);


  const { serverUser, loading: loadUser, error } = useUsers(user?.email);
  console.log(serverUser)

  if (loading || loadUser) return <LoadingPage />;

  if (error) return <p>Error loading user.</p>;


  const { fullName, email, role, profileImage, coins, createdAt } = serverUser;
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={profileImage}
            alt={fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
          <p className="text-gray-500">{email}</p>
        </div>

        {/* Role & Coins */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
            <span className="font-medium">Role:</span>
            <span className="text-blue-600 font-semibold">{role}</span>
          </div>

          <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
            <span className="font-medium">Coins:</span>
            <span className="text-yellow-500 font-semibold">{coins}</span>
          </div>

          <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
            <span className="font-medium">Joined:</span>
            <span className="text-gray-600">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Edit Button */}
        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
