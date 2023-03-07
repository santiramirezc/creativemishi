import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = (props) => {
  const { user, contributionId, onResponse } = props
  
  const [file, setFile] = useState(null);

  const submitFile = async (e) => {
    e.preventDefault()
    try {
      if (!file) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      formData.append('file', file[0]);
      formData.append('contributionId', contributionId);
      const data = await axios.post(process.env.REACT_APP_API_ENDPOINT + "contribution/"+ contributionId +"/upload", formData, {
        credentials: "include",
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      console.log(data.data)
      onResponse()
      // handle success
    } catch (error) {
      // handle error
    }
  };

  return (
    <form onSubmit={submitFile}>
      <label>Upload file</label>
      <input type="file" onChange={event => setFile(event.target.files)} />
      <button type="submit">Send</button>
    </form>
  );
};

export default UploadForm;