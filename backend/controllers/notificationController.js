
const Notification = require('../models/Notification');
const User = require('../models/User');

// Simple AI scoring (can be replaced with real AI logic)
function aiScore(type, content) {
  if (type === 'chat') return 0.9;
  if (content.includes('urgent')) return 0.8;
  return 0.5;
}

exports.createNotification = async (req, res) => {
  try {
    const { fromUserId, type, content } = req.body;
    const fromUser = await User.findById(fromUserId);

    if (!fromUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followers = await User.find({ _id: { $in: fromUser.followers || [] } });

    for (const follower of followers) {
      const score = aiScore(type, content);
      if (score > 0.6) {
        await Notification.create({
          user: follower._id,
          type,
          content,
          fromUser: fromUserId
        });
      }
    }
    res.status(200).json({ message: 'Notifications created' });
  } catch (err) {
    console.error('❌ Error creating notification:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getNotifications = async (req, res) => {
  const { userId } = req.query;
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
  res.json(notifications);
};

exports.markAsRead = async (req, res) => {
  const { notificationId } = req.body;
  await Notification.findByIdAndUpdate(notificationId, { read: true });
  res.status(200).json({ message: 'Marked as read' });
};













// const Notification = require('../models/Notification');
// const User = require('../models/User');

// // Simple AI scoring (can be replaced with real AI logic)
// function aiScore(type, content) {
//   if (type === 'chat') return 0.9;
//   if (content.includes('urgent')) return 0.8;
//   return 0.5;
// }

// exports.createNotification = async (req, res) => {
//   const { fromUserId, type, content } = req.body;
//   const fromUser = await User.findById(fromUserId);
//   const followers = await User.find({ _id: { $in: fromUser.followers } });

//   for (const follower of followers) {
//     const score = aiScore(type, content);
//     if (score > 0.6) {
//       await Notification.create({
//         user: follower._id,
//         type,
//         content,
//         fromUser: fromUserId
//       });
//     }
//   }
//   res.status(200).json({ message: 'Notifications created' });
// };

// exports.getNotifications = async (req, res) => {
//   const { userId } = req.query;
//   const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
//   res.json(notifications);
// };

// exports.markAsRead = async (req, res) => {
//   const { notificationId } = req.body;
//   await Notification.findByIdAndUpdate(notificationId, { read: true });
//   res.status(200).json({ message: 'Marked as read' });
// };
