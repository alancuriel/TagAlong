import { apiKeys } from "./config";
import firebase from "firebase";

require("firebase/firestore");

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(apiKeys.firebaseConfig);
    }
  }

  //TODO: update post method. Not finalized yet
  addPost = async ({
    title,
    date,
    description,
    category,
    localUri,
    eventAddress,
    eventLatitude,
    eventLongitude,
    eventGeoHash,
    userGeoHash
  }) => {

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          title,
          description,
          date,
          category,
          uid: this.uid,
          email: this.email,
          timestamp: this.timestamp,
          eventAddress,
          eventLatitude,
          eventLongitude,
          eventGeoHash,
          userGeoHash
        })
        .then(ref => {
          res(ref);
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  createUserInfo = ({ firstName, lastName, aboutMe }) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .doc(this.uid)
        .set({
          firstName,
          lastName,
          aboutMe,
          timestamp: this.timestamp
        })
        .then(ref => {
          res(ref);
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  getUserInfo = () => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .doc(this.uid)
        .get()
        .then(snapshot => {
          res(snapshot.data());
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  uploadProfilePic = async uri => {
    const remoteUri = await this.uploadPhotoAsync(uri);

    firebase.auth().currentUser.updateProfile({ photoURL: remoteUri });
  };

  uploadPhotoAsync = async uri => {
    const path = "photos" + "/" + this.uid + "/" + Date.now() + ".jpg";

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(path)
        .put(file);
      upload.on(
        "state_changed",
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get email() {
    return (firebase.auth().currentUser || {}).email;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;