import { useNavigate } from "react-router-dom";

const ShopDetails = () => (
  <div className="bg-gray-900 text-white p-8">
    <h2 className="text-3xl font-bold mb-6">Shop Details</h2>
    <p className="text-gray-400">Address: 33, Sai Abiram nagar, Gobichetipalayam - 638452</p>
    <p className="text-gray-400">Phone: +91 99620 22273</p>
    <p className="text-gray-400">Opening Hours: Mon-Sat, 9:00 AM - 8:00 PM</p>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative flex flex-col-reverse md:flex-row items-center justify-between bg-blue-50 py-12 px-6 md:px-16">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Raghav Tradings
            <br />
          </h1>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-6">
            Explore Our Shop Details
          </h3>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-800 text-white hover:bg-gray-700 px-8 py-3 rounded-full text-lg"
          >
            Login here!
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-end">
          <div className="relative w-full max-w-[500px] h-[500px]">
            <div className="absolute inset-0 bg-blue-100 rounded-full -right-12 -top-12"></div>
            <div className="relative grid grid-cols-3 gap-4 h-full">
              <div className="col-span-1 flex items-center justify-center">
                <div className="w-32 h-48 bg-white shadow-lg rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Featured Product</span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="w-48 h-64 bg-white shadow-lg rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Best Seller</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Details */}
      <ShopDetails />
    </div>
  );
};

export default Home;