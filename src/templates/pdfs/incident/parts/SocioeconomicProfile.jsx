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

export default function SocioeconomicProfile({incident}) {



  return (
    <View style={[styles.container_row, styles.mt_5, styles.wd_100]}>
        <View>
            <View style={[styles.col_full,styles.mt_5]}>
                <Text style={[styles.col_full, styles.textSmall]}>{`La casa donde resido/ residía era: ${incident.home}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5 ,styles.justifyBetween]}>
                <Text style={[styles.col_50, styles.textSmall]}>{`Ingresos Mensuales del grupo familiar: $${incident.monthly_income}`}</Text>
                <Text style={[styles.col_50, styles.textSmall]}>{`Ingreso actual del grupo familiar:  $${incident.familiar_income}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5]}>
                <Text style={[styles.col_full, styles.textSmall]}>{`¿Cómo ha logrado sobrevivir durante el desplazamiento? ${incident.survive_displacement}`}</Text>
            </View>
        </View>
    </View>
  )
}