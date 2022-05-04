import React from "react";
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
import InstitutionalRegistration from "./parts/InstitutionalRegistration";
import Narrative from "./parts/Narrative";
import CreationAgreement from "./parts/CreationAgreement";
import MigratoryProfile from "./parts/MigratoryProfile";
import SocioeconomicProfile from "./parts/SocioeconomicProfile";
import ProfileFacts from "./parts/ProfileFacts";

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
    display: "block",
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
  mt_50: {
    marginTop: 50,
  },
  mr_5: {
    marginRight: 5,
  },
  ml_25: {
    marginLeft: 25,
  },
  mb_10: {
    marginBottom: 10,
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
    fontSize: 20,
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
  justifyBetween: {
    justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
  },
  table: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginVertical: 5,
  },
  tableRow: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  tableCell: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});

const Incident = ({ incident, victims, complainant }) => {
  return (
    <Document>
      <Page
        size="A4"
        wrap
        style={{
          paddingTop: "2cm",
          paddingBottom: "3cm",
          paddingHorizontal: "1.5cm",
        }}
      >
        <View>
          <View style={[styles.col_full, styles.mb_10]}>
            <Text style={[styles.textBig, styles.textCenter]}>
              FICHA DE REGISTRO Y SEGUIMIENTO DE CASOS DE DESPLAZAMIENTO FORZADO
              (Interno/Externo)
            </Text>
          </View>
        </View>

        <View>
          <View
            style={[styles.col_full, styles.border, styles.mt_5, styles.px_20]}
          >
            <Text style={[styles.textMedium]}>
              I. DATOS DE REGISTRO INSTITUCIONAL.
            </Text>
          </View>
          <InstitutionalRegistration
            incident={incident}
          ></InstitutionalRegistration>
        </View>

        <View>
          <View>
            <View
              style={[
                styles.col_full,
                styles.border,
                styles.mt_5,
                styles.px_20,
                styles.justifyBetween,
              ]}
            >
              <Text style={[styles.textMedium]}>II. DATOS DE USUARIO.</Text>
              <Text style={[styles.textNormal]}>
                {`Victima Directa: ${
                  complainant.type_victim === "denunciante y victima"
                    ? "Si"
                    : "No"
                }`}
              </Text>
            </View>
          </View>
          <Complainant complainant={complainant}></Complainant>
        </View>

        <View>
          <View>
            <View
              style={[
                styles.col_full,
                styles.border,
                styles.mt_5,
                styles.px_20,
                styles.justifyBetween,
              ]}
            >
              <Text style={[styles.textMedium]}>
                III. DATOS DE LAS VICTIMAS.
              </Text>
              <Text style={[styles.textSmall]}>
                {`Número total de personas afectadas: ${
                  victims?.length ? victims?.length : 0
                }`}
              </Text>
            </View>
          </View>
          {victims.map((victim, index, array) => {
            const is_last_one =
              array.length === 1 || array.length === index ? true : false;
            return (
              <Victims
                key={index}
                victim={victim}
                is_last_one={is_last_one}
              ></Victims>
            );
          })}
        </View>

        <View>
          <View
            style={[styles.col_full, styles.border, styles.mt_5, styles.px_20]}
          >
            <Text style={[styles.textMedium]}>
              IV. PERFIL ESPECIFICO DE LOS HECHOS.
            </Text>
          </View>
          <ProfileFacts incident={incident}></ProfileFacts>
        </View>

        <View>
          <View
            style={[styles.col_full, styles.border, styles.mt_5, styles.px_20]}
          >
            <Text style={[styles.textMedium]}>V. PERFIL SOCIECONOMICO.</Text>
          </View>
          <SocioeconomicProfile incident={incident}></SocioeconomicProfile>
        </View>

        <View>
          <View
            style={[styles.col_full, styles.border, styles.mt_5, styles.px_20]}
          >
            <Text style={[styles.textMedium]}>VI. PERFIL MIGRATORIO.</Text>
          </View>
          <MigratoryProfile incident={incident}></MigratoryProfile>
        </View>

        <View>
          <View
            style={[styles.col_full, styles.border, styles.mt_5, styles.px_20]}
          >
            <Text style={[styles.textMedium]}>
              VII. NARRATIVA DE LOS HECHOS.
            </Text>
          </View>
          <Narrative incident={incident}></Narrative>
        </View>

        <View>
          <View
            style={[styles.col_full, styles.border, styles.mt_5, styles.px_20]}
          >
            <Text style={[styles.textMedium]}>VIII. ACUERDO DE CREACION.</Text>
          </View>
          <CreationAgreement incident={incident}></CreationAgreement>
        </View>

        <View style={[styles.table, styles.mt_50]}>
          <View style={[styles.tableRow]}>
            <Text style={[styles.tableCell, styles.textCenter]}>
              {"____________"}
            </Text>
            <Text style={[styles.tableCell, styles.textCenter]}>
              {"____________"}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.mt_5, styles.textWeightMedium]}>
            <Text
              style={[styles.tableCell, styles.textCenter, styles.textSmall]}
            >
              {"Técnico"}
            </Text>
            <Text
              style={[styles.tableCell, styles.textCenter, styles.textSmall]}
            >
              {`${complainant.name} ${complainant.last_name}`}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Incident;
