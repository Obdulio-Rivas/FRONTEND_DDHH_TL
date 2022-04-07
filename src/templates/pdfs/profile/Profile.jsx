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
import IncidentService from "../../../services/Incident/Incident.Service";

import userIcon from "./icons/user_100.png";
import calendarIcon from "./icons/calendar_100.png";
import cellPhoneIcon from "./icons/cell_phone_100.png";
import contactIcon from "./icons/contact_100.png";
import documentIcon from "./icons/document_100.png";
import genderIcon from "./icons/gender_100.png";
import listIcon from "./icons/list_100.png";
import mailIcon from "./icons/mail_100.png";

const Profile = ({ user }) => {
  const [bgProfile, setBGProfile] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function getIncidentsOfUser(id_user) {
      const response = await IncidentService.getIncidentsByUser(id_user);
      setIncidents(
        response?.data?.map((incidente, index) =>
          index <= 5 ? incidente : null
        )
      );
    }
    getIncidentsOfUser(user.id_user);
  }, []);

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

  const getStatus = (status) => {
    console.log(status);
    switch (status) {
      case 0:
        return "Inactivo";
      case 1:
        return "Activo";
      case 2:
        return "Pendiente";
      default:
        return "-";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "#EF4444";
      case 1:
        return "#22C55E";
      case 2:
        return "#EAB308";
      default:
        return "#FFFFFF";
    }
  };

  const styles = StyleSheet.create({
    avatar: {
      width: 120,
      height: 120,
      display: "block",
      position: "absolute",
      top: 85,
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
      backgroundColor: getStatusColor(user?.status),
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
    px_20: {
      paddingHorizontal: 20,
    },
    px_40: {
      paddingHorizontal: 40,
    },
    mt_5: {
      marginTop: 5,
    },
    mt_10: {
      marginTop: 10,
    },
    mt_15: {
      marginTop: 15,
    },
    mt_20: {
      marginTop: 20,
    },
    mt_25: {
      marginTop: 25,
    },
    mr_5: {
      marginRight: 5,
    },
    ml_25: {
      marginLeft: 25,
    },
    solid_divider: {
      height: 1,
      marginTop: 5,
      borderBottom: "1px solid #8B8B8B",
    },
    dotted_divider: {
      height: 1,
      marginTop: 5,
      borderBottom: "1px dotted #8B8B8B",
    },
    wd_100: {
      width: "100%",
    },
    textTiny: {
      fontSize: 8,
    },
    textExtraSmall: {
      fontSize: 10,
    },
    textSmall: {
      fontSize: 12,
    },
    textNormal: {
      fontSize: 14,
    },
    textMedium: {
      fontSize: 16,
    },
    textBig: {
      fontSize: 18,
    },
    icons: {
      width: 20,
      height: 20,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    },
    container_row: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
    },
    container_column: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
    },
    col_full: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
    },
    col_50: {
      width: "50%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
    },
  });

  return (
    <Document>
      <Page size="A4" wrap style={{ padding: 16 }}>
        <View style={{ marginBottom: 10 }}>
          <Image
            style={{ width: "100%", height: 140, display: "block" }}
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
        <View style={[styles.principalContent, styles.status, styles.mt_5]}>
          <Text style={styles.profileStatus}>{`${getStatus(
            user?.status
          )}`}</Text>
          <Text style={styles.profileRole}>{getRole(user?.role)}</Text>
        </View>
        <View style={[styles.principalContent, styles.status, styles.mt_15]}>
          <div style={[styles.dotted_divider, styles.wd_100]}></div>
        </View>
        <View style={[styles.container, styles.mt_25, styles.px_20]}>
          <Image style={[styles.icons, styles.mr_5]} src={userIcon} />
          <Text style={styles.textMedium}>{`Informacion personal.`}</Text>
        </View>
        <View style={[styles.container, styles.mt_20, styles.px_40]}>
          <View style={[styles.container_row, styles.mt_20]}>
            <View style={[styles.col_50]}>
              <Image style={[styles.icons, styles.mr_5]} src={genderIcon} />
              <Text style={styles.textSmall}>{`Genero: ${
                user?.genre === 1 ? "Masculino" : "Femenino"
              }.`}</Text>
            </View>
            <View style={[styles.col_50]}>
              <Image style={[styles.icons, styles.mr_5]} src={cellPhoneIcon} />
              <Text style={styles.textSmall}>{`Telefono: ${user?.phone}`}</Text>
            </View>
          </View>
          <View style={[styles.container_row, styles.mt_20]}>
            <View style={[styles.col_50]}>
              <Image style={[styles.icons, styles.mr_5]} src={contactIcon} />
              <Text style={styles.textSmall}>{`DUI: ${user?.dui}`}</Text>
            </View>
            <View style={[styles.col_50]}>
              <Image style={[styles.icons, styles.mr_5]} src={contactIcon} />
              <Text style={styles.textSmall}>{`NIT: ${user?.nit}`}</Text>
            </View>
          </View>
          <View style={[styles.container_row, styles.mt_20]}>
            <View style={[styles.col_50]}>
              <Image style={[styles.icons, styles.mr_5]} src={mailIcon} />
              <Text style={styles.textSmall}>{`Email: ${user?.email}`}</Text>
            </View>
            <View style={[styles.col_50]}>
              <Image style={[styles.icons, styles.mr_5]} src={calendarIcon} />
              <Text
                style={styles.textSmall}
              >{`Fecha de Nacimiento: ${user?.birth_date}`}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.container, styles.mt_25]}>
          <div style={[styles.dotted_divider, styles.wd_100]}></div>
        </View>
        <View style={[styles.container, styles.mt_25, styles.px_20]}>
          <Image style={[styles.icons, styles.mr_5]} src={listIcon} />
          <Text
            style={styles.textMedium}
          >{`Ultimos incidentes registrados.`}</Text>
        </View>

        <View style={[styles.container, styles.mt_5, styles.px_40]}>
          {incidents?.map(
            (
              { id_incident, id_type_incident, expediente, created_at },
              index
            ) => {
              return (
                <View
                  key={index}
                  style={[styles.container_row, styles.mt_15, styles.wd_100]}
                >
                  <View>
                    <Image
                      style={[styles.icons, styles.mr_5]}
                      src={documentIcon}
                    />
                  </View>
                  <View>
                    <View style={[styles.col_full]}>
                      <Text
                        style={styles.textSmall}
                      >{`Expediente #${expediente}.`}</Text>
                    </View>
                    <View style={[styles.col_full]}>
                      <Text
                        style={styles.textExtraSmall}
                      >{`Tipo: ${id_type_incident}.`}</Text>
                    </View>
                    <View style={[styles.col_full]}>
                      <Text
                        style={styles.textTiny}
                      >{`Fecha de registro: ${created_at}.`}</Text>
                    </View>
                  </View>
                </View>
              );
            }
          )}
          {!incidents ? (
            <Text style={styles.textTiny}>
              {"No se han encontrado incidentes registrados por este usuario."}
            </Text>
          ) : (
            <Text>{""}</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default Profile;
