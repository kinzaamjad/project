import React from "react";
import "./LoginForm.css";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userExist = () => toast.error("Invalid credentials");
const initialValues = {
  email: "",
  password: "",
};
const notify = () => toast.success("Login successfully");

const LoginForm = () => {
  const navigate = useNavigate();
  const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await axios
        .post(`http://localhost:8080/api/v1/auth/login`, values)
        .then((res) => {
          if (res) {
            if (res.data.message === "Invalid email address") {
              userExist();
              return;
            } else {
              console.log("Token is : -__________________ ", res);
              localStorage.setItem("token", res.data.token);
              notify();
              setTimeout(() => {
                navigate("/task");
              }, 5000);
            }
          }
        });
    },
  });

  return (
    <>
      <div className="LoginFormOuterWrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="loginName">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="loginName"
                          class="form-control"
                          placeholder="Enter your email "
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {<p className="form-error">{errors.email}</p>}
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="loginPassword">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="loginPassword"
                          class="form-control"
                          placeholder="Type your password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {<p className="form-error">{errors.password}</p>}
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary w-100 btn-block mb-4"
                      >
                        Sign in
                      </button>
                    </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
