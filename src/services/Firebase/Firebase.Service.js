import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import uuid from 'react-uuid';

const firebaseConfig = {
  apiKey: "AIzaSyC7RoyxLzXl4uYm-9M7HVIfv-HoYbcRmxc",
  authDomain: "legalistica.firebaseapp.com",
  projectId: "legalistica",
  storageBucket: "legalistica.appspot.com",
  messagingSenderId: "1047260555308",
  appId: "1:1047260555308:web:80cf7f62b8d61cf46d8989",
  measurementId: "G-Y2FFWJ85B2"
};

const uploadFile = async (path, file, options = {}) => {
  try {
    const fileExtension = options?.extension;
    const fileName = `${uuid()}.${fileExtension}`;
    const app = firebase.initializeApp(firebaseConfig);
    const storageRef = app.storage().ref();
    const pathFile = storageRef.child(`${path}/${fileName}`);
    const uploadFile = await pathFile.put(file);
    const metadata = {
      basePath: 'gs://',
      bucket: uploadFile.ref.bucket,
      fullPath: uploadFile.ref.fullPath,
      url: await pathFile.getDownloadURL(`gs://${uploadFile.ref.bucket}/${uploadFile.ref.fullPath}`),
    }
    return metadata;
  } catch (e) {
    //Crear un servicio de log.
    console.log(e);
    return null;
  }
};

export default uploadFile;