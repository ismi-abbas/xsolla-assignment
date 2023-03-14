import { useState, useEffect } from "react";
import "./styles/App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import Carousel from "./components/Carousel";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const API_URL =
  "https://store.xsolla.com/api/v2/project/36867/items/game?locale=en";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [carouselImages, setCarouselImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const setSearch = (searchKey) => {
    setSearchTerm(searchKey);
    handleSearch(searchKey);
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

  const handleSearch = (searchKey) => {
    let filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setData(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="bg-purple-800 p-10 item-center">
      <Navbar setSearch={setSearch} />
      <Carousel images={carouselImages} />

      <div className="text-white pt-4 font-bold tracking-wide">
        <h2 className="game-title text-4xl text-center mt-5">Game Cards</h2>
        <div className="px-20 pt-5 mx-20 justify-items-center">
          <div className="flex flex-wrap basis-4 justify-center">
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
        </div>
      </div>
      {/* Pagination */}
      <nav className="flex justify-items-center justify-center">
        <ul className="grid md:grid-cols-7 grid-cols-2 items-center pb-4">
          {currentPage > 1 && (
            <li>
              <a
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-4 m-2"
              >
                <div className="ml-3 rounded-full p-2 bg-orange-500 hover:cursor-pointer text-white">
                  <AiOutlineArrowLeft className="bg-orange-500" size={20} />
                </div>
              </a>
            </li>
          )}
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            const startPage = Math.max(currentPage - 2, 1);
            const endPage = Math.min(currentPage + 2, totalPages);
            const mobileLimit = 5;
            if (page < startPage || page > endPage) {
              return null;
            }

            return (
              <li key={i}>
                <a
                  onClick={() => handlePageChange(page)}
                  className={`p-4 leading-tight m-2 rounded-full hover:cursor-pointer ${
                    currentPage === page
                      ? "bg-orange-500 text-white"
                      : "bg-slate-400"
                  } ${mobileLimit < totalPages ? "hidden md:block" : ""}`}
                >
                  {page}
                </a>
              </li>
            );
          })}

          {currentPage < totalPages && (
            <li>
              <a
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-4 leading-tight m-2"
              >
                <div className="ml-3 rounded-full p-2 bg-orange-500 hover:cursor-pointer text-white">
                  <AiOutlineArrowRight className="bg-orange-500" size={20} />
                </div>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default App;
