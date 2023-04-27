import React, { useEffect, useState } from "react";

const TotalPrice = ({ name, values }) => {
  const [total, setTotal] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let totalCredit = 0;
    let totalDebit = 0;
    values.credits.forEach((value) => {
      totalCredit += Number(value);
    });
    values.debits.forEach((value) => {
      totalDebit += Number(value);
    });
    setTotalCredit(totalCredit.toFixed(2));
    setTotalDebit(totalDebit.toFixed(2));
    setTotal((totalDebit - totalCredit).toFixed(2));
  }, [values]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800" onClick={()=>setOpen(!open)}>
      <div className="flex items-center">
        <span className="relative p-4 bg-green-200 rounded-xl">
          <svg
            width="40"
            fill="currentColor"
            height="40"
            className="absolute h-4 text-green-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
          </svg>
        </span>
        <p className="ml-3 text-sm font-bold text-black text-md dark:text-white mr-3 min-w-[8rem]">
          {name}
        </p>
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
      <div className="flex justify-evenly items-center">
        <p
          className={`my-4 text-4xl font-bold text-center ${
            total > 0 ? "text-green-400" : "text-red-400"
          } mr-4 flex items-center`}
        >
          {total}
          {/* <span className="text-sm"> ₱</span> */}
        </p>
        {open ? (
          <div className="flex items-center text-sm text-green-500">
            <div className="flex flex-col text-gray-400 mt-2">
              <div className="flex">
                <span className="">{totalDebit}</span>{" "}
                <span className="text-gray-400 ml-1"> Debit</span>
              </div>
              <div className="flex text-gray-400">
                <span>{totalCredit}</span>{" "}
                <span className="text-gray-400 ml-1"> Credit</span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TotalPrice;
