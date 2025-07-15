// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Use your actual userId here
//     axios.get('http://localhost:4000/api/notifications/user', { params: { userId: '6870dc5ae58052b935a406c4' } })
//       .then(res => setNotifications(res.data));
//   }, []);

//   const markAsRead = (id) => {
//     axios.post('http://localhost:4000/api/notifications/read', { notificationId: id })
//       .then(() => setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n)));
//   };

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <ul>
//         {notifications.map(n => (
//           <li key={n._id} style={{ opacity: n.read ? 0.5 : 1 }}>
//             <b>{n.type}</b>: {n.content}
//             {!n.read && <button onClick={() => markAsRead(n._id)}>Mark as read</button>}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = '6870dc5ae58052b935a406c4';
  const API_BASE = 'https://insydnotificationapp.onrender.com';

  useEffect(() => {
    axios.get(`${API_BASE}/api/notifications/user`, {
      params: { userId }
    })
    .then(res => {
      setNotifications(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const markAsRead = (id) => {
    axios.post(`${API_BASE}/api/notifications/read`, {
      notificationId: id
    })
    .then(() => {
      setNotifications(notifications.map(n =>
        n._id === id ? { ...n, read: true } : n
      ));
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul>
          {notifications.map(n => (
            <li key={n._id} style={{ opacity: n.read ? 0.5 : 1 }}>
              <b>{n.type}</b>: {n.content}
              {!n.read && (
                <button onClick={() => markAsRead(n._id)}>Mark as read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

