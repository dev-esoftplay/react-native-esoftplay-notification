import * as Permissions  from '../../node_modules/expo/src/Permissions.js';
import Notifications from '../../node_modules/expo/src/Notifications.js';
import { configConsole } from '../../config';
import { AsyncStorage } from '../../node_modules/react-native/Libraries/react-native/react-native-implementation.js';
/*
{ 
  to: // exp token
  data:{
    action: // [route, dialog,  ]
    route_name: // routeName of ReactNavigation
    params: 
    title:
    message:
  } 
  title:
  body:
  sound:
  param:
  ttl:
  expiration:
  priority:
  badge:
} */

const EsoftplayNotification = {
  listen(callback) {
    Notifications.addListener((obj) => {
      if (obj) {
        callback(obj)
        if (obj.remote) {
          AsyncStorage.setItem('esoftplaynotification', JSON.stringify(obj))
        }
      }
    })
  },
  get(action) {
    setTimeout(() => {
      AsyncStorage.getItem('esoftplaynotification').then((res) => {
        res = JSON.parse(res)
        action(res)
        AsyncStorage.removeItem('esoftplaynotification')
      }, 1500);
    })
  },
  async requestPermission(token) {
    const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return
    configConsole(finalStatus)
    token(await Notifications.getExpoPushTokenAsync())
  }
}

export default EsoftplayNotification