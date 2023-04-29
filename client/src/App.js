import React, { useEffect, useState } from "react";
import Hero from "./components/Mobile/Hero";
import bgColors from "./themes/colorPallette";
import TotalComponent from "./components/Mobile/TotalComponent";

import {
  readCashModule,
  readAccountsReceivableModule,
  readNotesReceivableModule,
  readAccountsPayableModule,
  readAdminExpenseModule,
} from "./helper/ExcelFilesHandler";

function App() {
  const [colorsSelected, setColorsSelected] = useState({
    gradient: bgColors.purpleGradient,
    text: bgColors.purpleText,
    textDark: bgColors.purpleTextDark,
    bg: bgColors.purpleBgLight,
    bgDark: bgColors.purpleBgDark,
  });
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const handleUploadedFile = async (file) => {
    setData({
      cash: await readCashModule(file),
      accountsReceivable: await readAccountsReceivableModule(file),
      notesReceivable: await readNotesReceivableModule(file),
      accountsPayable: await readAccountsPayableModule(file),
      adminExpense: await readAdminExpenseModule(file),
    });
  };

  useEffect(() => {
    if (data) {
      setLoading(false);
      console.log(data);
    }
  }, [data]);

  return (
    <div className={`App ${colorsSelected.gradient} w-screen h-screen`}>
      {loading ? (
        <Hero colors={colorsSelected} handleUploadedFile={handleUploadedFile} />
      ) : (
        <div className="flex w-screen h-screen justify-center items-center">
          {data ? (
            <div className="flex flex-col h-screen w-screen justify-evenly items-center">
              <TotalComponent name={"Cash"} values={data.cash} />
              <TotalComponent
                name={"Accounts Receivable"}
                values={data.accountsReceivable}
              />
              <TotalComponent
                name={"Notes Receivable"}
                values={data.notesReceivable}
              />
              <TotalComponent
                name={"Accounts Payable"}
                values={data.accountsPayable}
              />
              <TotalComponent
                name={"Admin Expense"}
                values={data.adminExpense}
              />
            </div>
          ) : (
            <>Hello</>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
