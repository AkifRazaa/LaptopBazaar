import React, { useState } from "react";
import "./Filter.css";
import { FaSearch } from "react-icons/fa";
import { brands, area } from "../../Assets/brands";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  let navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [selectValue1, setSelectValue1] = useState("All Brands");
  const [selectValue2, setSelectValue2] = useState("All Cities");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange1 = (e) => {
    setSelectValue1(e.target.value);
  };

  const handleSelectChange2 = (e) => {
    setSelectValue2(e.target.value);
  };

  const handleSearchClick = () => {
    setInputValue("");
    setSelectValue1("All Brands");
    setSelectValue2("All Cities");

    navigate(
      `/shop?brand=${selectValue1}&city=${selectValue2}&query=${inputValue}`
    );

    // navigate(`/shop/${selectValue1}/${selectValue2}/${inputValue}`);
  };

  return (
    <section className="filter">
      <div className="container">
        <input
          style={{ height: "60px" }}
          className="form-control"
          type="text"
          placeholder="Enter brand or model"
          aria-label="default input example"
          value={inputValue}
          onChange={handleInputChange}
        />

        <select
          style={{ height: "60px" }}
          className="form-select"
          aria-label="Default select example"
          value={selectValue1}
          onChange={handleSelectChange1}
        >
          <option value="All Brands">All Brands</option>

          {brands.map((brand, index) => (
            <option key={index} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          style={{ height: "60px" }}
          className="form-select"
          aria-label="Default select example"
          value={selectValue2}
          onChange={handleSelectChange2}
        >
          <option value="All Cities">All Cities</option>

          {area.map((region) =>
            region.city.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))
          )}
        </select>

        <div className="search-icon" onClick={handleSearchClick}>
          <FaSearch />
        </div>
      </div>
    </section>
  );
};

export default Filter;
