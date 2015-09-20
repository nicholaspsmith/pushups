App.info({
  id: 'com.nicholaspsmith.pushups',
  version: '0.0.1',
  name: 'Push!',
  description: 'Track number of pushups, pullups, and situps you do in a day.',
  author: 'Nicholas P Smith',
  email: 'me@nicholaspsmith.com',
  website: 'http://nicholaspsmith.com'
});

App.icons({
  'iphone': 'icons/icon-120x120.png',
  'iphone_2x': 'icons/icon-120x120.png',
  'iphone_3x': 'icons/icon-120x120.png',
  'ipad': 'icons/icon-120x120.png',
  'ipad_2x': 'icons/icon-120x120.png'
});

App.launchScreens({
   'iphone': 'splash/mainsplash.png',
   'iphone_2x': 'splash/mainsplash.png',
   'iphone5': 'splash/mainsplash.png',
   'ipad_portrait': 'splash/mainsplash.png',
   'ipad_portrait_2x': 'splash/mainsplash.png',
   'ipad_landscape': 'splash/mainsplash.png',
   'ipad_landscape_2x': 'splash/mainsplash.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#005A8E');
App.setPreference('ShowSplashScreenSpinner', 'false');

App.accessRule('*');
