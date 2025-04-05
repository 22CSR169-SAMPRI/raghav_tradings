import React, { useState } from "react";

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

  const handleImageUpload = (e) => {
    // Placeholder for image upload logic
    console.log("Image upload triggered");
  };

  const handleAddItem = () => {
    // Placeholder for adding item logic
    console.log("Item added:", itemData);
  };

  return (
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
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="dairy">Dairy</option>
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
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-dashed rounded-md p-4 aspect-square flex flex-col items-center justify-center text-center text-blue-500">
                <div className="mb-2">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm">
                  Drop your images here or{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={handleImageUpload}
                  >
                    click to browse
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Add at least one image. Ensure the image quality is high.
            </p>
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
  );
};

export default AddItems;