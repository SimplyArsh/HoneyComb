import React, { useEffect } from 'react';
import { useNotification } from '../hooks/notification-context';

const Notifications = () => {
  const { addNotification, state } = useNotification();

  useEffect(() => {
    console.log('useEffect in Notifications component triggered');
    // Simulate a notification when the component mounts
    addNotification({
      id: 2,
      message: 'This is a persistent notification.',
    });
  }, [addNotification]);

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <div>
            <h1>Notifications Page</h1>
            <ul>
              {state.notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          </div>

          <ul className="notifications">
            <li>Notification</li>
            <li>Notification</li>
            <li>Notification</li>
            <li>Notification</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
