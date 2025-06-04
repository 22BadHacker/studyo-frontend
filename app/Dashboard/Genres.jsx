'use client'
import React, {useState} from 'react'

const Genres = () => {
    const [name, setName] = useState('');
const [image, setImage] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', name);
  if (image) formData.append('image', image);

  try {
    const res = await axios.post('http://localhost:8000/api/genres', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Genre created:', res.data);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div>
        fffff
    </div>
  )
}

export default Genres
