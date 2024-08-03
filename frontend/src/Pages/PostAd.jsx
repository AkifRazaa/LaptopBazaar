import React, { useState, useEffect } from "react";
import axios from "axios";
import { brands, operatingSystem, area } from "../Assets/brands";
import upload_area from "../Assets/upload_area.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostAd = () => {
  let navigate = useNavigate();

  const userId = localStorage.getItem("userID");

  const [images, setImages] = useState(Array.from({ length: 10 }, () => null));
  const [formData, setFormData] = useState({
    adTitle: "",
    description: "",
    condition: "",
    selectedBrand: "",
    selectedModel: "",
    selectedRegion: "",
    selectedCity: "",
    selectedOS: "",
    price: "",
    phoneNumber: "",
    wantsInspection: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [user, setUser] = useState({}); // State to store user details

  // Function to fetch user details from the backend
  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/user", {
        userId,
      });
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []); // Fetch user details on component mount

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Check if all required fields are filled
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key] === "") {
        toast.error(`Please fill in ${key}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        return;
      }
    }

    // Check if at least one image is uploaded
    if (images.filter((image) => image !== null).length === 0) {
      toast.error("Please upload at least one image", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post("http://localhost:5000/api/post", {
        image_urls: images.filter((image) => image !== null),
        adTitle: formData.adTitle,
        description: formData.description,
        condition: formData.condition,
        brand: formData.selectedBrand,
        model: formData.selectedModel,
        operatingSystem: formData.selectedOS,
        price: formData.price,
        photos: formData.photos,
        region: formData.selectedRegion,
        city: formData.selectedCity,
        showPhoneNumber: formData.phoneNumber,
        wantsInspection: formData.wantsInspection,
        user: userId,
      });

      if (response.status === 200) {
        toast.success("Your Ad has been sent for Admin approval", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Error in posting your Ad", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false); // Set loading state to false
      // Reset formData state
      setFormData({
        adTitle: "",
        description: "",
        condition: "",
        selectedBrand: "",
        selectedModel: "",
        selectedRegion: "",
        selectedCity: "",
        selectedOS: "",
        price: "",
        phoneNumber: "",
        wantsInspection: "",
      });
      setImages(Array.from({ length: 10 }, () => null));
    }
  };

  // Event handler for updating form data
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "radio" ? (checked ? value : "") : value; // Handle radio inputs
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleImage = (e, index) => {
    const file = e.target.files[0];

    if (!file) {
      // Handle case where no file is selected
      console.error("No file selected");
      return;
    }

    // converting image to base64 in order to send into backend
    const reader = new FileReader();
    reader.onload = () => {
      const newImages = [...images];
      newImages[index] = reader.result;
      setImages(newImages);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section>
      <h3 className="text-center mt-5">POST YOUR AD</h3>

      <form onSubmit={handleSubmit}>
        <div className="container-fluid p-5">
          {/* Ad Title */}
          <div className="mb-4">
            <label htmlFor="adTitle" className="form-label">
              Ad Title
            </label>
            <input
              type="text"
              className="form-control"
              id="adTitle"
              name="adTitle"
              value={formData.adTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Ad Description */}
          <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Ad Condition  */}
          <div className="mb-4">
            <p>Condition</p>

            <input
              type="radio"
              className="btn-check"
              name="condition"
              value="new"
              onChange={handleInputChange}
              id="option5"
              autoComplete="off"
              required
            />
            <label className="btn btn-outline-secondary me-3" htmlFor="option5">
              New
            </label>

            <input
              type="radio"
              className="btn-check"
              name="condition"
              value="used"
              onChange={handleInputChange}
              id="option6"
              autoComplete="off"
              required
            />
            <label className="btn btn-outline-secondary" htmlFor="option6">
              Used
            </label>
          </div>

          {/* Brand drop down menu */}
          <div className="mb-4">
            {/* Select menu for brands */}
            <label>Brands</label>
            <select
              name="selectedBrand"
              value={formData.selectedBrand}
              onChange={handleInputChange}
              className="form-select mb-4"
              aria-label="Default select example"
              required
            >
              <option value="" disabled>
                Select Brand
              </option>

              {brands.map((brand, index) => (
                <option key={index} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>

            {/* Select menu for models, dynamically populated based on selected brand */}

            {formData.selectedBrand && (
              <>
                <label>Models</label>
                <select
                  name="selectedModel"
                  value={formData.selectedModel}
                  onChange={handleInputChange}
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option value="" disabled>
                    Select Model
                  </option>

                  {brands
                    .find((brand) => brand.name === formData.selectedBrand)
                    .models.map((model, index) => (
                      <option key={index} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </>
            )}
          </div>

          {/* Operating System Dropdown */}

          <div className="mb-4">
            <label>Operating System</label>
            <select
              className="form-select mb-4"
              aria-label="Default select example"
              name="selectedOS"
              value={formData.selectedOS}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Operating System
              </option>

              {operatingSystem.map((os, index) => (
                <option key={index} value={os}>
                  {os}
                </option>
              ))}
            </select>
          </div>

          {/* Set Price */}
          <div className="mb-4">
            <h6>Set a Price</h6>

            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Set Images */}
          <h6>UPLOAD UP TO 10 PHOTOS</h6>
          <div
            className="mb-4"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* Loop through each input to display image upload area */}
            {images.map((image, index) => (
              <div key={index} style={{ marginRight: "10px" }}>
                <label htmlFor={`file-input-${index}`}>
                  {/* If an image is uploaded, display the uploaded image, else show the upload_area icon */}
                  {/* URL.createObjectURL(image) */}
                  <img
                    src={image ? image : upload_area}
                    style={{
                      height: "120px",
                      width: "120px",
                      borderRadius: "10px",
                      objectFit: "contain",
                      margin: "10px 0px",
                      cursor: "pointer",
                    }}
                    alt=""
                  />
                </label>
                {/* Input element for uploading image */}
                <input
                  onChange={(e) => handleImage(e, index)} // Pass index to the handleImage function
                  type="file"
                  name={`image-${index}`}
                  id={`file-input-${index}`}
                  hidden
                  required
                />
              </div>
            ))}
          </div>

          {/* Set Region and city */}
          <div className="mb-4">
            {/* Select menu for brands */}
            <label>Region</label>
            <select
              name="selectedRegion"
              value={formData.selectedRegion}
              onChange={handleInputChange}
              className="form-select mb-4"
              aria-label="Default select example"
              required
            >
              <option value="" disabled>
                Select Region
              </option>

              {area.map((data, index) => (
                <option key={index} value={data.region}>
                  {data.region}
                </option>
              ))}
            </select>

            {/* Select menu for models, dynamically populated based on selected brand */}

            {formData.selectedRegion && (
              <>
                <label>City</label>
                <select
                  name="selectedCity"
                  value={formData.selectedCity}
                  onChange={handleInputChange}
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option value="" disabled>
                    Select City
                  </option>

                  {area
                    .find((data) => data.region === formData.selectedRegion)
                    .city.map((cities, index) => (
                      <option key={index} value={cities}>
                        {cities}
                      </option>
                    ))}
                </select>
              </>
            )}
          </div>

          <div className="mb-4">
            <h5>Your Details</h5>
            <p>Your Name {user.name} </p>
            <p>Phone number: {user.phoneNumber} </p>
            <h6>Show my phone number in ads</h6>

            <input
              type="radio"
              className="btn-check"
              name="phoneNumber"
              value="yes"
              onChange={handleInputChange}
              id="option7"
              autoComplete="off"
              required
            />
            <label className="btn btn-outline-secondary me-3" htmlFor="option7">
              Yes
            </label>

            <input
              type="radio"
              className="btn-check"
              name="phoneNumber"
              value="no"
              onChange={handleInputChange}
              id="option8"
              autoComplete="off"
              required
            />
            <label className="btn btn-outline-secondary" htmlFor="option8">
              No
            </label>
          </div>

          <div className="mb-4">
            <h6>Do want to inspect it?</h6>

            <input
              type="radio"
              className="btn-check"
              name="wantsInspection"
              value="yes"
              onChange={handleInputChange}
              id="option9"
              autoComplete="off"
              required
            />
            <label className="btn btn-outline-secondary me-3" htmlFor="option9">
              Yes
            </label>

            <input
              type="radio"
              className="btn-check"
              name="wantsInspection"
              value="no"
              onChange={handleInputChange}
              id="option10"
              autoComplete="off"
              required
            />
            <label
              className="btn btn-outline-secondary me-3"
              htmlFor="option10"
            >
              No
            </label>

            {formData.wantsInspection === "yes" && (
              <p>Price for inspection is 2000 Rs</p>
            )}
          </div>

          {/* <button className="btn btn-secondary mt-5 p-2">Post now</button> */}

          {/* Loading State */}
          {isLoading ? (
            <button className="btn btn-secondary mt-5 p-2" disabled>
              Loading...
            </button>
          ) : (
            <button
              className="btn btn-secondary mt-5 p-2"
              onClick={handleSubmit}
            >
              Post now
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default PostAd;
