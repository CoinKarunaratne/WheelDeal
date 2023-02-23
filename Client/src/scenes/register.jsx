import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { setLogin } from "../state/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(5).required("Required"),
  picture: yup.string().required("Required"),
  suburb: yup.string().required("Required"),
  city: yup.string().required("Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(5).required("Required"),
});

const registerInitial = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
  suburb: "",
  city: "",
};

const loginInitial = {
  email: "",
  password: "",
};

export default function Form() {
  const [register, isRegister] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== null) {
      if (isMobile) {
        navigate("/newsfeed/mobile");
      } else {
        navigate("/home");
      }
    }
  }, []);

  const registerSetup = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/auth/register`,
      { method: "POST", body: formData }
    );

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      isRegister((state) => !state);
    }
  };

  const loginSetup = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      if (isMobile) {
        navigate("/newsfeed/mobile");
      } else if (user !== null) {
        navigate("/home");
      } else {
        navigate("/register");
        alert("Password is incorrect. Please try again.");
      }
    }
  };

  const onSubmit = async (values, onSubmitProps) => {
    if (register) await registerSetup(values, onSubmitProps);
    if (!register) await loginSetup(values, onSubmitProps);
  };

  const formik = useFormik({
    initialValues: register ? registerInitial : loginInitial,
    validationSchema: register ? registerSchema : loginSchema,
    onSubmit,
  });

  useEffect(() => {
    formik.setValues(register ? registerInitial : loginInitial);
    formik.validationSchema = register ? registerSchema : loginSchema;
    formik.validateForm();
  }, [register]);

  return (
    <div className="flex sm:flex-row flex-col min-h-screen sm:max-h-screen bg-[#1A232E]">
      <div className="sm:basis-1/2 flex flex-col justify-center h-full scale-[0.95]">
        <h1
          className={`font-semibold sm:text-[30px] text-[25px] text-white text-center mb-5 ${
            register ? "mt-5" : "mt-[100px]"
          }`}
        >
          {register ? "Join the WheelDeal Community" : "Log in to Your Account"}
        </h1>
        <div className="w-[90%] sm:w-[70%] bg-slate-700 rounded-xl mx-auto shadow-xl shadow-black">
          <form
            onSubmit={formik.handleSubmit}
            className="w-[100%] my-0 px-10 pt-5"
          >
            {register ? (
              <>
                <label
                  className="text-[1rem] font-bold block text-left my-[0.5rem] text-white"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`${
                    formik.errors.firstName &&
                    formik.touched.firstName &&
                    "error"
                  } mb-[0.5rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
                  placeholder="Enter your Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.firstName}
                  </p>
                )}
                <label
                  className="text-[1rem] font-bold block text-left my-[0.5rem] text-white"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`${
                    formik.errors.lastName && formik.touched.lastName && "error"
                  } mb-[0.5rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
                  placeholder="Enter your Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.lastName}
                  </p>
                )}
                <label
                  className="text-[1rem] font-bold block text-left my-[0.5rem] text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`${
                    formik.errors.email && formik.touched.email && "error"
                  } mb-[0.5rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
                  placeholder="Enter your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.email}
                  </p>
                )}
                <label
                  className="text-[1rem] font-bold block text-left my-[0.5rem] text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`${
                    formik.errors.password && formik.touched.password && "error"
                  } mb-[0.5rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
                  placeholder="Enter your Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.password}
                  </p>
                )}
                <label
                  htmlFor="city"
                  className="text-[1rem] font-bold block text-left my-[0.5rem] text-white"
                >
                  Choose your city :
                </label>
                <select
                  id="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${
                    formik.errors.city && formik.touched.city && "error"
                  } mb-[0.5rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
                >
                  <option value="">-- Choose --</option>
                  <option value="Auckland">Auckland</option>
                  <option value="Wellington">Wellington</option>
                  <option value="Christchurch">Christchurch</option>
                  <option value="Dunedin">Dunedin</option>
                  <option value="Hamilton">Hamilton</option>
                  <option value="Tauranga">Tauranga</option>
                </select>
                {formik.errors.city && formik.touched.city && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.city}
                  </p>
                )}
                <label
                  htmlFor="suburb"
                  className="text-[1rem] font-bold block text-left my-[0.5rem] text-white"
                >
                  Choose your suburb :
                </label>
                <select
                  id="suburb"
                  value={formik.values.suburb}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${
                    formik.errors.suburb && formik.touched.suburb && "error"
                  } mb-[0.5rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
                >
                  <option value="">-- Choose --</option>
                  <option value="CBD">CBD</option>
                  <option value="North">North</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="South">South</option>
                </select>
                {formik.errors.suburb && formik.touched.suburb && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.suburb}
                  </p>
                )}
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(files) => formik.setFieldValue("picture", files[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <motion.div
                      {...getRootProps()}
                      whileTap={{ scale: 0.9 }}
                      className="border-dashed border-[2px] border-slate-400 p-[1rem] hover:cursor-pointer mt-[1rem] h-[3rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem]"
                    >
                      <input {...getInputProps()} />
                      {!formik.values.picture ? (
                        <p className="text-center text-white mb-0">
                          Add Picture Here
                        </p>
                      ) : (
                        <p className="text-center text-white mb-0">
                          {formik.values.picture.name}
                        </p>
                      )}
                    </motion.div>
                  )}
                </Dropzone>
                {formik.errors.picture && formik.touched.picture && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.picture}
                  </p>
                )}
              </>
            ) : (
              <>
                {" "}
                <label
                  className="text-[1rem] font-bold block text-left my-[0.5rem] text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`${
                    formik.errors.email && formik.touched.email && "error"
                  } mb-[0.5rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
                  placeholder="Enter your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.email}
                  </p>
                )}
                <label
                  className="text-[1rem] font-bold block text-left my-[0.5rem] text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`${
                    formik.errors.password && formik.touched.password && "error"
                  } mb-[0.5rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
                  placeholder="Enter your Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.password}
                  </p>
                )}{" "}
              </>
            )}
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 0.95 }}
              disabled={formik.isSubmitting}
              className="disabled:opacity-[0.35] block mt-[2rem] mb-[0.5rem] mx-0 py-[0.35rem] px-[0.5rem] bg-[#4299e1] text-[#1a202c] border-none rounded-[3px] w-[100%] text-[1rem] font-bold cursor-pointer"
              type="submit"
            >
              {register ? "Register" : "Login"}
            </motion.button>
            <motion.p
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer underline text-sky-200 hover:text-sky-300 text-center mb-[2rem]"
              onClick={() => {
                isRegister((state) => !state);
                formik.resetForm();
              }}
            >
              {register
                ? "Already have an account? Login here."
                : "Don't have an account? Sign Up here."}
            </motion.p>
          </form>
        </div>
      </div>
      <div className="hidden sm:flex basis-1/2">
        <img
          className="object-cover h-full w-full"
          src="https://i.pinimg.com/originals/ee/24/7e/ee247e6773756d57d933416f7b1e1a17.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
