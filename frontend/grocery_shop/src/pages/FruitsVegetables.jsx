import React from "react";

const FruitsVegetables = () => {
  const products = [
    {
      id: 1,
      name: "Organic Sweet Corn",
      image: "/api/placeholder/150/150",
      discount: "17%",
      weight: "1 kg",
      originalPrice: "₹18.00",
      salePrice: "₹14.99",
      inStock: true,
    },
    {
      id: 2,
      name: "Native Organic Papaya",
      image: "/api/placeholder/150/150",
      discount: "34%",
      weight: "1 kg",
      originalPrice: "₹15.00",
      salePrice: "₹9.99",
      inStock: true,
    },
    {
      id: 3,
      name: "Green Seedless Grapes",
      image: "/api/placeholder/150/150",
      discount: "59%",
      weight: "1 kg",
      originalPrice: "₹12.00",
      salePrice: "₹4.99",
      inStock: true,
    },
    {
      id: 4,
      name: "Organic Grape Tomatoes",
      image: "/api/placeholder/150/150",
      discount: "43%",
      weight: "1 kg",
      originalPrice: "₹7.00",
      salePrice: "₹3.99",
      inStock: true,
    },
    {
      id: 5,
      name: "Organic Broccoli",
      image: "/api/placeholder/150/150",
      discount: "30%",
      weight: "1 kg",
      originalPrice: "₹10.00",
      salePrice: "₹7.00",
      inStock: true,
    },
    {
      id: 6,
      name: "Washed Sugar Snap Peas",
      image: "/api/placeholder/150/150",
      discount: "20%",
      weight: "1 kg",
      originalPrice: "₹5.00",
      salePrice: "₹4.00",
      inStock: true,
    },
    {
      id: 7,
      name: "Organic Strawberry",
      image: "/api/placeholder/150/150",
      discount: "42%",
      weight: "1 kg",
      originalPrice: "₹12.00",
      salePrice: "₹7.00",
      inStock: true,
    },
    {
      id: 8,
      name: "Organic Vegetable",
      image: "/api/placeholder/150/150",
      discount: "50%",
      weight: "",
      originalPrice: "₹10.00",
      salePrice: "₹5.00",
      inStock: true,
    },
  ];

  return (
    <div className="bg-gray-800 min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Fruits & Vegetables</h2>
          <span className="ml-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Fresh & Organic
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-700 p-4 rounded-lg shadow-sm relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-green-100 text-green-500 text-sm font-medium px-2 py-1 rounded">
                {product.discount}
              </div>

              {/* Product Image */}
              <div className="flex justify-center my-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-auto object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-green-400 font-medium mb-2">
                  {product.name}
                </h3>

                {/* Stock Status */}
                <div className="flex items-center justify-center text-sm text-gray-300 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>In Stock</span>
                  {product.weight && (
                    <>
                      <span className="mx-1">-</span>
                      <span>{product.weight}</span>
                    </>
                  )}
                </div>

                {/* Price */}
                <div className="flex justify-center items-center gap-2 mb-4">
                  <span className="text-gray-400 line-through text-sm">
                    {product.originalPrice}
                  </span>
                  <span className="text-white font-medium">
                    {product.salePrice}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full py-2 px-4 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 7V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 7H4C3.44772 7 3 7.44772 3 8V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V8C21 7.44772 20.5523 7 20 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FruitsVegetables;