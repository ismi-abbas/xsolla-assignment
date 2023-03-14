import { useState, useEffect } from "react";
import Card from "./Card";
const API_URL =
  "https://store.xsolla.com/api/v2/project/36867/items/game?locale=en";

function Pagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function fetchData() {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 rid-cols-2 p-8 border border-black">
      {itemsToDisplay.map((item) => (
        <Card
          key={item.item_id}
          image={item.image_url}
          title={item.name}
          price={item.unit_items[0].price.amount}
          currency={item.unit_items[0].price.currency}
        />
      ))}
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
  );
}

export default Pagination;
