import React, { useEffect, useState } from "react";
import Hero from "./components/Mobile/Hero";
import bgColors from "./themes/colorPallette";
import TotalComponent from "./components/Mobile/TotalComponent";

import {
  readCreditsAccountsPayable,
  readCreditsAccountsReceivable,
  readCreditsAdminExpense,
  readCreditsCash,
  readCreditsNotesReceivable,
  readDebitsAccountsPayable,
  readDebitsAccountsReceivable,
  readDebitsAdminExpense,
  readDebitsCash,
  readDebitsNotesReceivable,
} from "./helper/ExcelFilesHandler";

function App() {
  const [colorsSelected, setColorsSelected] = useState({
    gradient: bgColors.purpleGradient,
    text: bgColors.purpleText,
    textDark: bgColors.purpleTextDark,
    bg: bgColors.purpleBgLight,
    bgDark: bgColors.purpleBgDark,
  });

  const [cash, setCash] = useState();
  const [accountsReceivable, setAccountsReceivable] = useState();
  const [accountsPayable, setAccountsPayable] = useState();
  const [notesReceivable, setNotesReceivable] = useState();
  const [adminExpense, setAdminExpense] = useState();

  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const handleUploadedFile = async (file) => {
    let tempCredits = [];
    let tempDebits = [];

    tempCredits = await readCreditsCash(file);
    tempDebits = await readDebitsCash(file);
    let tempCash = { debits: tempDebits, credits: tempCredits };

    tempCredits = await readCreditsAccountsReceivable(file);
    tempDebits = await readDebitsAccountsReceivable(file);
    let tempAccReceivable = { debits: tempDebits, credits: tempCredits };

    tempCredits = await readCreditsNotesReceivable(file);
    tempDebits = await readDebitsNotesReceivable(file);
    let tempNotesReceivable = { debits: tempDebits, credits: tempCredits };

    tempCredits = await readCreditsAccountsPayable(file);
    tempDebits = await readDebitsAccountsPayable(file);
    let tempAccPayable = { debits: tempDebits, credits: tempCredits };

    tempCredits = await readCreditsAdminExpense(file);
    tempDebits = await readDebitsAdminExpense(file);
    let tempAdminExp = { debits: tempDebits, credits: tempCredits };

    setData({
      cash: tempCash,
      accountsReceivable: tempAccReceivable,
      notesReceivable: tempNotesReceivable,
      accountsPayable: tempAccPayable,
      adminExpense: tempAdminExp,
    });
  };

  useEffect(() => {
    if (data) setLoading(false);
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
              <TotalComponent name={"Accounts Receivable"} values={data.accountsReceivable} />
              <TotalComponent name={"Notes Receivable"} values={data.notesReceivable} />
              <TotalComponent name={"Accounts Payable"} values={data.accountsPayable} />
              <TotalComponent name={"Admin Expense"} values={data.adminExpense} />
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
