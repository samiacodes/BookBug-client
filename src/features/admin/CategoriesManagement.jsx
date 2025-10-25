import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import useApi from "../../hooks/useApi";

const CategoriesManagement = () => {
  const { post, put, delete: del } = useApi();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/categories`);
      setCategories(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const response = await post(`/categories`, {
        name: newCategory,
        description: newCategoryDescription
      });
      
      // Add the new category to the list
      setCategories([...categories, response.category]);
      setNewCategory("");
      setNewCategoryDescription("");
      setError("");
    } catch (err) {
      console.error("Error adding category:", err);
      setError(err.response?.data?.message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await del(`/categories/${id}`);
        setCategories(categories.filter(cat => cat._id !== id));
        setError("");
      } catch (err) {
        console.error("Error deleting category:", err);
        setError(err.response?.data?.message || "Failed to delete category");
      }
    }
  };

  const startEditing = (category) => {
    setEditingId(category._id);
    setEditName(category.name);
    setEditDescription(category.description || "");
  };

  const saveEdit = async () => {
    try {
      const response = await put(`/categories/${editingId}`, {
        name: editName,
        description: editDescription
      });
      
      // Update the category in the list
      setCategories(categories.map(cat => 
        cat._id === editingId ? response.category : cat
      ));
      
      setEditingId(null);
      setEditName("");
      setEditDescription("");
      setError("");
    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.response?.data?.message || "Failed to update category");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-base-content">Manage Categories</h1>
        <p className="text-base-content/70">Add, edit, or remove book categories</p>
      </div>

      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <Icon name="warning" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Add Category Form */}
      <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Category name"
            className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <textarea
            placeholder="Category description (optional)"
            className="textarea textarea-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
          />
          <Button variant="primary" onClick={handleAddCategory}>
            <Icon name="plus" className="mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No categories found. Add a new category to get started.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category._id}>
                  <td>
                    {editingId === category._id ? (
                      <input
                        type="text"
                        className="input input-bordered input-sm w-full max-w-xs"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      <span className="font-medium">{category.name}</span>
                    )}
                  </td>
                  <td>
                    {editingId === category._id ? (
                      <textarea
                        className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    ) : (
                      <span className="text-sm">{category.description || "No description"}</span>
                    )}
                  </td>
                  <td>
                    {editingId === category._id ? (
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm" onClick={saveEdit}>
                          Save
                        </Button>
                        <Button variant="ghost" size="sm" onClick={cancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => startEditing(category)}>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(category._id)}>
                          <Icon name="trash" size="sm" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesManagement;