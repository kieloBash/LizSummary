import React, { useState } from "react";
import FileUpload from "./components/FileUploadExcel";
import Hero from "./components/Mobile/Hero";
import bgColors from "./themes/colorPallette";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [colorsSelected, setColorsSelected] = useState({
    gradient: bgColors.purpleGradient,
    text: bgColors.purpleText,
    textDark: bgColors.purpleTextDark,
    bg: bgColors.purpleBgLight,
    bgDark: bgColors.purpleBgDark,
  });
  const [data, setData] = useState({});
  const [credits, setCredits] = useState([]);
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const toggleMobileData = (mobileData) => {
    console.log(mobileData);
    setData(mobileData);
    console.log(data);
  };

  const handleUploadedFile = (file) => {
    console.log("hello");
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const ws = wb.Sheets["LEDGER"];

        const creditValues = XLSX.utils.sheet_to_json(ws, {
          range: "F5:F60",
          header: 1,
        });

        let credits = [];
        // let totalCredit = 0;

        creditValues.forEach((credit) => {
          if (credit !== undefined && credit !== "" && credit > 0) {
            credits.push(credit);
            // totalCredit += Number(credit);
          }
        });

        let temp = {
          credits,
        };

        resolve(temp);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
      setCredits(d.credits);
    });
  };

  return (
    <div className={`App ${colorsSelected.gradient} w-screen h-screen`}>
      <Hero colors={colorsSelected} handleUploadedFile={handleUploadedFile} />
      {/* <FileUpload toggleMobileData={toggleMobileData} /> */}
    </div>
  );
}

export default App;
