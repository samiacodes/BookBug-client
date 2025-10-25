import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Icon from "../../components/Icon";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import BannerForm from "./BannerForm";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { makeAuthorizedRequest } from "../../helpers/apiHelper";

const BannerManagement = () => {
  const { user } = useContext(AuthContext);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com'}/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await makeAuthorizedRequest(user, 'delete', `/banners/${id}`);
        setBanners(banners.filter(banner => banner._id !== id));
        toast.success("Banner deleted successfully!");
      } catch (error) {
        console.error("Error deleting banner:", error);
        toast.error("Failed to delete banner: " + (error.response?.data?.error || error.message));
      }
    }
  };

  const handleSave = async (bannerData) => {
    try {
      if (editingBanner) {
        // Update existing banner
        const response = await makeAuthorizedRequest(user, 'put', `/banners/${editingBanner._id}`, bannerData);
        setBanners(banners.map(banner => 
          banner._id === editingBanner._id ? response.banner : banner
        ));
        toast.success("Banner updated successfully!");
      } else {
        // Add new banner
        const response = await makeAuthorizedRequest(user, 'post', `/banners`, bannerData);
        setBanners([...banners, response.banner]);
        toast.success("Banner added successfully!");
      }
      
      // Reset form
      setEditingBanner(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("Failed to save banner: " + (error.response?.data?.error || error.message));
    }
  };

  const handleSetActive = async (id) => {
    try {
      const response = await makeAuthorizedRequest(user, 'put', `/banners/${id}/active`);
      
      // Update the banners list to reflect the active status
      setBanners(banners.map(banner => ({
        ...banner,
        active: banner._id === id
      })));
      
      toast.success("Banner set as active successfully!");
    } catch (error) {
      console.error("Error setting active banner:", error);
      toast.error("Failed to set active banner: " + (error.response?.data?.error || error.message));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBanner(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Banner Management</h1>
          <p className="text-base-content/70">Manage homepage banners</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Icon name="plus" className="mr-2" />
          Add Banner
        </Button>
      </div>

      {showForm && (
        <BannerForm 
          banner={editingBanner} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      )}

      <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>Banner</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="bg-base-300 border-2 border-dashed rounded-xl w-16 h-16">
                        {banner.imageUrl && (
                          <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover rounded-xl" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium">{banner.title}</div>
                      <div className="text-sm text-base-content/70">{banner.subtitle}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${banner.active ? "badge-success" : "badge-warning"}`}>
                      {banner.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(banner)}>
                        Edit
                      </Button>
                      <Button 
                        variant={banner.active ? "primary" : "outline"} 
                        size="sm" 
                        onClick={() => handleSetActive(banner._id)}
                      >
                        {banner.active ? "Active" : "Set Active"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(banner._id)}>
                        <Icon name="trash" size="sm" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BannerManagement;