import React, { useEffect, useState } from "react";
import Hero from "./components/Mobile/Hero";
import bgColors from "./themes/colorPallette";
import TotalPrice from "./components/Mobile/TotalPrice";

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

  const [loading, setLoading] = useState(false);

  const handleUploadedFile = async (file) => {
    let tempCredits = [];
    let tempDebits = [];

    tempCredits = await readCreditsCash(file);
    tempDebits = await readDebitsCash(file);
    setCash({ debits: tempDebits, credits: tempCredits });

    tempCredits = await readCreditsAccountsReceivable(file);
    tempDebits = await readDebitsAccountsReceivable(file);
    setAccountsReceivable({ debits: tempDebits, credits: tempCredits });

    tempCredits = await readCreditsNotesReceivable(file);
    tempDebits = await readDebitsNotesReceivable(file);
    setNotesReceivable({ debits: tempDebits, credits: tempCredits });

    tempCredits = await readCreditsAccountsPayable(file);
    tempDebits = await readDebitsAccountsPayable(file);
    setAccountsPayable({ debits: tempDebits, credits: tempCredits });

    tempCredits = await readCreditsAdminExpense(file);
    tempDebits = await readDebitsAdminExpense(file);
    setAdminExpense({ debits: tempDebits, credits: tempCredits });

    setLoading(false);
  };

  useEffect(() => {
    if (cash) console.log(cash);
  }, [cash]);
  useEffect(() => {
    if (accountsReceivable) console.log(accountsReceivable);
  }, [accountsReceivable]);
  useEffect(() => {
    if (notesReceivable) console.log(notesReceivable);
  }, [notesReceivable]);
  useEffect(() => {
    if (accountsPayable) console.log(accountsPayable);
  }, [accountsPayable]);
  useEffect(() => {
    if (adminExpense) console.log(adminExpense);
  }, [adminExpense]);

  return (
    <div className={`App ${colorsSelected.gradient} w-screen h-screen`}>
      {loading ? (
        <Hero colors={colorsSelected} handleUploadedFile={handleUploadedFile} />
      ) : (
        <div className="flex w-screen h-screen justify-center items-center"><TotalPrice/></div>
      )}
    </div>
  );
}

export default App;
