import React from 'react'
import {
    Page,
    Font,
    Text,
    Image,
    View,
    Document,
    StyleSheet,
  } from "@react-pdf/renderer";
  

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
    border: {
        border: "1 solid #D4D4D5"
    },
    principalContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
    },
    profileName: {
      fontSize: 16,
      fontWeight: "bold",
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
      justifyContent: "center",
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
      alignContent: "center",
      alignItems: "center",
    },
    col_75: {
      width: "75%",
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
    },
    col_25: {
        width: "25%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
      },
      col_35: {
        width: "35%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
      },
      col_40: {
        width: "40%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
      },
      justifyBetween: {
        justifyContent: 'space-between',
      },
      textCenter: {
        textAlign: 'center',
      }
  });

export default function InstitutionalRegistration({incident}) {



  return (
    <View style={[styles.container_row, styles.mt_5, styles.wd_100]}>
        <View>
            <View style={[styles.col_full,styles.mt_5 ,styles.justifyBetween]}>
                <Text style={[styles.col_50, styles.textSmall]}>{`Expediente # ${incident.expediente}`}</Text>
                <Text style={[styles.col_25, styles.textSmall]}>{`Fecha: ${incident.incident_date}`}</Text>
                <Text style={[styles.col_25, styles.textSmall]}>{`Hora: ${incident.hour}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5 ,styles.justifyBetween]}>
                <Text style={[styles.col_50, styles.textSmall]}>{`¿Conoce otra institución u organización sobre el caso? ${incident.incident_institution != 0 ? "Si" : "No"}`}</Text>
                <Text style={[styles.col_50, styles.textSmall]}>{`¿Cuál? ${incident.incident_institution_name != null ? incident.incident_institution_name: "-"}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5 ,styles.justifyBetween]}>
                <Text style={[styles.col_35, styles.textSmall]}>{`Nombre de quien refiere: ${incident.name_reference}`}</Text>
                <Text style={[styles.col_35, styles.textSmall]}>{`Contacto: ${incident.contact}`}</Text>
                <Text style={[styles.col_30, styles.textSmall]}>{`Identificación: ${incident.incident_identification}`}</Text>
            </View>
        </View>
    </View>
  )
}
