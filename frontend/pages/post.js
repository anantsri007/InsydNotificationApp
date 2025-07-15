import { useState } from 'react';
import axios from 'axios';

export default function Post() {
  const [content, setContent] = useState('');
  const [type, setType] = useState('blog');

  const handlePost = () => {
    axios.post('http://localhost:4000/api/notifications/create', {
      fromUserId: 'USER_ID', // Replace with actual userId
      type,
      content
    });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="blog">Blog</option>
        <option value="chat">Chat</option>
        <option value="job">Job</option>
      </select>
      <input value={content} onChange={e => setContent(e.target.value)} placeholder="Content"/>
      <button onClick={handlePost}>Post</button>
    </div>
  );
}
