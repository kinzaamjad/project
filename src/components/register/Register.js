import { useFormik } from "formik";
import React from "react";
import "./Register.css";
import { registerSchema } from "../../schemas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  dob: "",
  phoneNumber: "",
  password: "",
  confirm_password: "",
};

const userExist = () => toast.warning("User already registered");
const userRegistered = () => toast.success("User registered successfully");
const fieldsMissing = () => toast.error("Fill form completely");

const Register = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      if (
        !values.name ||
        !values.email ||
        !values.dob ||
        !values.phoneNumber ||
        !values.password ||
        !values.confirm_password
      ) {
        fieldsMissing();
      } else {
        axios
          .post("http://localhost:8080/api/v1/auth/registerUser", values)
          .then((res) => {
            if (res) {
              if (res.data.message === "User already register") {
                userExist();
              } else if (res.data.message === "user added successfully") {
                userRegistered();
                setTimeout(() => {
                  navigate("/");
                }, 3000);
              }
            }
          });
      }
    },
  });

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="Name"
                            name="name"
                            className="form-control form-control-lg"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                          />
                          {errors.name && <p className="form-error">{errors.name}</p>}
                          <label className="form-label" htmlFor="Name">
                            Name:
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="form-control form-control-lg"
                            placeholder="Enter your email"
                          />
                          {errors.email && <p className="form-error">{errors.email}</p>}
                          <label className="form-label" htmlFor="email">
                            Email:
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            id="dob"
                            name="dob"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dob}
                          />
                          {errors.dob && <p className="form-error">{errors.dob}</p>}
                          <label htmlFor="dob" className="form-label">
                            Select your Date of Birth
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="tel"
                            className="form-control form-control-lg"
                            id="inputNumber"
                            name="phoneNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                            placeholder="Enter your mobile number"
                          />
                          {errors.phoneNumber && <p className="form-error">{errors.phoneNumber}</p>}
                          <label htmlFor="inputNumber" className="form-label">
                            Phone Number:
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            name="password"
                            type="password"
                            id="inputPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className="form-control form-control-lg"
                            aria-labelledby="passwordHelpBlock"
                            placeholder="Type your password"
                          />
                          {errors.password && (
                            <p className="form-error">{errors.password}</p>
                          )}
                          <label className="form-label" htmlFor="inputPassword">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            name="confirm_password"
                            type="password"
                            id="inputConfirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirm_password}
                            className="form-control form-control-lg"
                            placeholder="Type confirm password"
                          />
                          {errors.confirm_password && (
                            <p className="form-error">{errors.confirm_password}</p>
                          )}
                          <label className="form-label" htmlFor="inputConfirmPassword">
                            Confirm Password
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />
    </>
  );
};

export default Register;
