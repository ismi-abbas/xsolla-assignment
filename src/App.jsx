import { useState, useEffect } from "react";
import "./styles/App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import Carousel from "./components/Carousel";

const API_URL =
  "https://store.xsolla.com/api/v2/project/36867/items/game?locale=en";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [carouselImages, setCarouselImages] = useState([]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  const fetchData = () => {
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setData(data.items);
        const images = data.items.slice(0, 4).map((item) => item.image_url);
        setCarouselImages([...images]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-purple-800 h-auto p-10 justify-items-center min-h-screen">
      <Navbar />
      <Carousel images={carouselImages} />
      
      <div className="text-center text-white pt-4 font-bold tracking-wide border-2 border-black ">
        Game Cards
        <div className="grid grid-cols-4 m-2 border border-black">
          {itemsToDisplay &&
            itemsToDisplay.map((item) => (
              <Card
                key={item.item_id}
                image={item.image_url}
                title={item.name}
                price={item.unit_items[0].price.amount}
                currency={item.unit_items[0].price.currency}
              />
            ))}
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              className="p-2 rounded-md hover:cursor-pointer"
              key={i}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
