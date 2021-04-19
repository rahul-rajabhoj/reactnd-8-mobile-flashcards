import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}
  
function createNotification () {
    return {
      title: 'Take Quiz!',
      body: "👋 don't forget to take quiz for today!",
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
  
export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(8)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
    })
}