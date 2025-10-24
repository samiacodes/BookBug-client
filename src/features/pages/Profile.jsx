import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Title from "../../components/Title";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Title text="Access Denied" level={2} />
          <p className="text-base-content/70 mt-2">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-base-100 rounded-xl shadow-md p-6 border border-base-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <Title text="User Profile" level={2} />
          <Button
            variant={isEditing ? "outline" : "primary"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  placeholder="Enter your full name"
                  className="input input-bordered rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  value={formData.displayName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Email cannot be changed
                  </span>
                </label>
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photoURL"
                  placeholder="Enter photo URL"
                  className="input input-bordered rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  value={formData.photoURL}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-full border-4 border-primary">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                        <span className="text-3xl text-primary">
                          {user.displayName?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-base-content">
                    {user.displayName || "No name provided"}
                  </h3>
                  <p className="text-base-content/70">{user.email}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-base-200 p-4 rounded-lg">
                    <p className="text-sm text-base-content/60">Member Since</p>
                    <p className="font-medium">
                      {user.metadata?.creationTime
                        ? formatDate(user.metadata.creationTime)
                        : "Unknown"}
                    </p>
                  </div>

                  <div className="bg-base-200 p-4 rounded-lg">
                    <p className="text-sm text-base-content/60">Last Login</p>
                    <p className="font-medium">
                      {user.metadata?.lastSignInTime
                        ? formatDate(user.metadata.lastSignInTime)
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;