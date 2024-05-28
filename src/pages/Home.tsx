// import React from "react";
// import { Link } from "react-router-dom";

// const Home: React.FC = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <div style={{ textAlign: "center" }}>
//         <Link to="/registration">
//           <button>Registration</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch("http://localhost:4000/images");
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);
  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Home Page</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table style={{ margin: "auto" }}>
              <thead>
                <tr>
                  <th>Make And Model</th>
                  <th>Rate Card Segment</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.makeAndMod}</td>
                    <td>{item.rateCardSegment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/registration">
              <button>Registration</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
