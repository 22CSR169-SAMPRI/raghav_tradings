import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const AddItems = () => {
  const [itemData, setItemData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data.imageUrl;
      setItemData((prevData) => ({
        ...prevData,
        images: [...prevData.images, imageUrl],
      }));
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Failed to upload image.");
    }
  };

  
  const handleAddItem = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/products", itemData);
      console.log("Item added:", response.data);
      alert("Item added successfully!");
      setItemData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding item:", error.message);
      alert("Failed to add item.");
    }
  };

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Item</h1>
        <p className="text-gray-300 mt-2">
          Fill in the details below to add a new item.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter item name"
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              value={itemData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              value={itemData.category}
              onChange={handleInputChange}
            >
              <option value="">Select category</option>
              <option value="cereals">Cereals</option>
              <option value="spices">Spices</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              value={itemData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              placeholder="Enter stock quantity"
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              value={itemData.stock}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter item description"
              rows="4"
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              value={itemData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-sm">
        <div className="mb-6">
  <h2 className="font-medium mb-4">Upload Images</h2>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="w-full p-2 border rounded-md bg-gray-800 text-white"
  />
  <p className="text-sm text-gray-400 mt-4">
    Add at least one image. Ensure the image quality is high.
  </p>
  <div className="grid grid-cols-3 gap-4 mt-4">
    {itemData.images.map((image, index) => (
      <img
        key={index}
        src={`http://localhost:5000${image}`}
        alt={`Uploaded ${index + 1}`}
        className="w-full h-32 object-cover rounded-md"
      />
    ))}
  </div>
</div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handleAddItem}
              className="col-span-1 bg-blue-500 text-white py-3 px-4 rounded-md"
            >
              Add Item
            </button>
            <button className="col-span-1 bg-white text-gray-700 py-3 px-4 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AddItems;