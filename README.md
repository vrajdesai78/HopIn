## 💡 Inspiration
There are platforms that allows multiple users to create a meeting, voice/video calling and join the conversation to discuss any topics. For an example, Google Meet allows multiple users to join in the call. The problem with these platforms that users who enter the conversation late are not able to catch up what's going on. Therefore, we decide to create a web platform that allows any users who enter the call late to be able to see and save the past transcript. Users will be able to take their time and look at the transcript of previous conversation. 

## 😃 Benefits of using transcript
1. Transcripts are excellent companions to notes. If people missed any information, they can take a look at the transcript again
2.  Transcripts allow students to engage with lectures. Students/people can concentrate listening to their teachers/boss without taking any notes

## ⚙ What it does
HopIn is a web platform that allows multiple users to enter the call and discuss any topics they want. When the host starts the call/meeting, the platform will start to save the live transcript and it allows any users who enter the call late to be able to see the transcript of previous conversation. 

## How We Built It

### Frontend
- Used React.JS to design the website 
- Used Canva to design our project banner
- Used Figma to create slideshow for our project presentation

### Backend
- Used React.JS to implement APIs 
- Integrated SAWO API for passwordless authentication using email.
- Integrated Symbl. AI to implement Streaming API to get Real-time Speech-to-Text transcripts. 
- Integrated Twilio WebRTC-powered voice and video calling API where the host can create a meeting and others can join it by Room name.
- Used Firebase to integrate Firestore Database to store the transcriptions, such that when attendees join late, they can also view the transcript of previous conversation. 

## 💪 Challenges we ran into
- The main challenge which we came into is implementing the feature of storing past transcript enabled for all users means if someone enters in between the meeting then they can see previous conversation through transcript. 

## 🙌 Accomplishments that we're proud of
- In just two days, our team was able to implement multiple APIs and able to get the result we want. Our team is new to Hack This Fall's sponsor products such as SAWO API, Streaming API from Symbl. ai, WebRTC-powered voice and video calling API from Twilio and spent so much time reading through the given documentation from the sponsors and watching speaker sessions to learn how to use it. We are really proud that we learn how to implement these tools given a two-day period of time.

## 📚 What we learned
We learned how to use various APIs with React like we learned how to use SAWO API for passwordless authentication. We also learned how to use Twilio API to create online meeting platform which uses WebRTC. We also learned to use Streaming API of Symbl.AI to generate real-time transcript. We also learned how to store and retrieve data in Firebase Firestore using javascript.

## 💭 What's next for HopIn - Never lose your hope if you join late in a meeting
- We can enhance our user interface more and add more controls for the host to manage the audience. 
- Allows the users to interact with emojis 

## 🔗 References (Links that our team used to help us learn and create this project)
- [SAWO Labs](https://docs.sawolabs.com/sawo/single-page/react)
- [Symbl. ai](https://docs.symbl.ai/docs/streamingapi/introduction)
- [Twilio Video SDK](https://www.twilio.com/docs/video) 
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

Our team decided to name our project and web platform as **HopIn** because users can hope in anytime to study and still get to know what is happening. 
