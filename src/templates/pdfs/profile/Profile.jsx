import React, { useState, useEffect } from "react";
import {
  Page,
  Font,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import FirebaseService from "../../../services/Firebase/Firebase.Service";

const Profile = ({ user }) => {
  const [bgProfile, setBGProfile] = useState(null);

  useEffect(() => {
    async function getRootFiles() {
      const response = await FirebaseService.listFiles("/images/backgrounds");
      if (response.length > 0) {
        let bg_number = Math.round(Math.random() * (response.length - 1));
        const bg_url = await FirebaseService.downloadFile(
          response[bg_number].bucket,
          `${response[bg_number].parent.fullPath}/${response[bg_number].name}`
        );
        setBGProfile(bg_url);
        console.log(bg_url);
      }
    }
    getRootFiles();
  }, []);

  const getRole = (role = 0) => {
    switch (role) {
      case 0:
        return "Administrador";
      case 1:
        return "Abogado";
      default:
        return "Asistente";
    }
  };

  const styles = StyleSheet.create({
    avatar: {
      width: 120,
      height: 120,
      display: "block",
      position: "absolute",
      top: 75,
      left: 40,
      backgroundColor: "#FFF",
      border: "1 solid #D4D4D5",
      borderRadius: "50%",
    },
    imgAvatar: {
      width: "95%",
      height: "95%",
      margin: "auto",
      display: "block",
      borderRadius: "50%",
    },
    principalContent: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "30%",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
    },
    profileName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    profileStatus: {
      fontSize: 10,
      fontWeight: "medium",
      color: "#FFF",
      backgroundColor: "#22C55E",
      paddingVertical: "4",
      paddingHorizontal: "6",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      marginRight: 5,
    },
    profileRole: {
      fontSize: 12,
      color: "#8B8B8B",
      fontWeight: "medium",
      display: "flex",
      flexDirection: "column",
    },
    mt_5: {
      marginTop: 5
    }
  });

  return (
    <Document>
      <Page size="A4" wrap style={{ padding: "16px" }}>
        <View style={{ marginBottom: "10px" }}>
          <Image
            style={{ width: "100%", height: "125px", display: "block" }}
            src={bgProfile}
          />
          <View style={styles.avatar}>
            <Image src={user.url_image} style={styles.imgAvatar} />
          </View>
        </View>
        <View style={styles.principalContent}>
          <Text
            style={styles.profileName}
          >{`${user?.name} ${user?.last_name}`}</Text>
        </View>
        <View style={[styles.principalContent, styles.status, styles.mt_5 ]}>
          <Text style={styles.profileStatus}>{`${
            user?.status === 1 ? "Activo" : "Inactivo"
          }`}</Text>
          <Text style={styles.profileRole}>{getRole(user?.role)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Profile;
