import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { taskSchema } from '../../schemas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  task: '',
  activity: '',
  date: '',
  startTime: '',
  endTime: '',
};

const notify = () => toast.success('Task added successfully');

const Form = ({ userId, userName }) => {
  const navigate = useNavigate();
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      ...initialValues
    },
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      await axios.post(`http://localhost:8080/api/v1/auth/taskRegister`, values).then((res) => {
        if (res.data) {
          notify();
          navigate('/viewTask');
        }
      });
    },
  });

  const handleDateClick = () => {
    document.getElementById('date').click();
  };

  const handleStartTimeClick = () => {
    document.getElementById('startTime').click();
  };

  const handleEndTimeClick = () => {
    document.getElementById('endTime').click();
  };

  return (
    <>
      <section className="vh-100 my-5" >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Task</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="task" className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.task}
                              name="task"
                              placeholder='Add your task here'
                            />
                            {<p className="form-error">{errors.task}</p>}
                            <label className="form-label" htmlFor="task">Enter Task to Perform:</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <select
                              className="form-control"
                              name="activity"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="selectOption"
                              value={values.activity}
                            >
                              <option value="" disabled>
                                ---- Select Option ----
                              </option>
                              <option value="run">Run</option>
                              <option value="bicycle">Bicycle</option>
                              <option value="ride">Ride</option>
                              <option value="swim">Swim</option>
                              <option value="walk">Walk</option>
                              <option value="hike">Hike</option>
                            </select>
                            {<p className="form-error">{errors.activity}</p>}
                            <label className="form-label" htmlFor="selectOption">Select Activity: </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="date"
                              value={values.date}
                              className="form-control"
                              id="date"
                              onClick={handleDateClick}
                            />
                            {<p className="form-error">{errors.date}</p>}

                            <label className="form-label" htmlFor="date">Date:</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="time"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="startTime"
                              value={values.startTime}
                              className="form-control"
                              id="startTime"
                              onClick={handleStartTimeClick}
                            />
                            {<p className="form-error">{errors.startTime}</p>}
                            <label className="form-label" htmlFor="startTime">Start Time: </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="time"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="endTime"
                              value={values.endTime}
                              className="form-control"
                              id="endTime"
                              onClick={handleEndTimeClick}
                            />
                            {<p className="form-error">{errors.endTime}</p>}
                            <label className="form-label" htmlFor="endTime">End Time: </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
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

export default Form;
