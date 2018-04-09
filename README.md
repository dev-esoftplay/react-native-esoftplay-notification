# react-native-esoftplay-notification
standart of esoftplay notification 


## INSTALATION CLIENT SIDE
```
npm install --save react-native-esoftplay-notification
```

## USAGE
1. Add some requirement listener at root Component - App.js
```
import EsoftplayNotification from 'react-native-esoftplay-notification';

export default class App extends React.Component {
  
  ...
  componentWillMount(){
  
   ...
    // basic usage only for push notification - most common
    EsoftplayNotification.listen()
    
    // to add custom notification handler
    EsoftplayNotification.listen(obj => {
      //do your stuff
    })
   ...
  }
  
  componentDidMount(){
    EsoftplayNotification.requestPermission((token) => {
      // do your stuff with token, example: save to server or local storage
    })
  }
 
```
2. add some requirement at the home of the app - main.js | index.js
```
import EsoftplayNotification from 'react-native-esoftplay-notification';
import { AppState } from 'react-native'

export default class Main extends React.Component {
  
   constructor(props) {
    super(props);
    ...
    this.action = this.action.bind(this)
    this.handleNotification = this.handleNotification.bind(this)
    ...
  }
  
  ...
  componentDidMount(){   
   ...
   AppState.addEventListener('change', this.handleNotification);
   EsoftplayNotification.get(this.action)
   ...
  }
  ...
  componentWillUnmount(){
    ...
    AppState.removeEventListener('change', this.handleNotification);
    ...
  }
  
  handleNotification(nexAppState) {
    if (nexAppState == 'active') {
      EsoftplayNotification.get(this.action)
    }
  }
  
   action(res) {
    const { data } = res
    switch (data.action) {
      case 'route':
        this.props.navigation.navigate(data.route_name, data.params)
        break;
      // add other case
      ...
      ....
      .....
      default:
        // default action
        break;
    }
  }
  
```
3. done



## Example send push notification

#### Default data format
```
"data":{
     "action":"string", // action name example "fetch_event","logout","route",""
     "route_name": "string", // a routeName of react navigation
     "params":"json", // object with key-value pairs to send when navigate to route_name
     "title":"string" // title to show inside app
     "message":"string" // message to show inside app
   },
```

```
curl -H "Content-Type: application/json" -X POST [https://exp.host/--/api/v2/push/send](https://exp.host/--/api/v2/push/send) -d '{
  "to":"ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "title":"string", // title to show in notification bar
  "body": "string", // message to show in notification bar
  ...
  "data":{
     "action":"string", // action name example "fetch_event","logout","route",""
     "route_name": "string", // a routeName of react navigation
     "params":"json", // object with key-value pairs to send when navigate to route_name
     "title":"string" // title to show inside app
     "message":"string" // message to show inside app
   },
   ...
}'
```
for complete please check https://docs.expo.io/versions/latest/guides/push-notifications#http2-api
