import "../styles/App.css";
import { RiShoppingBag3Line } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";

const getCurrenySymbol = (currency) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return currency;
  }
};

function Card({ title, image, description, currency, price, link }) {
  return (
    <div className="justify-items-center align-items-center pb-2 mt-4">
      {/* grid 1 */}
      <div className="flex flex-col justify-center items-center">
        <div href="#" className="flex justify-center">
          <img className="object-cover h-60 w-60 mx-auto" src={image} alt="" />
        </div>

        <div className="pb-2 w-64 h-28 overflow-auto">
          <div className="pt-2 mb-4">
            <a href="#">
              <h3 className="font-lg game-title">{title}</h3>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description ?? "No description"}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button className="buy-button">
            <span className="mr-2">
              {getCurrenySymbol(currency)} {price} Buy Now
            </span>
            <span className="rounded-full bg-green-500 p-2">
              <RiShoppingBag3Line size={20} />
            </span>
          </button>
          {/* Arrow */}
          <div className="ml-3 rounded-full p-2 bg-orange-500 hover:cursor-pointer">
            <AiOutlineArrowRight className="bg-orange-500" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
