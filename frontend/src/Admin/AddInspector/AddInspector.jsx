import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { area } from "../../Assets/brands";
import axios from "axios";
import { adminLinks } from "../../Assets/sidebar_links";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";


const AddInspector = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    selectedRegion: "",
    selectedCity: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Event handler for updating form data
  const handleInputChange = (e) => {
    setErrors({}); // Reset errors state
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    const errors = {};
    if (!formData.name || !formData.email || !formData.password || !formData.selectedRegion || !formData.selectedCity || !formData.phoneNumber) {
      errors.all = "All fields are required";
    }
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.selectedRegion || formData.selectedRegion === "") errors.selectedRegion = "Region is required";
    if (!formData.selectedCity || formData.selectedCity === "") errors.selectedCity = "City is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-inspector",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          region: formData.selectedRegion,
          city: formData.selectedCity,
          phoneNumber: formData.phoneNumber,
        }
      );

      if (response.status === 200) {
        toast.success("Inspector added successfully", {
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
       if(error.response && error.response.status === 400){
        toast.error("Inspector already exists", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }else {
        console.log(error);
      }
    }

    setLoading(false);


    // Reset formData state
    setFormData({
      name: "",
      email: "",
      password: "",
      selectedRegion: "",
      selectedCity: "",
      phoneNumber: "",
    });
  };

  return (
    <>
      <Sidebar links={adminLinks} isAdmin={true} />

      <div className="w3-main" style={{ marginLeft: "200px" }}>
        <div className="w3-container table-responsive">
          <h1 className="text-center mb-5">Add Inspector</h1>

          <form className="m-5" onSubmit={handleSubmit}>
            {/* 2 column grid layout with text inputs for the first and last names */}

            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="form6Example1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />

{errors.name && <div className="text-danger">{errors.name}</div>}

                </div>
              </div>

              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="form6Example2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="form6Example2"
                    className="form-control"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />

{errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}

                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="form6Example3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="form6Example3"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

{errors.email && <div className="text-danger">{errors.email}</div>}

                </div>
              </div>

              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="form6Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form6Example4"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />

{errors.password && <div className="text-danger">{errors.password}</div>}

                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">

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

                
              {errors.selectedRegion && <div className="text-danger">{errors.selectedRegion}</div>}

              </div>

              <div className="col">
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

                  {errors.selectedCity && <div className="text-danger">{errors.selectedCity}</div>}
                    

                  </>
                )}
              </div>
            </div>

{/* Loader */}
            {loading && (
              <div className="d-flex justify-content-center mb-3">
                <RingLoader color={"#123abc"} loading={loading} size={50} />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
              disabled={loading}
            >
              {loading ? "Adding Inspector..." : "Add Inspector"}
            </button>

            
          </form>
        </div>
      </div>
    </>
  );
};

export default AddInspector;
