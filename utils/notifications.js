import { 
  AsyncStorage 
} from 'react-native';

import { 
  Notifications, 
  Permissions 
} from 'expo';

const NOTIFICATION_KEY = 'MobileFlashCards:notifications';

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(10);
              tomorrow.setMinutes(0);
                       

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              console.log('setItem');
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          });
      }

    });
}

const createNotification = () => {
  return {
    title: 'Let\'s Go Study!!',
    body: "👋 don't forget study your flashcards today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}