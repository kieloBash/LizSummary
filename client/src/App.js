import React, { useEffect, useState } from "react";
import Hero from "./components/Mobile/Hero";
import bgColors from "./themes/colorPallette";
import TotalComponent from "./components/Mobile/TotalComponent";
import SummaryComponent from "./components/Mobile/SummaryComponent";
import {
  readCashModule,
  readAccountsReceivableModule,
  readNotesReceivableModule,
  readAccountsPayableModule,
  readAdminExpenseModule,
  readLowerModule,
} from "./helper/ExcelFilesHandler";
import BreakdownModule from "./components/Mobile/BreakdownModule";
import Navbar from "./components/Mobile/Navbar";
import CashComponent from "./components/Mobile/CashComponent";
import OwnerComponent from "./components/Mobile/OwnerComponent";

function App() {
  const [colorsSelected, setColorsSelected] = useState({
    gradient: bgColors.purpleGradient,
    text: bgColors.purpleText,
    textDark: bgColors.purpleTextDark,
    bg: bgColors.purpleBgLight,
    bgDark: bgColors.purpleBgDark,
    stroke: bgColors.purpleStroke,
  });
  const [data, setData] = useState();
  const [dataLower, setDataLower] = useState();
  const [allData, setAllData] = useState();
  const [loading, setLoading] = useState(true);
  const [toggleModule, setToggleModule] = useState(false);
  const [toBreakDown, setToBreakDown] = useState();

  const [navSelected, setNavSelected] = useState(2);

  const handleUploadedFile = async (file) => {
    setData({
      cash: await readCashModule(file),
      accountsReceivable: await readAccountsReceivableModule(file),
      notesReceivable: await readNotesReceivableModule(file),
      accountsPayable: await readAccountsPayableModule(file),
      adminExpense: await readAdminExpenseModule(file),
    });

    setDataLower(await readLowerModule(file));
  };

  useEffect(() => {
    if (data && dataLower) {
      setLoading(false);
      setAllData({
        cash: data.cash,
        accountsReceivable: data.accountsReceivable,
        notesReceivable: data.notesReceivable,
        accountsPayable: data.accountsPayable,
        adminExpense: data.adminExpense,
        interest: dataLower.interest,
        inventory: dataLower.inventory,
        salaries: dataLower.salaries,
        capital: dataLower.capital,
        drawings: dataLower.drawings,
      });
    }
  }, [data, dataLower]);

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
      case "Interest Expense":
        setToBreakDown({ name: name, data: dataLower.interest });
        setToggleModule(true);
        break;
      case "Inventory":
        setToBreakDown({ name: name, data: dataLower.inventory });
        setToggleModule(true);
        break;
      case "Salaries Expense":
        setToBreakDown({ name: name, data: dataLower.salaries });
        setToggleModule(true);
        break;
      case "Capital":
        setToBreakDown({ name: name, data: dataLower.capital });
        setToggleModule(true);
        break;
      case "Drawings":
        setToBreakDown({ name: name, data: dataLower.drawings });
        setToggleModule(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`App ${colorsSelected.gradient} w-screen h-screen`}>
      <div className="absolute rounded-full bg-white/40 h-[280px] w-[280px] top-[20px] left-[47px] z-0"></div>
      <div className="absolute rounded-full bg-white/30 h-[140px] w-[140px] top-[120px] left-[227px]  z-0"></div>
      <div className="absolute w-full h-full backdrop-blur-md bg-white/30 z-0"></div>
      {loading ? (
        <div className="absolute z-20">
          <Hero
            colors={colorsSelected}
            handleUploadedFile={handleUploadedFile}
          />
        </div>
      ) : (
        <div className="flex w-screen h-screen justify-center items-center overflow-hidden relative">
          {allData ? (
            <div className="h-full w-full">
              {navSelected === 1 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <CashComponent
                    data={allData}
                    colors={colorsSelected}
                    toggleBreakdown={toggleBreakdown}
                  />
                </div>
              ) : (
                <></>
              )}

              {navSelected === 2 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <SummaryComponent data={allData} colors={colorsSelected} />
                </div>
              ) : (
                <></>
              )}

              {navSelected === 3 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <OwnerComponent
                    data={allData}
                    colors={colorsSelected}
                    toggleBreakdown={toggleBreakdown}
                  />
                </div>
              ) : (
                <></>
              )}

              {toggleModule ? (
                <div className="w-full h-full bg-gray-300/60 absolute top-0 z-20">
                  <BreakdownModule
                    toBreakDown={toBreakDown}
                    setToggleModule={setToggleModule}
                    colors={colorsSelected}
                  />
                </div>
              ) : (
                <div className=""></div>
              )}

              <Navbar
                colors={colorsSelected}
                navSelected={navSelected}
                setNavSelected={setNavSelected}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
