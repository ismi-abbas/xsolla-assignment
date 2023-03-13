import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";

const API_URL =
  "https://store.xsolla.com/api/v2/project/36867/items/game?locale=en";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(API_URL);
    const slicedData = (await response.json()).items.slice(0, 44);
    setData(slicedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-purple-800 w-screen h-auto">
      <div className="text-center text-white pt-4 font-bold tracking-wide">
        Game Cards
        <div className="grid md:grid-cols-3 lg:grid-cols-4 rid-cols-2 p-8">
          {data &&
            data.map((item) => (
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
  );
}

export default App;
