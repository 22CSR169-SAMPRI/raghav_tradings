import React from "react";

const CoffeeTea = () => {
  const products = [
    {
      id: 1,
      name: "Organic Green Tea",
      image: "/api/placeholder/150/150",
      discount: "10%",
      weight: "250 g",
      originalPrice: "₹15.00",
      salePrice: "₹13.50",
      inStock: true,
    },
    {
      id: 2,
      name: "Arabica Coffee Beans",
      image: "/api/placeholder/150/150",
      discount: "20%",
      weight: "1 kg",
      originalPrice: "₹20.00",
      salePrice: "₹16.00",
      inStock: true,
    },
    {
      id: 3,
      name: "Herbal Tea",
      image: "/api/placeholder/150/150",
      discount: "15%",
      weight: "500 g",
      originalPrice: "₹12.00",
      salePrice: "₹10.20",
      inStock: true,
    },
    {
      id: 4,
      name: "Espresso Coffee Powder",
      image: "/api/placeholder/150/150",
      discount: "25%",
      weight: "500 g",
      originalPrice: "₹18.00",
      salePrice: "₹13.50",
      inStock: true,
    },
  ];

  return (
    <div className="bg-gray-800 min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Coffee & Tea</h2>
          <span className="ml-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Refreshing & Energizing
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

export default CoffeeTea;