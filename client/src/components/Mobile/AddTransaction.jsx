import React, { useState } from "react";

const AddTransaction = ({ colors, handleClose, handleAdd }) => {
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
  const [selectedCategory, setSelectedCategory] = useState("Cash");

  const [dateDebit, setdateDebit] = useState("yyyy-MM-dd");
  const [dateDebitConsole, setdateDebitConsole] = useState(undefined);
  const [dateCredit, setdateCredit] = useState("yyyy-MM-dd");
  const [dateCreditConsole, setdateCreditConsole] = useState(undefined);

  const [credit, setcredit] = useState(0);
  const [debit, setdebit] = useState(0);

  const handleSubmit = () => {
    // console.log(selectedCategory, dateDebit, dateCredit, debit, credit);

    if (
      debit > 0 &&
      dateDebit !== "yyyy-MM-dd" &&
      credit > 0 &&
      dateCredit !== "yyyy-MM-dd"
    ) {
      handleAdd({
        type: "debit credit",
        credit,
        dateCredit,
        debit,
        dateDebit,
        category: selectedCategory,
      });
      handleClear();
      handleClose();
    } else if (debit > 0 && dateDebit !== "yyyy-MM-dd") {
      handleAdd({
        type: "debit",
        debit,
        dateDebit,
        category: selectedCategory,
      });
      handleClear();
      handleClose();
    } else if (credit > 0 && dateCredit !== "yyyy-MM-dd") {
      handleAdd({
        type: "credit",
        credit,
        dateCredit,
        category: selectedCategory,
      });
      handleClear();
      handleClose();
    } else {
      console.log("error");
    }
  };

  const handleClear = () => {
    setdateDebit("yyyy-MM-dd");
    setdateDebitConsole(undefined);
    setdateCredit("yyyy-MM-dd");
    setdateCreditConsole(undefined);
    setcredit(0);
    setdebit(0);
  };

  const handleToggleClose = () => {
    handleClear();
    handleClose();
  };

  function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // getMonth() returns a zero-based value
    var year = date.getFullYear();

    // add leading zeros to the day and month values if necessary
    day = day.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");

    // format the date as dd/mm/yyyy
    var formattedDateConsole = year + "-" + month + "-" + day;
    var formattedDate = day + "/" + month + "/" + year;

    return { formattedDateConsole, formattedDate }; // output: "24/10/2021"
  }

  const handleDateDebit = (e) => {
    let { formattedDateConsole, formattedDate } = formatDate(
      new Date(e.target.value)
    );
    setdateDebitConsole(formattedDateConsole);
    setdateDebit(formattedDate);
  };
  const handleDateCredit = (e) => {
    let { formattedDateConsole, formattedDate } = formatDate(
      new Date(e.target.value)
    );
    setdateCreditConsole(formattedDateConsole);
    setdateCredit(formattedDate);
  };
  return (
    <div
      className={`absolute w-screen h-screen top-0 bg-white/60 backdrop-blur-sm flex justify-center items-center z-20`}
    >
      <div
        className={`w-full h-3/4 rounded-2xl shadow-xl ${colors.bgOp} mx-5 relative p-4`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-8 h-8 absolute right-4 stroke-white"
          onClick={handleToggleClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <div className="w-full h-full text-white">
          <form className="w-full max-w-sm mt-6">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block  font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Category
                </label>
              </div>
              <div className="relative">
                <select
                  className={`block appearance-none w-full ${colors.text} py-3 px-4 pr-8 rounded leading-tight focus:outline-gray-400`}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                  id="grid-state"
                >
                  {categories.map((category, index) => {
                    return (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
                <div
                  className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black mr-3 `}
                >
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full h-8"></div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Date of Debit
                </label>
              </div>
              <div className={`md:w-2/3 ${colors.text}`}>
                <input
                  className={`appearance-none border-2 border-white rounded w-full py-2 px-4 leading-tight focus:outline-gray-400`}
                  type="date"
                  onChange={handleDateDebit}
                  value={dateDebitConsole}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Debit
                </label>
              </div>
              <div className={`md:w-2/3 ${colors.text}`}>
                <input
                  className={`appearance-none border-2 border-white rounded w-full py-2 px-4 leading-tight focus:outline-gray-400`}
                  type="number"
                  onChange={(e) => {
                    setdebit(e.target.value);
                  }}
                  value={debit}
                />
              </div>
            </div>
            <div className="w-full h-8"></div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Date of Credit
                </label>
              </div>
              <div className={`md:w-2/3 ${colors.text}`}>
                <input
                  className={`appearance-none border-2 border-white rounded w-full py-2 px-4 leading-tight focus:outline-gray-400`}
                  type="date"
                  onChange={handleDateCredit}
                  value={dateCreditConsole}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Credit
                </label>
              </div>
              <div className={`md:w-2/3 ${colors.text}`}>
                <input
                  className={`appearance-none border-2 border-white rounded w-full py-2 px-4 leading-tight focus:outline-gray-400`}
                  type="number"
                  onChange={(e) => {
                    setcredit(e.target.value);
                  }}
                  value={credit}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center mt-12">
              <div className="md:w-2/3">
                <button
                  className={`shadow ${colors.text} bg-white shadow-md font-bold py-2 px-12 rounded`}
                  type="button"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
