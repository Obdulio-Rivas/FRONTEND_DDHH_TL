import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

const PDFDownload = ({document: Document, filename, children}) => {
  return (
    <PDFDownloadLink document={Document} fileName={`${filename}.pdf`}>
      {({ blob, url, loading, error }) => {
        return children;
      }
      }
    </PDFDownloadLink>
  );
};

export default PDFDownload;
