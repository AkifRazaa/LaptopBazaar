// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./CSS/LoginSignup.css";
// import { toast } from "react-toastify";

// function LoginSignup({ loginRole = "" }) {
//   let navigate = useNavigate();

//   const [state, setState] = useState("Login");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     name: "",
//     password: "",
//     email: "",
//     phoneNumber: "",
//   });

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//     // Clear validation errors when input changes
//     setErrors({});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     // Validate form inputs for login
//     if (state === "Login") {
//       const loginFormErrors = validateLoginInputs(formData);
//       if (Object.keys(loginFormErrors).length > 0) {
//         setErrors(loginFormErrors);
//         return;
//       }
//     } else {
//       // Validate form inputs for signup
//       const formErrors = validateSignUpInputs(formData);
//       if (Object.keys(formErrors).length > 0) {
//         setErrors(formErrors);
//         return;
//       }
//     }

//     setLoading(true);

//     if (state === "Login") {
//       login();
//     } else {
//       signup();
//     }
//   };

//   const login = async () => {
//     console.log("Login fucntion");

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api${loginRole}/login`,
//         {
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       if (response.status === 200) {
//         localStorage.setItem("userID", response.data.user._id);
//         localStorage.setItem("authToken", response.data.token);
//         localStorage.setItem("role", response.data.user.role);

//         console.log("Tokens created");

//         loginRole === "/user" ? navigate("/") : navigate("/inspector");

//         toast.success("Login Successful", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       console.error("Login error:", error); // console log error

//       if (error.response) {
//         if (error.response.status === 401) {
//           if (error.response.data.message === "User does not exist") {
//             toast.error("User does not exists", {
//               position: "top-right",
//               autoClose: 2000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "colored",
//             });
//           } else {
//             toast.error("Invalid credentials", {
//               position: "top-right",
//               autoClose: 2000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "colored",
//             });
//           }
//         } else {
//           console.log("An error occurred:", error);
//         }
//       }
//     }

//     setLoading(false);

//     setFormData({ name: "", password: "", email: "", phoneNumber: "" });
//   };

//   const signup = async () => {
//     console.log("Sign up fucntion");

//     try {
//       const response = await axios.post("http://localhost:5000/api/signup", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phoneNumber: formData.phoneNumber,
//       });

//       if (response.status === 200) {
//         setState("Login");
//         navigate("/user/login");

//         toast.success("Verification email sent", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         toast.error("Email is already registered", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else {
//         console.log(error);
//       }
//     }

//     setLoading(false);

//     setFormData({ name: "", password: "", email: "", phoneNumber: "" });
//   };

//   // Function to validate form inputs for login
//   const validateLoginInputs = (data) => {
//     let errors = {};

//     // Validate email
//     if (!data.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
//       errors.email = "Invalid email address";
//     }

//     // Validate password
//     if (!data.password) {
//       errors.password = "Password is required";
//     }

//     return errors;
//   };

//   // Function to validate form inputs
//   const validateSignUpInputs = (data) => {
//     let errors = {};

//     // Validate email
//     if (!data.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
//       errors.email = "Invalid email address";
//     }

//     // Validate password
//     if (!data.password) {
//       errors.password = "Password is required";
//     } else if (data.password.length < 6) {
//       errors.password = "Password must be at least 6 characters long";
//     }

//     // Validate name
//     if (!data.name) {
//       errors.name = "Name is required";
//     } else if (!/^[a-zA-Z ]+$/.test(data.name)) {
//       errors.name = "Name must contain only alphabets and spaces";
//     }

//     // Validate phone number
//     if (!data.phoneNumber) {
//       errors.phoneNumber = "Phone number is required";
//     } else if (!/^[0-9]{11}$/.test(data.phoneNumber)) {
//       errors.phoneNumber = "Invalid phone number format";
//     }

//     return errors;
//   };

//   return (
//     <div className="loginsignup">
//       <div className="loginsignup-container">
//         <h1>{state}</h1>

//         <form onSubmit={handleSubmit}>
//           {/* Add onSubmit handler to form */}
//           <div className="loginsignup-fields">
//             {state === "Sign up" ? (
//               <>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={changeHandler}
//                   type="text"
//                   placeholder="Your Name"
//                 />

//                 {errors.name && (
//                   <div className="error fw-bold text-danger">{errors.name}</div>
//                 )}

//                 <input
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={changeHandler}
//                   type="tel"
//                   placeholder="Phone Number"
//                 />

//                 {errors.phoneNumber && (
//                   <div className="error fw-bold text-danger">
//                     {errors.phoneNumber}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <></>
//             )}
//             <input
//               name="email"
//               value={formData.email}
//               onChange={changeHandler}
//               type="email"
//               placeholder="Email Address"
//             />
//             {errors.email && (
//               <div className="error fw-bold text-danger">{errors.email}</div>
//             )}

//             {/* Display email validation error */}
//             <input
//               name="password"
//               value={formData.password}
//               onChange={changeHandler}
//               type="password"
//               placeholder="Password"
//             />
//             {errors.password && (
//               <div className="error fw-bold text-danger">{errors.password}</div>
//             )}

//             {/* Display password validation error */}
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Loading..." : "Continue"}
//           </button>

//           {state === "Login" ? (
//             <p className="loginsignup-login">
//               Create an account?
//               <span
//                 onClick={() => {
//                   setState("Sign up");
//                   navigate("/user/signup");
//                 }}
//               >
//                 Click here
//               </span>
//             </p>
//           ) : (
//             <p className="loginsignup-login">
//               Already have an account?
//               <span
//                 onClick={() => {
//                   setState("Login");
//                   navigate("/user/login");
//                 }}
//               >
//                 Login here
//               </span>
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginSignup;

// //done




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignup.css";
import { toast } from "react-toastify";

function LoginSignup({ loginRole = "" }) {
  let navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = state === "Login" ? validateLoginInputs(formData) : validateSignUpInputs(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    if (state === "Login") {
      await login();
    } else {
      await signup();
    }

    setLoading(false);
  };

  const login = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api${loginRole}/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("userID", response.data.user._id);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("role", response.data.user.role);

        navigate(loginRole === "/user" ? "/" : "/inspector");
        toast.success("Login Successful", { position: "top-right", autoClose: 2000 });
      }
    } catch (error) {
      handleLoginError(error);
    }

    resetFormData();
  };

  const signup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });

      if (response.status === 200) {
        setState("Login");
        navigate("/user/login");
        toast.success("Verification email sent", { position: "top-right", autoClose: 2000 });
      }
    } catch (error) {
      handleSignupError(error);
    }

    resetFormData();
  };

  const handleLoginError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const message = error.response.data.message === "User does not exist" ? "User does not exist" : "Invalid credentials";
        toast.error(message, { position: "top-right", autoClose: 2000 });
      }
    } else {
      console.error("An error occurred:", error);
    }
  };

  const handleSignupError = (error) => {
    if (error.response && error.response.status === 400) {
      toast.error("Email is already registered", { position: "top-right", autoClose: 2000 });
    } else {
      console.error(error);
    }
  };

  const resetFormData = () => {
    setFormData({ name: "", password: "", email: "", phoneNumber: "" });
  };

  const validateLoginInputs = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const validateSignUpInputs = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!data.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(data.name)) {
      errors.name = "Name must contain only alphabets and spaces";
    }

    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{11}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }

    return errors;
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {state === "Sign up" && (
              <>
                <input name="name" value={formData.name} onChange={changeHandler} type="text" placeholder="Your Name" />
                {errors.name && <div className="error fw-bold text-danger">{errors.name}</div>}
                <input name="phoneNumber" value={formData.phoneNumber} onChange={changeHandler} type="tel" placeholder="Phone Number" />
                {errors.phoneNumber && <div className="error fw-bold text-danger">{errors.phoneNumber}</div>}
              </>
            )}
            <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
            {errors.email && <div className="error fw-bold text-danger">{errors.email}</div>}
            <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
            {errors.password && <div className="error fw-bold text-danger">{errors.password}</div>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Continue"}
          </button>
          {state === "Login" ? (
            <p className="loginsignup-login">
              Create an account?
              <span
                onClick={() => {
                  setState("Sign up");
                  navigate("/user/signup");
                }}
              >
                Click here
              </span>
              <br />
              <span
                onClick={() => {
                  navigate("/user/forgot-password");
                }}
              >
                Forgot Password?
              </span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Already have an account?
              <span
                onClick={() => {
                  setState("Login");
                  navigate("/user/login");
                }}
              >
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
