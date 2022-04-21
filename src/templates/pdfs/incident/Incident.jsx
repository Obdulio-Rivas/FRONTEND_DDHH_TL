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

import logo from "./icons/tick_box_checked.png";

const Incident = ({ incident, victims, complainant }) => {
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
          {victims.map((victim) => {
            return <Text>{JSON.stringify(victim)}</Text>;
          })}
        </View>
        <View>
          <Text>{`${JSON.stringify(complainant)}`}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Incident;
