import React from "react";
import {
  Page,
  Font,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

export const Dashboard = () => {

  const Dashboard = () => (
    <Document>
      <Page size="A4">
        <View>
          <Text>Direccion: 4 calle poniente, casa #40</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      document={<Dashboard />}
      fileName={`Orden de Trabajo .pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading
          ? `Generando documento...`
          : `Descargar Orden de Trabajo!`
      }
    </PDFDownloadLink>
  );
};