import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => state.user);

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  if (loading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  if (!profile) {
    return (
      <p className="text-center mt-20 text-red-500">
        Unable to load profile
      </p>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name }));
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3 py-10">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-xl p-6 sm:p-8">

        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {profile.name.charAt(0)}
          </div>
        </div>

        {/* VIEW MODE */}
        {!isEdit && (
          <>
            <h2 className="text-2xl font-semibold text-center">
              {profile.name}
            </h2>
            <p className="text-gray-500 text-center">{profile.email}</p>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Role</span>
                <span className="capitalize">{profile.role}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Member Since</span>
                <span>
                  {new Date(profile.createdAt).toDateString()}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => setIsEdit(true)}
                className="w-full py-3 border rounded-lg hover:bg-gray-100"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="w-full py-3 border rounded-lg"
              >
                My Orders
              </button>

              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
                className="w-full py-3 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          </>
        )}

        {/* EDIT MODE */}
        {isEdit && (
          <form onSubmit={handleUpdate} className="space-y-5 mt-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="w-full py-3 border rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
