// import { useState } from 'react';
// import axios from 'axios';

// export default function Post() {
//   const [content, setContent] = useState('');
//   const [type, setType] = useState('blog');

//   const handlePost = () => {
//     axios.post('http://localhost:4000/api/notifications/create', {
//       fromUserId: 'USER_ID', // Replace with actual userId
//       type,
//       content
//     });
//   };

//   return (
//     <div>
//       <h2>Create Post</h2>
//       <select value={type} onChange={e => setType(e.target.value)}>
//         <option value="blog">Blog</option>
//         <option value="chat">Chat</option>
//         <option value="job">Job</option>
//       </select>
//       <input value={content} onChange={e => setContent(e.target.value)} placeholder="Content"/>
//       <button onClick={handlePost}>Post</button>
//     </div>
//   );
// }



import { useState } from 'react';
import axios from 'axios';

export default function Post() {
  const [content, setContent] = useState('');
  const [type, setType] = useState('blog');
  const [message, setMessage] = useState('');

  const userId = '6870dc5ae58052b935a406c4';
  const API_BASE = 'https://insydnotificationapp.onrender.com/';

  const handlePost = () => {
    if (!content.trim()) {
      setMessage('Please enter some content.');
      return;
    }

    axios.post(`${API_BASE}/api/notifications/create`, {
      fromUserId: userId,
      type,
      content
    })
    .then(() => {
      setMessage('✅ Notification sent to followers!');
      setContent('');
    })
    .catch(err => {
      console.error(err);
      setMessage('❌ Failed to send notification.');
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
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={handlePost}>Post</button>
      {message && <p>{message}</p>}
    </div>
  );
}

