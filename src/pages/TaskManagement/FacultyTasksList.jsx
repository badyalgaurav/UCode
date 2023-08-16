import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import pythonapi from "../../components/common"
import axios from "axios";
const FacultyTasksList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = () => {
    debugger;
    const classId=sessionStorage.getItem("classId");
    const userId=sessionStorage.getItem("userId");
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint from where you want to fetch the data
    axios.get(`${pythonapi}user_content_management/contents_list`, {
      params: {
        // Pass the parameters as an object
        user_id: userId,
        class_id: classId,
      }})
      .then(response => {
        debugger;
        // Update the component's state with the fetched data
        setData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleTaskClick = (id) => {
    const params = {
      contentId: id
    };
    navigate('/main', { state: params });
    console.log('Navigating to Main with params:', params);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
const handleOpenEditor=()=>{
  navigate('/EditorOnly');

}
const handleDelete=(id)=>{
  const result = window.confirm('Are you sure you want to delete this item?');

  if (result) {
    // Perform the delete operation here
    console.log('Item deleted');
    axios.delete(`${pythonapi}user_content_management/delete_content`, {
      params: {
        // Pass the parameters as an object
        content_id: id
      }})
      .then(response => {
      alert("successfully deleted");
      window.location.reload();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }
  
}
  return (
    <div className="container">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
      <button  className="btn btn-success"onClick={handleOpenEditor}>Add Task</button>
      </div>
      <div className="row">
        {data.map(item => (
        <div key={item._id} className="col col-md-3 mb-4">
        <div className="card text-black h-100">
          <div className="card-body"><b>{item.taskName}</b>
          <br></br>
          <span>Description: </span><p>{item.description}</p>
          </div>
          <div className="card-footer">
          <button className="btn btn-warning me-1" onClick={()=>{handleDelete(item._id)}}>delete</button>

            <button className="btn btn-primary" onClick={()=>{handleTaskClick(item._id)}}>play</button>
            </div>
          
        </div>
      </div>
        ))}
      </div>
    </div>
  );
};
export default FacultyTasksList;