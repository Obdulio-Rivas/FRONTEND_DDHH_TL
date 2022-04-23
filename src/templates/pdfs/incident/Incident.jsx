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
import { Victims } from "./parts/Victims";
import Complainant from "./parts/Complainant";
import logo from "./icons/tick_box_checked.png";
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
    border: "1 slate #D4D4D5",
    with: 30,
    height: 30,
    display: "block"
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


const Incident = ({ incident, victims, complainant }) => {
  const cantVictim = victims?.length;
  return (
    <Document>
      <Page size="A4" wrap style={{ padding: 16 }}>
        <View>
          <Image src={logo} />
        </View>
        <View>
          <Text>{`${JSON.stringify(incident)}`}</Text>
        </View>

        <View>
          <View>
            <View style={[styles.col_full, styles.border,styles.mt_5]}>
                  <Text style={[styles.textMedium, styles.col_50,styles.ml_25]}>
                  II. DATOS DE USUARIO.
                  </Text>
                  <Text style={[styles.textNormal, styles.col_50]}>
                  {`Victima Directa: ${
                    complainant.type_victim=== "denunciante y victima" ? "Si": "No"
                  }`}
                  </Text>
              </View>
          </View>
          <Complainant complainant={complainant}></Complainant>
        </View>

        <View>
          <View>
            <View style={[styles.col_full, styles.border,styles.mt_5]}>
                <Text style={[styles.textMedium, styles.col_50,styles.ml_25]}>
                III. DATOS DE LAS VICTIMAS.
                </Text>
                <Text style={[styles.textNormal, styles.col_50]}>
                {`Número total de personas afectadas: ${
                  victims?.length ? victims?.length : 0
                }`}
                </Text>
            </View>
          </View>
          {victims.map((victim) => {
            return( 
              <Victims victim={victim} cantVictim={cantVictim}></Victims>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default Incident;
