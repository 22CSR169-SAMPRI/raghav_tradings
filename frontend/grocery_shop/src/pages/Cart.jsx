import React from "react";

const Cart = () => {
  // Sample cart data
  const cartItems = [
    {
      id: 1,
      
      name: "Carrot",
      quantity: 2,
      price: "₹3.00",
    },
    {
      id: 2,
      
      name: "Banana",
      quantity: 5,
      price: "₹2.50",
    },
    {
      id: 3,
      
      name: "Coffee",
      quantity: 1,
      price: "₹2.00",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-50">
      {/* Main content - Cart Items and Totals */}
      <div className="flex-grow">
        {/* Cart Items Section */}
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-medium">Your Cart</h2>
            
          </div>

          <div className="p-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start py-4 border-b last:border-b-0"
              >
                
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Product name</p>
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p>{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="font-medium">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Totals Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium">Cart Totals</h2>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className="mb-4">
                  <p>Subtotal:</p>
                </div>
                <div className="mb-4">
                  <p>Shipping:</p>
                </div>
                <div className="mb-4">
                  <p>Tax (GST):</p>
                </div>
                <div className="font-medium">
                  <p>Total price:</p>
                </div>
              </div>

              <div className="col-span-1 text-right">
                <div className="mb-4">
                  <p className="font-medium">₹7.50</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">₹2.00</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">₹0.50</p>
                </div>
                <div>
                  <p className="font-medium text-orange-500">₹10.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar with Checkout Information */}
      <div className="lg:w-96">
        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <h2 className="font-medium mb-4">Summary</h2>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Items in Cart</div>
            <div className="font-medium">{cartItems.length}</div>

            <div className="text-gray-600">Subtotal</div>
            <div className="font-medium">₹7.50</div>

            <div className="text-gray-600">Total</div>
            <div className="font-medium text-orange-500">₹10.00</div>
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <h2 className="font-medium mb-4">Shipping Address</h2>
          <p className="text-gray-700">
            ABC street, Erode
          </p>
        </div>

        {/* Payment Method Section */}
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <h2 className="font-medium mb-4">Payment Method</h2>
          <p className="text-gray-700">
            Pay on Delivery (Cash/Card). 
            Cash on delivery (COD) available.
            
          </p>
        </div>

        {/* Checkout Button */}
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <button className="w-full bg-blue-500 text-white rounded-lg py-2 px-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;