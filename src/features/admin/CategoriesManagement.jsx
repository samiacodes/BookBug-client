import React, { useState } from "react";
import Icon from "../../components/Icon";
import Button from "../../components/Button";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Fiction", bookCount: 24 },
    { id: 2, name: "Mystery", bookCount: 18 },
    { id: 3, name: "Biography", bookCount: 12 },
    { id: 4, name: "History", bookCount: 15 },
    { id: 5, name: "Science", bookCount: 9 },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat = {
        id: Date.now(),
        name: newCategory,
        bookCount: 0
      };
      setCategories([...categories, newCat]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const saveEdit = () => {
    setCategories(categories.map(cat => 
      cat.id === editingId ? { ...cat, name: editName } : cat
    ));
    setEditingId(null);
    setEditName("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-base-content">Manage Categories</h1>
        <p className="text-base-content/70">Add, edit, or remove book categories</p>
      </div>

      {/* Add Category Form */}
      <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Category name"
            className="input input-bordered flex-1 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button variant="primary" onClick={handleAddCategory}>
            <Icon name="plus" className="mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Category</th>
              <th>Books</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>
                  {editingId === category.id ? (
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
                <td>{category.bookCount} books</td>
                <td>
                  {editingId === category.id ? (
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
                      <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                        <Icon name="trash" size="sm" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesManagement;