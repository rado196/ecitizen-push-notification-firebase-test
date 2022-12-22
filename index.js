const firebaseAdmin = require("firebase-admin");
const configs = require("./e-citizen-adminsdk.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: configs.project_id,
    clientEmail: configs.client_email,
    privateKey: configs.private_key,
  }),
});

const imageUrl = "https://wallpaperaccess.com/full/254908.jpg";

const tokens = [
  "ddpzGSJkf04FhnwbB_FHDL:APA91bGYy0TJrLCBBWX9lMco_c6OE7drPVua29PYsR5lrCeBSaXBjYXHce99U41ni9Ebsy7rP7iim1AmD1ylKr0y6pcjNApPUyAZxlqcLdiNEboioF0s0sFyxb-nikeNsN7jne6cN-Om",
];

const notificationList = tokens.map(function (token) {
  return {
    notification: {
      title: "Test",
      body: "This is test message",
      image: imageUrl,
    },
    apns: {
      payload: {
        aps: {
          "mutable-content": 1,
          sound: "default",
        },
      },
      fcm_options: {
        image: imageUrl,
      },
    },
    android: {
      priority: "high",
      notification: {
        imageUrl: imageUrl,
        sound: "default",
      },
    },
    token: token,
  };
});

(async function () {
  const result = await firebaseAdmin.messaging().sendAll(notificationList);
  console.log(result.responses);
})();
