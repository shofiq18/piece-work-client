// import React, { useEffect, useState } from "react";

// const BestWorkers = () => {
//   const [topWorkers, setTopWorkers] = useState([]);

//   useEffect(() => {
//     const fetchTopWorkers = async () => {
//       try {
//         const response = await fetch("https://piece-work-server.vercel.app/top-workers"); // Replace with your backend URL
//         const data = await response.json();
//         setTopWorkers(data);
//       } catch (error) {
//         console.error("Error fetching top workers:", error);
//       }
//     };

//     fetchTopWorkers();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
//       <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
//         🌟 Best Workers 🌟
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
//         {topWorkers.map((worker, index) => (
//           <div
//             key={worker._id}
//             className={`relative group bg-gradient-to-r ${
//               index % 2 === 0
//                 ? "from-indigo-500 via-purple-500 to-pink-500"
//                 : "from-green-400 via-blue-500 to-purple-600"
//             } p-6 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105`}
//           >
//             {/* Gradient Glow Effect */}
//             <div
//               className="absolute -inset-1 bg-gradient-to-r from-white to-transparent rounded-lg blur opacity-70 
//               group-hover:opacity-100 transition-opacity duration-300"
//             ></div>
//             <div className="relative z-10 text-center">
//               <img
//                 src={worker.photo || "https://via.placeholder.com/150"}
//                 alt={worker.name}
//                 className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
//               />
//               <h3 className="text-xl font-bold text-white">{worker.name}</h3>
//               <p className="text-white text-sm mt-2">
//                 Available Coins: <span className="font-semibold">{worker.coins}</span>
//               </p>
//             </div>
//             {/* Animation on Hover */}
//             <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestWorkers;
import React, { useEffect, useState } from "react";
import "animate.css";


const BestWorkers = () => {
  const [topWorkers, setTopWorkers] = useState([]);

  useEffect(() => {
    const fetchTopWorkers = async () => {
      try {
        const response = await fetch("https://piece-work-server.vercel.app/top-workers"); // Replace with your backend URL
        const data = await response.json();
        setTopWorkers(data);
      } catch (error) {
        console.error("Error fetching top workers:", error);
      }
    };

    fetchTopWorkers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 animate__animated animate__fadeIn">
        🌟 Best Workers 🌟
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {topWorkers.map((worker, index) => (
          <div
            key={worker._id}
            className={`relative group bg-gradient-to-r ${
              index % 2 === 0
                ? "from-indigo-600 via-purple-600 to-pink-500"
                : "from-teal-500 via-blue-500 to-indigo-600"
            } p-6 rounded-xl shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:rotate-2`}
          >
            {/* Glow Effect */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-white to-transparent rounded-xl blur opacity-70 
              group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div className="relative z-10 text-center">
              <img
                src={worker.photo || "https://via.placeholder.com/150"}
                alt={worker.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-lg transform transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="text-xl font-bold text-white text-shadow-md">{worker.name}</h3>
              <p className="text-white text-sm mt-2">
                Available Coins: <span className="font-semibold">{worker.coins}</span>
              </p>
            </div>
            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
