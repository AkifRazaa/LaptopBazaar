import React, { useState } from "react";
import { area } from "../Assets/brands";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";

const Career = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    selectedRegion: "",
    selectedCity: "",
    phoneNumber: "",
    cnic: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cv, setCv] = useState(null); // State for the input file

  const userId = localStorage.getItem("userID");

  // Event handler for updating form data
  const handleInputChange = (e) => {
    setErrors({}); // Reset errors state
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Input validation for CNIC
    if (e.target.name === "cnic") {
      const cnicValue = e.target.value;
      if (!/^\d{13}$/.test(cnicValue)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cnic: "CNIC must be 13 digits long.",
        }));
      } else if (cnicValue.includes("-")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cnic: "Do not use dashes (-) in CNIC.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, cnic: "" }));
      }
    }

    // Input validation for Phone Number
    if (e.target.name === "phoneNumber") {
      const phoneNumberValue = e.target.value;
      if (!/^\d{11}$/.test(phoneNumberValue)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Phone number must be 11 digits long.",
        }));
      } else if (phoneNumberValue.includes("-")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Do not use dashes (-) in phone number.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    const reader = new FileReader(); // Create a new FileReader object

    // Define a callback function for when the file reading is completed
    reader.onloadend = () => {
      // Check if the file was successfully read
      if (reader.readyState === FileReader.DONE) {
        // Retrieve the base64 representation of the file
        const base64String = reader.result;

        // Set the base64 value in state
        setCv(base64String);
      }
    };

    // Read the file as a data URL, which returns a base64 encoded string
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    // Validation for other fields
    const { name, email, address, selectedRegion, selectedCity } = formData;
    let formErrors = {};

    if (!name.trim()) {
      formErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Invalid email format.";
    }

    if (!address.trim()) {
      formErrors.address = "Address is required.";
    }

    if (!selectedRegion) {
      formErrors.selectedRegion = "Region is required.";
    }

    if (!selectedCity) {
      formErrors.selectedCity = "City is required.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/career", {
          userId: userId,
          name: name,
          email: email,
          address: address,
          region: selectedRegion,
          city: selectedCity,
          phoneNumber: formData.phoneNumber,
          cv: cv,
          cnic: formData.cnic,
        });

        if (response.status === 201) {
          toast.success("Application sent successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.error("Internal server error", {
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
      }

      // Reset formData state and input file state
      setFormData({
        name: "",
        email: "",
        address: "",
        selectedRegion: "",
        selectedCity: "",
        phoneNumber: "",
        pdfBase64: "",
        cnic: "",
      });
      setCv(null);
    }

    setLoading(false); // Set loading state to false after form submission
  };

  return (
    <>
      <div className="container">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            {/* Select menu for brands */}
            <label>Region</label>
            <select
              name="selectedRegion"
              value={formData.selectedRegion}
              onChange={handleInputChange}
              className="form-select mb-4"
              aria-label="Default select example"
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
          </div>

          <div className="col-md-6">
            {formData.selectedRegion && (
              <>
                <label>City</label>
                <select
                  name="selectedCity"
                  value={formData.selectedCity}
                  onChange={handleInputChange}
                  className="form-select"
                  aria-label="Default select example"
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

          <div className="col-md-4">
            <label htmlFor="formFile" class="form-label">
              CV - In png or jpeg form
            </label>
            <input
              className="form-control"
              type="file"
              accept="image/png, image/jpeg" // Specify accepted file types as PNG and JPEG
              id="formFile"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="inputZip" className="form-label">
              CNIC (without dash - )
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="inputPhone" className="form-label">
              Phone Number (without dash - )
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPhone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          {/* Display Errors  */}
          <div className="row">
            <div className="col-12 text-danger">
              {errors.name && <p>{errors.name}</p>}
              {errors.email && <p>{errors.email}</p>}
              {errors.address && <p>{errors.address}</p>}
              {errors.selectedRegion && <p>{errors.selectedRegion}</p>}
              {errors.selectedCity && <p>{errors.selectedCity}</p>}
              {errors.cnic && <p>{errors.cnic}</p>}
              {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            </div>
          </div>

          {loading && (
            <div className="d-flex justify-content-center mb-3">
              <RingLoader color={"#123abc"} loading={loading} size={50} />
            </div>
          )}

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Career;
