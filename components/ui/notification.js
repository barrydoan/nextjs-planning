import {useContext, useEffect, useState} from 'react';

import classes from './notification.module.css';
import NotificationContext from '../../store/notification-context';

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const [activeNotification, setActiveNotification] = useState();
  useEffect(() => {
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error)')) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }

  }, [activeNotification])

  const {title, message, status} = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
