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
import BreakdownModule from "./components/Mobile/BreakdownModule";

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
  const [toggleModule, setToggleModule] = useState(false);
  const [toBreakDown, setToBreakDown] = useState();

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
    if (data) setLoading(false);
  }, [data]);

  const toggleBreakdown = (name) => {
    switch (name) {
      case "Cash":
        setToBreakDown({ name: name, data: data.cash });
        setToggleModule(true);
        break;
      case "Acc. Receivable":
        setToBreakDown({ name: name, data: data.accountsReceivable });
        setToggleModule(true);
        break;
      case "Notes Receivable":
        setToBreakDown({ name: name, data: data.notesReceivable });
        setToggleModule(true);
        break;
      case "Acc. Payable":
        setToBreakDown({ name: name, data: data.accountsPayable });
        setToggleModule(true);
        break;
      case "Admin Expense":
        setToBreakDown({ name: name, data: data.adminExpense });
        setToggleModule(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`App ${colorsSelected.gradient} w-screen h-screen`}>
      {loading ? (
        <Hero colors={colorsSelected} handleUploadedFile={handleUploadedFile} />
      ) : (
        <div className="flex w-screen h-screen justify-center items-center">
          {data ? (
            <div className="flex flex-col h-screen w-screen justify-center items-center">
              <div className="flex-1"></div>
              <div className="flex-1 flex flex-col w-screen items-start ml-10 mb-4 justify-evenly">
                <TotalComponent
                  name={"Cash"}
                  values={data.cash}
                  toggleBreakdown={toggleBreakdown}
                />
                <div className="mb-2"></div>
                <TotalComponent
                  name={"Acc. Receivable"}
                  values={data.accountsReceivable}
                  toggleBreakdown={toggleBreakdown}
                />
                <TotalComponent
                  name={"Notes Receivable"}
                  values={data.notesReceivable}
                  toggleBreakdown={toggleBreakdown}
                />
                <div className="mb-2"></div>
                <TotalComponent
                  name={"Acc. Payable"}
                  values={data.accountsPayable}
                  toggleBreakdown={toggleBreakdown}
                />
                <TotalComponent
                  name={"Admin Expense"}
                  values={data.adminExpense}
                  toggleBreakdown={toggleBreakdown}
                />
              </div>
              {toggleModule ? (
                <BreakdownModule
                  toBreakDown={toBreakDown}
                  setToggleModule={setToggleModule}
                  colors={colorsSelected}
                />
              ) : (
                <></>
              )}
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
