import React, { useEffect, useState } from "react";
import Hero from "./components/Mobile/Hero";
import bgColors from "./themes/colorPallette";
import SummaryComponent from "./components/Mobile/SummaryComponent";
import {
  readCashModule,
  readAccountsReceivableModule,
  readNotesReceivableModule,
  readAccountsPayableModule,
  readAdminExpenseModule,
  readLowerModule,
  save,
} from "./helper/ExcelFilesHandler";
import BreakdownModule from "./components/Mobile/BreakdownModule";
import Navbar from "./components/Mobile/Navbar";
import CashComponent from "./components/Mobile/CashComponent";
import OwnerComponent from "./components/Mobile/OwnerComponent";

function App() {
  const categories = [
    "Cash",
    "Acc. Receivable",
    "Notes Receivable",
    "Acc. Payable",
    "Admin Expense",
    "Interest Expense",
    "Inventory",
    "Salaries Expense",
    "Capital",
    "Drawings",
  ];
  const [file, setFile] = useState();
  const [toggleColorChange, setColorChange] = useState(false);
  const [colorsSelected, setColorsSelected] = useState({
    gradient: bgColors.pinkGradient,
    text: bgColors.pinkText,
    bg: bgColors.pinkBgLight,
    stroke: bgColors.pinkStroke,
    fill: bgColors.pinkFill,
    bgOp: bgColors.pinkBgOp,
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

    setFile(file);
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
  }, [data, dataLower, file]);

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
  const handleColorChange = (color) => {
    switch (color) {
      case 1:
        setColorsSelected((prev) => {
          return {
            ...prev,
            gradient: bgColors.purpleGradient,
            text: bgColors.purpleText,
            bg: bgColors.purpleBgLight,
            stroke: bgColors.purpleStroke,
            fill: bgColors.purpleFill,
            bgOp: bgColors.purpleBgOp,
          };
        });
        break;
      case 2:
        setColorsSelected((prev) => {
          return {
            ...prev,
            gradient: bgColors.pinkGradient,
            text: bgColors.pinkText,
            bg: bgColors.pinkBgLight,
            stroke: bgColors.pinkStroke,
            fill: bgColors.pinkFill,
            bgOp: bgColors.pinkBgOp,
          };
        });
        break;
      case 3:
        setColorsSelected((prev) => {
          return {
            ...prev,
            gradient: bgColors.blueGradient,
            text: bgColors.blueText,
            bg: bgColors.blueBgLight,
            stroke: bgColors.blueStroke,
            fill: bgColors.blueFill,
            bgOp: bgColors.blueBgOp,
          };
        });
        break;
      default:
        break;
    }
    setColorChange(!toggleColorChange);
  };

  const handleAdd = (input) => {
    let prev;
    switch (input.category) {
      case categories[0]:
        prev = allData.cash;
        break;
      case categories[1]:
        prev = allData.accountsReceivable;
        break;
      case categories[2]:
        prev = allData.notesReceivable;
        break;
      case categories[3]:
        prev = allData.accountsPayable;
        break;
      case categories[4]:
        prev = allData.adminExpense;
        break;
      case categories[5]:
        prev = allData.interest;
        break;
      case categories[6]:
        prev = allData.inventory;
        break;
      case categories[7]:
        prev = allData.salaries;
        break;
      case categories[8]:
        prev = allData.capital;
        break;
      case categories[9]:
        prev = allData.drawings;
        break;
      default:
        break;
    }

    let debits = prev.debits;
    let credits = prev.credits;

    switch (input.type) {
      case "debit credit":
        debits.push({ date: input.dateDebit, debit: Number(input.debit) });
        credits.push({ date: input.dateCredit, credit: Number(input.credit) });
        break;
      case "debit":
        debits.push({ date: input.dateDebit, debit: Number(input.debit) });
        break;
      case "credit":
        credits.push({ date: input.dateCredit, credit: Number(input.credit) });
        break;
      default:
        break;
    }

    switch (input.category) {
      case categories[0]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          cash: prev,
        }));
        break;
      case categories[1]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          accountsReceivable: prev,
        }));
        break;
      case categories[2]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          notesReceivable: prev,
        }));
        break;
      case categories[3]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          accountsPayable: prev,
        }));
        break;
      case categories[4]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          adminExpense: prev,
        }));
        break;
      case categories[5]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          interest: prev,
        }));
        break;
      case categories[6]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          inventory: prev,
        }));
        break;
      case categories[7]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          salaries: prev,
        }));
        break;
      case categories[8]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          capital: prev,
        }));
        break;
      case categories[9]:
        setAllData((prevAllData) => ({
          ...prevAllData,
          drawings: prev,
        }));
        break;
      default:
        break;
    }
    
  };

  const handleSave = () =>{
    save(file, allData);
  }

  return (
    <div className={`App ${colorsSelected.gradient} w-screen h-screen overflow-hidden`}>
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
          <div className="absolute bottom-[6.5rem] flex w-28 justify-evenly items-center">
            {toggleColorChange ? (
              <div className="absolute -top-[2.4rem] -left-[3rem] w-40 h-10 bg-white/60 backdrop-blur-md rounded-full shadow-lg flex justify-evenly items-center">
                <div
                  className="h-[2rem] w-[2rem] bg-purple-400 rounded-full"
                  onClick={() => handleColorChange(1)}
                ></div>
                <div
                  className="h-[2rem] w-[2rem] bg-pink-400 rounded-full"
                  onClick={() => handleColorChange(2)}
                ></div>
                <div
                  className="h-[2rem] w-[2rem] bg-blue-400 rounded-full"
                  onClick={() => handleColorChange(3)}
                ></div>
              </div>
            ) : (
              <></>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-8 h-8 ${colorsSelected.fill}`}
              onClick={() => setColorChange(!toggleColorChange)}
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-8 h-8 ${colorsSelected.fill}`}
              onClick={handleSave}
            >
              <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
            </svg>
          </div>

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
                  <SummaryComponent
                    data={allData}
                    colors={colorsSelected}
                    handleAdd={handleAdd}
                  />
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
