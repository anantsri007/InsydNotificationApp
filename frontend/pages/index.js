import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Use your actual userId here
    axios.get('http://localhost:4000/api/notifications/user', { params: { userId: '6870dc5ae58052b935a406c4' } })
      .then(res => setNotifications(res.data));
  }, []);

  const markAsRead = (id) => {
    axios.post('http://localhost:4000/api/notifications/read', { notificationId: id })
      .then(() => setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n)));
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n._id} style={{ opacity: n.read ? 0.5 : 1 }}>
            <b>{n.type}</b>: {n.content}
            {!n.read && <button onClick={() => markAsRead(n._id)}>Mark as read</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
