import React, { useState } from "react";

const ManageProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample product data
  const products = [
    {
      id: "#001",
      name: "Apple",
      image: "https://organicmandya.com/cdn/shop/files/Apples_bf998dd2-0ee8-4880-9726-0723c6fbcff3.jpg?v=1721368465&width=1000",
      price: "₹1.50",
      quantity: "100",
      sale: "10%",
      stock: "In Stock",
      startDate: "01-01-2023",
    },
    {
      id: "#002",
      name: "Banana",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg",
      price: "₹0.50",
      quantity: "200",
      sale: "5%",
      stock: "In Stock",
      startDate: "01-01-2023",
    },
    {
      id: "#003",
      name: "Milk",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/10/EZ/KE/XT/1486667/a2-cow-milk.jpg",
      price: "₹2.00",
      quantity: "50",
      sale: "15%",
      stock: "Out of Stock",
      startDate: "01-01-2023",
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
  };

  const totalPages = Math.ceil(products.length / entriesPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <p className="text-gray-300 mt-2">
          View, edit, and manage your product inventory.
        </p>
      </div>

    {/* Table Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Showing</span>
            <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="border rounded px-2 py-1 text-sm bg-gray-700 text-white"
            >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
            <span className="text-sm text-gray-300">entries</span>
          </div>

          <div className="relative">
            <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded-lg pl-2 pr-10 py-1 w-64 bg-gray-700 text-white"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/add-items")}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center"
          >
            <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
            </svg>
            Add New
          </button>
        </div>

        {/* Table */}
      <div className="overflow-x-auto bg-gray-700 p-4 rounded-lg">
        <table className="min-w-full divide-y divide-gray-600">
          <thead>
            <tr className="bg-gray-600">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Sale
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-600">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded"
                        src={product.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.sale}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-600">
                      Edit
                    </button>
                    <button className="text-red-400 hover:text-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-300">
          Showing {entriesPerPage * (currentPage - 1) + 1} to{" "}
          {Math.min(entriesPerPage * currentPage, products.length)} of{" "}
          {products.length} entries
        </div>

        <div className="flex space-x-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-3 py-1 rounded border text-gray-300 hover:bg-gray-700"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-3 py-1 rounded border text-gray-300 hover:bg-gray-700"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;