import React from "react";

const Dropdown = ({ suggestions, onSelect, onClose }) => {
  return (
    <div className="absolute bg-white border border-gray-400 w-[48%] overflow-y-auto shadow-lg mt-20 font-serif">
      <div className="flex justify-between p-2">
        <span className="font-bold"> Suggestions</span>
        <button
          className="text-red-500 font-bold text-xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="p-2 hover:bg-red-300 cursor-pointer transition duration-300 ease-in-out"
              onClick={() => onSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">Nothing Found</li>
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
