import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ShowTask.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ShowTask = () => {
  const [datak, setDatak] = useState([]);

const navigate = useNavigate()
  const getUserTask = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/auth/viewTask');
      setDatak(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (datak.length === 0) {
      getUserTask();
    }
  }, [datak]);

  // Function to convert time to 12-hour format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    let formattedTime = '';

    if (hours < 12) {
      formattedTime = `${hours}:${minutes} AM`;
    } else if (hours === '12') {
      formattedTime = `${hours}:${minutes} PM`;
    } else {
      formattedTime = `${hours - 12}:${minutes} PM`;
    }
    return formattedTime;
  };
  const notify = () => toast.error('Task deleted successfully');
  const deleteTask = (datak) => {
    axios.delete(`http://localhost:8080/api/v1/auth/deleteTask/${datak}`).then((res) => {
      if(res){
        notify()
      }
      setTimeout(() => {
        getUserTask()
        navigate('/viewTask');
      }, 500);
    })

  }


  return (
    <>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {(datak.length === 0 || datak.length === undefined) ? (
            <h1 className="d-block w-100 text-dark">No record found...!!</h1>
          ) : (
            datak.map((taskData, ind) => (
              <div className="col" key={ind}>
                <div className="card h-100">
                  <div className="card-body">
                    <p className="card-text text-capitalize">
                      <span className="fw-bold">Task Description:</span> {taskData.task}
                    </p>
                    <p className="card-text text-capitalize">
                      <span className="fw-bold">Task Activity:</span> {taskData.activity}
                    </p>
                    <p className="card-text text-capitalize">
                      <span className="fw-bold">Task Activity:</span> {taskData.date}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <span className="fw-bold">Start Time:</span><br /> {convertTo12HourFormat(taskData.startTime)}
                    </small>
                    <small className="text-muted">
                      <span className="fw-bold">End Time:</span> <br /> {convertTo12HourFormat(taskData.endTime)}
                    </small>
                    <div className='d-flex'>
                      <button className="btn btn-primary me-2" onClick={() => navigate(`/updateTask/${taskData._id}`)}><i className='fa-solid fa-pencil'></i></button>
                      <button className="btn btn-danger" onClick={() => deleteTask(taskData._id)}><i className='fa-solid fa-trash'></i></button>
                    </div>
                  </div>
                </div>
              </div>

            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShowTask;