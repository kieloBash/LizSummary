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
              {/* <div className="flex justify-center items-center w-full">
                <div className="ml-[3px] grid grid-cols-2 gap-0 flex-1">
                  <div className=" flex flex-col w-screen items-start mb-4 justify-evenly">
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
                    <div className="mb-2"></div>
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
                    <div className="mb-2"></div>
                    <TotalComponent
                      name={"Admin Expense"}
                      values={data.adminExpense}
                      toggleBreakdown={toggleBreakdown}
                    />
                  </div>
                  <div className=" flex flex-col w-screen items-start mb-4 justify-evenly">
                    <TotalComponent
                      name={"Interest Expense"}
                      values={dataLower.interest}
                      toggleBreakdown={toggleBreakdown}
                    />
                    <div className="mb-2"></div>
                    <TotalComponent
                      name={"Inventory"}
                      values={dataLower.inventory}
                      toggleBreakdown={toggleBreakdown}
                    />
                    <div className="mb-2"></div>
                    <TotalComponent
                      name={"Salaries Expense"}
                      values={dataLower.salaries}
                      toggleBreakdown={toggleBreakdown}
                    />
                    <div className="mb-2"></div>
                    <TotalComponent
                      name={"Capital"}
                      values={dataLower.capital}
                      toggleBreakdown={toggleBreakdown}
                    />
                    <div className="mb-2"></div>
                    <TotalComponent
                      name={"Drawings"}
                      values={dataLower.drawings}
                      toggleBreakdown={toggleBreakdown}
                    />
                  </div>
                </div>
              </div> */}

              {navSelected === 2 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <SummaryComponent data={allData} colors={colorsSelected} />
                </div>
              ) : (
                <></>
              )}

              {toggleModule ? (
                <BreakdownModule
                  toBreakDown={toBreakDown}
                  setToggleModule={setToggleModule}
                  colors={colorsSelected}
                />
              ) : (
                <></>
              )}

              <Navbar
                colors={colorsSelected}
                navSelected={navSelected}
                setNavSelected={setNavSelected}
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
