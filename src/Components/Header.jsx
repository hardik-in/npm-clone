import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "./Dropdown"; 

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [version, setVersion] = useState("");                     
  const [suggestions, setSuggestions] = useState([]);             
  const [showDropdown, setShowDropdown] = useState(false);        
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=5`
          );
          const packages = response.data.objects.map((pkg) => pkg.package.name);
          setSuggestions(packages);
          setShowDropdown(true);                                  
        } catch (err) {
          console.error(err);
        }
      };

      const timeoutId = setTimeout(() => fetchSuggestions(), 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setShowDropdown(false);                                    
    }
  }, [searchTerm]);

  const handleSearch = async (packageName) => {
    if (!packageName) {
      alert("Please enter a package name");
      return;
    }

    try {
      const response = version
        ? await axios.get(
            `https://registry.npmjs.org/${packageName}/${version}`
          )
        : await axios.get(`https://registry.npmjs.org/${packageName}`);

      const packageData = response.data;

      if (version) {
        navigate(`/package/${packageName}/version/${version}`, {
          state: { packageData, packageName, version },
        });
      } else {
        navigate(`/package/${packageName}`, {
          state: { packageData, packageName },
        });
      }
    } catch (err) {
      navigate("/NotFound");
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setShowDropdown(false); 
    handleSearch(suggestion);
  };

  return (
    <div>
      <div className="h-[1vh] bg-red-700"></div>
      <div className="h-[22vh] bg-white w-full flex justify-center items-center gap-5 shadow-lg">
        <button onClick={() => navigate("/")}>
          <img src="/npm.svg" alt="NPM Logo" className="w-[20vh] h-full" />
        </button>
        <div className="bg-zinc-200 w-[80%] border flex border-black relative">
          <i className="ri-search-line flex items-center ml-5"></i>
          <input
            type="text"
            placeholder=" Search Packages"
            className="focus:outline-none p-4 w-full bg-zinc-200"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <div className="border-l-2 border-gray-400"></div>
          <input
            type="text"
            placeholder=" Enter specific version here (optional)"
            className="focus:outline-none p-4 w-full bg-zinc-200"
            onChange={(e) => setVersion(e.target.value)}
            value={version}
          />
          <button
            className="bg-black text-white font-mono font-bold p-4 hover:bg-purple-700 transition-colors duration-500"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </button>
          {showDropdown && (
            <Dropdown
              suggestions={suggestions}
              onSelect={handleSelectSuggestion}
              onClose={() => setShowDropdown(false)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
