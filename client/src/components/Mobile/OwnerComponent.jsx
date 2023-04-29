import React from "react";
import TotalPrice from "./TotalComponent";

const OwnerComponent = ({ data, colors, toggleBreakdown }) => {
  const val = [
    { name: "Interest Expense", values: data.interest },
    { name: "Inventory", values: data.inventory },
    { name: "Salaries Expense", values: data.salaries },
    { name: "Capital", values: data.capital },
    { name: "Drawings", values: data.drawings },
  ];
  return (
    <div
      className={`w-5/6 h-4/5 flex justify-end items-center font-main ${colors.text} font-normal mb-24`}
    >
      <div className="grid grid-cols-1 grid-rows-5 gap-8 w-5/6 h-full">
        {val.map((element, index) => {
          return (
            <div
              className="bg-white/80 w-full p-4 rounded-l-2xl shadow-xl"
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

export default OwnerComponent;
