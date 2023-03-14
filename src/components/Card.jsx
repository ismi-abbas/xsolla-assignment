import "../styles/App.css";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

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
    <div className="grid grid-row-2 row-auto border-white border container">
      {/* grid 1 */}
      <div className="row-span-1 grid-rows-2">
        <div href="#" className="flex justify-center">
          <img className="object-cover h-60 w-60 mx-auto" src={image} alt="" />
        </div>

        <div className="pb-2 border border-green-500">
          <div className="pt-2 mb-4 w-64 border border-red-700">
            <a href="#">
              <h3 className="font-lg game-title">{title}</h3>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description ?? "No description"}
            </p>
          </div>
        </div>
      </div>
      {/* grid 2 */}
      <div className="grid grid-flow-col items-center justify-center pb-2">
        <div className="row-span-1 inline-flex items-center pl-2 text-sm font-medium text-start text-white rounded-full bg-slate-400 hover:bg-green-500 hover:cursor-pointer">
          {getCurrenySymbol(currency)} {price} Buy Now
          <span className="ml-10 rounded-full bg-green-500 p-2">
            <RiShoppingBag3Line size={20} />
          </span>
        </div>
        <div className="ml-4">
          <div className="rounded-full p-2 bg-orange-500 hover:cursor-pointer">
            <AiOutlineArrowRight className="bg-orange-500" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
