import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [editingProduct, setEditingProduct] = useState(null); // For editing a product

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);

        // Group products by category
        const grouped = response.data.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});
        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        // Update the products state immediately
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );

        // Update groupedProducts state
        setGroupedProducts((prevGroupedProducts) => {
          const updatedGrouped = { ...prevGroupedProducts };
          for (const category in updatedGrouped) {
            updatedGrouped[category] = updatedGrouped[category].filter(
              (product) => product._id !== productId
            );
          }
          return updatedGrouped;
        });

        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error.response?.data?.message || error.message);
        alert("Failed to delete product.");
      }
    }
  };

  // Handle Edit
  const handleEdit = (product) => {
    setEditingProduct({ ...product }); // Create a copy of the product to avoid direct state mutation
  };

  // Handle Save after Edit
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        editingProduct
      );

      // Update the products state immediately
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === editingProduct._id ? response.data : product
        )
      );

      // Update groupedProducts state
      setGroupedProducts((prevGroupedProducts) => {
        const updatedGrouped = { ...prevGroupedProducts };
        for (const category in updatedGrouped) {
          updatedGrouped[category] = updatedGrouped[category].map((product) =>
            product._id === editingProduct._id ? response.data : product
          );
        }
        return updatedGrouped;
      });

      alert("Product updated successfully!");
      setEditingProduct(null); // Clear the editing state
    } catch (error) {
      console.error("Error updating product:", error.response?.data?.message || error.message);
      alert("Failed to update product.");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-800 text-white p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <p className="text-gray-300 mt-2">
            View, edit, and manage your product inventory by category.
          </p>
        </div>

        <div className="space-y-8">
          {Object.keys(groupedProducts).map((category) => (
            <div key={category} className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4 capitalize">
                {category}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead>
                    <tr className="bg-gray-600">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-600">
                    {groupedProducts[category].map((product) => (
                      <tr key={product._id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {editingProduct?._id === product._id ? (
                            <input
                              type="text"
                              value={editingProduct.name}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  name: e.target.value,
                                })
                              }
                              className="bg-gray-700 text-white p-2 rounded"
                            />
                          ) : (
                            product.name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {editingProduct?._id === product._id ? (
                            <input
                              type="number"
                              value={editingProduct.price}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  price: e.target.value,
                                })
                              }
                              className="bg-gray-700 text-white p-2 rounded"
                            />
                          ) : (
                            `₹${product.price}`
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {editingProduct?._id === product._id ? (
                            <input
                              type="number"
                              value={editingProduct.stock}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  stock: e.target.value,
                                })
                              }
                              className="bg-gray-700 text-white p-2 rounded"
                            />
                          ) : (
                            <div className="flex items-center">
                              {product.stock}
                              {product.stock < 5 && (
                                <span
                                  className="ml-2 text-red-500"
                                  title="Low stock"
                                >
                                  ⚠️
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingProduct?._id === product._id ? (
                            <button
                              onClick={handleSave}
                              className="text-green-400 hover:text-green-600 mr-4"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-blue-400 hover:text-blue-600 mr-4"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageProducts;