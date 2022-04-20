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

import tick_box_checked from "./icons/tick_box_checked.png";
import tick_box_unchecked from "./icons/tick_box_unchecked.png";

const Incident = ({ incident, victims, user }) => {
  
  return (
    <Document>
      <Page size="A4" wrap style={{ padding: 16 }}>
        <View>
          <Image src={tick_box_checked} />
          <Image src={tick_box_unchecked} />
        </View>
        <View>
          <Text>{`${JSON.stringify(incident)}`}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Incident;
