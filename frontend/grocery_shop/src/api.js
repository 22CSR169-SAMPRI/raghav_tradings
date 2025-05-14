import axios from "axios";

const API = axios.create({
  baseURL: "https://raghav-tradings.onrender.com", 
  headers: { "Content-Type": "application/json" },
});

export default API;

//"https://raghav-tradings.onrender.com", 
//"http://localhost:5000",    // Adjust if needed