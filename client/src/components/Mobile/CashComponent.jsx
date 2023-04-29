import React from "react";
import TotalPrice from "./TotalComponent";

const CashComponent = ({ data, colors, toggleBreakdown }) => {
  const val = [
    { name: "Cash", values: data.cash },
    { name: "Acc. Receivable", values: data.accountsReceivable },
    { name: "Notes Receivable", values: data.notesReceivable },
    { name: "Acc. Payable", values: data.accountsPayable },
    { name: "Admin Expense", values: data.adminExpense },
  ];
  return (
    <div
      className={`w-5/6 h-4/5 flex justify-start items-center font-main ${colors.text} font-normal mb-32`}
    >
      <div className="grid grid-cols-1 grid-rows-5 gap-8 w-5/6 h-full">
        {val.map((element, index) => {
          return (
            <div
              className="bg-white/80 w-full p-4 rounded-r-2xl shadow-xl"
              key={index}
            >
              <TotalPrice
                name={element.name}
                values={element.values}
                toggleBreakdown={toggleBreakdown}
                colors={colors}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CashComponent;
