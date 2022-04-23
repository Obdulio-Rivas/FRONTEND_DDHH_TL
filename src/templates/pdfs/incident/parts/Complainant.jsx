import React, { useState, useEffect } from 'react'
import {
    Page,
    Font,
    Text,
    Image,
    View,
    Document,
    StyleSheet,
  } from "@react-pdf/renderer";
import MunicipalityService from '../../../../services/Dimensions/Municipality/Municipality.Service';
import DepartmentService from '../../../../services/Dimensions/Department/Department.Service';
  

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
    col_75: {
      width: "75%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
    },
    col_25: {
        width: "25%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
      },
      col_35: {
        width: "35%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
      },
      col_40: {
        width: "40%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
      },
  });

export default function Complainant({complainant}) {
    const [department, setDepartment] = useState([]);
  const [municipality, setMunicipality] = useState([]);
  useEffect(() => {
    async function getDepartmentMunicipality() {
      const departmentResponse = await DepartmentService.getDepartments();
      setDepartment(departmentResponse.data);
      const municipalityResponse = await MunicipalityService.getMunicipalities();
      setMunicipality(municipalityResponse.data);
    }
    getDepartmentMunicipality();
  }, []);
  return (
    <View style={[styles.container_row, styles.mt_15, styles.wd_100]}>
        <View>
            <View style={[styles.col_full,styles.mt_5]}>
                <Text style={[styles.textNormal, styles.col_75]}>{`Nombre completo: ${complainant.name} ${complainant.last_name}`}</Text>
                <Text style={[styles.textNormal, styles.col_25]}>{`Edad: ${complainant.age}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5]}>
                <Text style={[styles.textNormal, styles.col_35]}>{`tipo de documento: ${complainant.type_dui}`}</Text>
                <Text style={[styles.textNormal, styles.col_40]}>{`DUI: ${complainant.dui}`}</Text>
                <Text style={[styles.textNormal, styles.col_25]}>{`Sabe leer y escribir: ${complainant.illiterate === 0 ? "No" : "Si"}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5]}>
                <Text style={[styles.textNormal, styles.col_25]}>{`Sexo: ${complainant.gender === 0 ? "Femenino" : "Masculino"}`}</Text>
                <Text style={[styles.textNormal, styles.col_75]}>{`Orientación Sexual/Identidad de Género: ${complainant.gender_identity}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5]}>
                <Text style={[styles.textNormal, styles.col_50]}>{`Grado Académico: ${complainant.academic_grade}`}</Text>
                <Text style={[styles.textNormal, styles.col_50]}>{`Profesión u Oficio: ${complainant.profession}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5]}>
                <Text style={[styles.textNormal, styles.col_25]}>{`País: ${complainant.country}`}</Text>
                <Text style={[styles.textNormal, styles.col_50]}>{`Departamento: ${department.filter((x) => x.id_department === complainant?.department)[0]?.department}`}</Text>
                <Text style={[styles.textNormal, styles.col_25]}>{`Municipio: ${municipality.filter((x) => x.id_municipality === complainant?.municipality)[0]?.municipality}`}</Text>
            </View>
            <View style={[styles.col_full,styles.mt_5]}>
                <Text style={[styles.textNormal, styles.col_75]}>{`Dirección: ${complainant.adress}`}</Text>
                <Text style={[styles.textNormal, styles.col_25]}>{`Teléfono: ${complainant.phone}`}</Text>
            </View>
        </View>
    </View>
  )
}
