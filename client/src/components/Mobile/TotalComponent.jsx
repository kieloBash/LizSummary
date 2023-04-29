import React, { useEffect, useState } from "react";

const TotalPrice = ({ name, values, toggleBreakdown }) => {
  const [total, setTotal] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  useEffect(() => {
    let totalCredit = 0;
    let totalDebit = 0;
    values.credits.forEach((value) => {
      totalCredit += Number(value.credit);
    });
    values.debits.forEach((value) => {
      totalDebit += Number(value.debit);
    });
    setTotalCredit(totalCredit.toFixed(2));
    setTotalDebit(totalDebit.toFixed(2));

    if (name === "Acc. Payable") {
      setTotal((totalCredit - totalDebit).toFixed(2));
    } else {
      setTotal((totalDebit - totalCredit).toFixed(2));
    }
  }, [values]);

  return (
    <div
      className="p-2 px-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800"
      onClick={() => toggleBreakdown(name)}
    >
      <div className="flex h-full">
        <div className="flex justify-center items-center mr-3">
          {total > 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 stroke-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 stroke-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
              />
            </svg>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <p className="text-sm font-bold text-black text-md dark:text-white min-w-[7rem] text-center">
              {name}
            </p>
          </div>
          <div className="flex justify-evenly items-center">
            <p
              className={`text-2xl font-bold text-center ${
                total > 0 ? "text-green-400" : "text-red-400"
              } flex items-center`}
            >
              {total}
              {/* <span className="text-sm"> ₱</span> */}
            </p>
          </div>
        </div>

        <div className="flex flex-col min-w-[7rem] ml-5 items-start text-gray-500 justify-center">
          <div className="flex flex-col text-sm">
            <p>
              <span className="w-10">Credits: </span>
              {totalCredit}
            </p>
            <p>
              <span className="w-10">Debits: </span>
              {totalDebit}
            </p>
          </div>
        </div>

        <div className="flex h-full justify-center items-center ml-[4px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="w-7 h-7 stroke-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TotalPrice;
