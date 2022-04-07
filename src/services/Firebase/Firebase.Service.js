import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import uuid from "react-uuid";

const firebaseConfig = {
  apiKey: "AIzaSyC7RoyxLzXl4uYm-9M7HVIfv-HoYbcRmxc",
  authDomain: "legalistica.firebaseapp.com",
  projectId: "legalistica",
  storageBucket: "legalistica.appspot.com",
  messagingSenderId: "1047260555308",
  appId: "1:1047260555308:web:80cf7f62b8d61cf46d8989",
  measurementId: "G-Y2FFWJ85B2",
};

const uploadFile = async (path, file, options = {}) => {
  try {
    const fileExtension = options?.extension;
    const fileName = options?.filename ? `${options?.filename}.${fileExtension}` : `${uuid()}.${fileExtension}`;
    const app = firebase.initializeApp(firebaseConfig);
    const storageRef = app.storage().ref();
    const pathFile = storageRef.child(`${path}/${fileName}`);
    const uploadFile = await pathFile.put(file);
    const metadata = {
      basePath: "gs://",
      bucket: uploadFile.ref.bucket,
      fullPath: uploadFile.ref.fullPath,
      url: await pathFile.getDownloadURL(
        `gs://${uploadFile.ref.bucket}/${uploadFile.ref.fullPath}`
      ),
    };
    return metadata;
  } catch (e) {
    //Crear un servicio de log.
    console.log(e);
    return null;
  }
};

const downloadFile = async (bucket, fullPath)=>{
  try {
    const app = firebase.initializeApp(firebaseConfig);
    const storageRef = app.storage().ref();
    const pathFile = storageRef.child(fullPath);
    return await pathFile.getDownloadURL(
      `gs://${bucket}/${fullPath}`
    );
  } catch (e) {
    //Crear un servicio de log.
    console.log(e);
    return null;
  }
};

const listFiles = async (path) => {
  try {
    let fileList = [];
    const app = firebase.initializeApp(firebaseConfig);
    const storageRef = app.storage().ref();
    var listRef = storageRef.child(path);
    var response = await listRef.listAll();
    response.prefixes.forEach(({ bucket, fullPath, name, parent }) => {
      fileList.push({
        bucket: bucket,
        fullPath: fullPath,
        name: name,
        type: "folder",
        url: name,
        parent: {
          bucket: parent.bucket,
          fullPath: parent.fullPath,
          name: parent.name,
        },
      });
    });
    response.items.forEach(({ bucket, fullPath, name, parent }) => {
      fileList.push({
        bucket: bucket,
        fullPath: fullPath,
        name: name,
        type: name.split(".")[1],
        url: name,
        parent: {
          bucket: parent.bucket,
          fullPath: parent.fullPath,
          name: parent.name,
        },
      });
    });
    console.log(fileList);
    return fileList;
  } catch (e) {
    //Crear un servicio de log.
    console.log(e);
    return e;
  }
};

const FirebaseService = {
  uploadFile,
  listFiles,
  downloadFile,
};

export default FirebaseService;
