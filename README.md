Pushups Situps Pullups
========

@TODO:

* enable notifications in ios telling you when to go do some pushups / pullups / situps
* ios notifications for when to eat

App for tracking number of pushups / situps / pullups / squats I do every day Meteor + Cordova IOS App

Includes
----
D3JS - https://atmospherejs.com/d3js/d3

Moment - https://atmospherejs.com/momentjs/moment

Data Structures
----
Collections:
```
exercise {
	type: 'pushup',
	quantity: 30,
	date: new Date()
}
```

Next Steps
=======

# Utilize device's accelerometer to detect when a movement is performed.
Use case will be:

* User opens app
* User selects workout type (pushup, pullup, squat, ...)
* User places phone in pocket, on armband, etc (somewhere oh his/her body)
* User performs movements
* App detects movements based on accelerometer readings and updates the collection in real time

# User Accounts - Social Media Integration

* Users will create a profile
* Users will add friends from their contacts list / facebook
* Users' activity for the day is logged
* Users will have option to post results to facebook
* Users will have ability to "challenge" friends
* Users will level up based on amount of activity logged on the app
* Point of social capabilities is to encourage competitions


