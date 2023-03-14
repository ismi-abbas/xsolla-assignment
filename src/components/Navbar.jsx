import team17Image from "../assets/team17.png";
import { useState } from "react";

function Navbar({ search }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    search(searchInput);
  };

  return (
    <nav className="px-2 sm:px-4 py-2.5 rounded bg-purple-900 flex">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src={team17Image}
            className="h-6 mr-3 sm:h-9"
            alt="Team17 Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden"
        ></button>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li className="opacity-70">
              <input
                placeholder="Search"
                className="block w-full p-2 pl-10 text-sm rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </li>
            <span className="p-2 text-white">
              <a href="#" className="p-2 text-white">
                Login/Register
              </a>
            </span>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
