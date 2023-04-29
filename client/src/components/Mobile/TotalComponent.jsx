import React, { useEffect, useState } from "react";

const TotalPrice = ({ name, values, toggleBreakdown, colors }) => {
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

    if (name === "Acc. Payable" || name === "Capital") {
      setTotal((totalCredit - totalDebit).toFixed(2));
    } else {
      setTotal((totalDebit - totalCredit).toFixed(2));
    }
  }, [values]);

  return (
    <div
      className="p-2 px-4 w-full h-full"
      onClick={() => toggleBreakdown(name)}
    >
      <div className="flex h-full w-full">
        <div className="flex justify-center items-center mr-3">
          {total > 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-14 h-14 mr-1`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-14 h-14 mr-1 stroke-red-400`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          )}
        </div>

        <div className="flex flex-col w-full">
          <div className="flex items-center w-full">
            <p className="text-lg font-normal text-black text-md min-w-[7rem] text-center w-full">
              {name}
            </p>
          </div>
          <div className="flex justify-evenly items-center">
            <p
              className={`text-4xl font-bold text-center ${
                total > 0 ? `${colors.text}` : "text-red-400"
              } flex items-center`}
            >
              {total}
              {/* <span className="text-sm"> ₱</span> */}
            </p>
          </div>
        </div>

        {/* <div className="flex flex-col min-w-[7rem] ml-5 items-start text-gray-500 justify-center">
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
        </div> */}
      </div>
    </div>
  );
};

export default TotalPrice;
