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
    const classId=localStorage.getItem("classId");
    const userId=localStorage.getItem("userId");
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

  const handleTaskClick = () => {
    const params = {
      itemId: 86,
      otherParam: 'anything you want here',
    };
    navigate('/main', { state: { id: 7, color: 'green' } });
    console.log('Navigating to Main with params:', params);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>List of Data:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id} onClick={handleTaskClick}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};
export default FacultyTasksList;