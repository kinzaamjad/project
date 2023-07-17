import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { taskSchema } from '../../schemas';

const UpdateData = () => {
  const [taskData, setTaskData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // New state for loading indicator
  const notify = () => toast.success('Task updated successfully');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/auth/viewTasks/${params.id}`);
        setTaskData(res.data);
        setIsLoading(false); // Set loading state to false once data is fetched
      } catch (error) {
        alert('Error fetching task data');
      }
    };

    getTaskData();
  }, [params.id]);

  const handleSubmit = async (values) => {
    try {
      const updatedValues = { ...values };
      if (!updatedValues.task) delete updatedValues.task;
      // Similarly, add conditional checks for other fields if needed

      await axios.put(`http://localhost:8080/api/v1/auth/viewTask/${params.id}`, updatedValues);
      notify();
      navigate('/viewTask');
    } catch (error) {
      alert('Error updating task');
    }
  };

  const formik = useFormik({
    initialValues: {
      task: '',
      activity: '',
      date: '',
      startTime: '',
      endTime: '',
    },
    validationSchema: taskSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (Object.keys(taskData).length > 0) {
      formik.setValues(taskData);
    }
  }, [taskData]);

  const shouldShowError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName];
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator while data is being fetched
  }

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

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update Task</p>

                      <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="task" className="form-control"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.task}
                              name="task"
                              placeholder='Add your task here'
                            />
                            {shouldShowError('task') && <p className="form-error">{formik.errors.task}</p>}
                            <label className="form-label" htmlFor="task">Enter Task to Perform:</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <select
                              className="form-control"
                              name="activity"
                              id="selectOption"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.activity}
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
                            {shouldShowError('activity') && <p className="form-error">{formik.errors.activity}</p>}
                            <label className="form-label" htmlFor="selectOption">Select Activity: </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              id="date"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.date}
                              
                            />
                            {shouldShowError('date') && <p className="form-error">{formik.errors.date}</p>}

                            <label className="form-label" htmlFor="date">Date:</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="time"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.startTime}
                              name="startTime"
                              className="form-control"
                              id="startTime"
                             
                            />
                            {shouldShowError('startTime') && <p className="form-error">{formik.errors.startTime}</p>}
                            <label className="form-label" htmlFor="startTime">Start Time: </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="time"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.endTime}
                              name="endTime"
                              className="form-control"
                              id="endTime"
                            
                            />
                            {shouldShowError('endTime') && <p className="form-error">{formik.errors.endTime}</p>}
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

export default UpdateData;
