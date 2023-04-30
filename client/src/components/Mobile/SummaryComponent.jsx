import React, { useEffect, useState } from "react";
import AddTransaction from "./AddTransaction";

const SummaryComponent = ({ data, colors, handleAdd }) => {
  const [assetValues, setAssetValues] = useState();
  const [liabilitiesValues, setLiabilitiesValues] = useState();
  const [equityValues, setEquitysValues] = useState();

  const [toggleAdd, setToggleAdd] = useState(false);

  function getTotal(data, name) {
    let credits = 0;
    let debits = 0;
    let total = 0;
    data.credits.forEach((val) => {
      credits += val.credit;
    });
    data.debits.forEach((val) => {
      debits += val.debit;
    });

    total = (credits - debits).toFixed(2);

    return Math.abs(total);
  }
  useEffect(() => {
    let cashTotal = getTotal(data.cash);
    let inventoryTotal = getTotal(data.inventory);
    let accReceiveTotal = getTotal(data.accountsReceivable);
    let notesReceiveTotal = getTotal(data.notesReceivable);
    let totalAssets =
      cashTotal + inventoryTotal + accReceiveTotal + notesReceiveTotal;
    setAssetValues([
      { name: "Cash", val: cashTotal },
      { name: "Inventory", val: inventoryTotal },
      { name: "Acc. Receivable", val: accReceiveTotal },
      { name: "Notes. Receivable", val: notesReceiveTotal },
      { name: "Total", val: totalAssets },
    ]);

    let accPaytotal = getTotal(data.accountsPayable);
    setLiabilitiesValues([
      { name: "Acc Payable", val: accPaytotal },
      { name: "Total", val: accPaytotal },
    ]);

    let capitalTotal = getTotal(data.capital);
    let salariesTotal = getTotal(data.salaries);
    let adminTotal = getTotal(data.adminExpense);
    let interestTotal = getTotal(data.interest);
    let drawingsTotal = getTotal(data.drawings);
    setEquitysValues([
      {
        name: "Capital",
        val: Math.abs(
          (capitalTotal - salariesTotal - adminTotal - interestTotal).toFixed(2)
        ),
      },
      { name: "Drawings", val: drawingsTotal },
      {
        name: "Owners Equity",
        val: Math.abs(
          capitalTotal -
            salariesTotal -
            adminTotal -
            interestTotal -
            drawingsTotal
        ).toFixed(2),
      },
      {
        name: "Liabilities & Owners Equity",
        val: (
          capitalTotal -
          salariesTotal -
          adminTotal -
          interestTotal -
          drawingsTotal +
          accPaytotal
        ).toFixed(2),
      },
    ]);
  }, [data]);

  const handleClose = () =>{
    setToggleAdd(prev=>setToggleAdd(false))
  }

  return (
    <>
      {assetValues && liabilitiesValues && equityValues ? (
        <div
          className={`w-5/6 h-4/5 flex flex-col justify-center items-center font-main ${colors.text} font-normal mb-32`}
        >
          <div className="grid grid-cols-1 grid-rows-3 gap-5 mb-4">
            <div className="bg-white/80 w-[18rem] h-[11rem] rounded-2xl shadow-xl p-2 flex flex-col">
              <div className="text-xl mb-0 font-bold ml-1">Assets</div>
              <div className="bg-white w-full h-full rounded-2xl shadow-xl p-2 text-gray-400 flex justify-evenly flex-col">
                {assetValues.map((asset, index) => {
                  return (
                    <div key={index}>
                      {asset.name === "Total" ? (
                        <div
                          className={`${colors.text} text-sm flex max-w-full mt-2 font-bold`}
                        >
                          <div className="w-[9.4rem]">{asset.name}</div>
                          {asset.val}
                        </div>
                      ) : (
                        <div className="text-sm flex max-w-full">
                          <div className="w-[9.4rem]">{asset.name}</div>
                          {asset.val}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white/80 w-[18rem] h-[11rem] rounded-2xl shadow-xl p-2 flex flex-col">
              <div className="text-xl mb-0 font-bold ml-1">Liabilities</div>
              <div className="bg-white w-full h-full rounded-2xl shadow-xl p-2 text-gray-400 flex justify-start flex-col">
                {liabilitiesValues.map((asset, index) => {
                  return (
                    <div key={index}>
                      {asset.name === "Total" ? (
                        <div
                          className={`${colors.text} text-sm flex max-w-full mt-2 font-bold`}
                        >
                          <div className="w-[9.4rem]">{asset.name}</div>
                          {asset.val}
                        </div>
                      ) : (
                        <div className="text-sm flex max-w-full">
                          <div className="w-[9.4rem]">{asset.name}</div>
                          {asset.val}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white/80 w-[18rem] h-[11rem] rounded-2xl shadow-xl p-2 flex flex-col">
              <div className="text-xl mb-0 font-bold ml-1">Owner's Equity</div>
              <div className="bg-white w-full h-full rounded-2xl shadow-xl p-2 text-gray-400 flex justify-start flex-col">
                {equityValues.map((asset, index) => {
                  return (
                    <div key={index}>
                      {asset.name === "Liabilities & Owners Equity" ? (
                        <div
                          className={`${colors.text} text-sm flex max-w-full mt-2 font-bold`}
                        >
                          <div className="w-[9.4rem]">{asset.name}</div>
                          {asset.val}
                        </div>
                      ) : (
                        <div className="text-sm flex max-w-full">
                          <div className="w-[9.4rem]">{asset.name}</div>
                          {asset.val}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full h-20 flex justify-center items-center">
            <button
              className={`${colors.bg} w-2/3 h-1/2 rounded-xl shadow-md text-white font-normal flex justify-center items-center`}
              onClick={() => setToggleAdd(!toggleAdd)}
            >
              Add Transaction{" "}
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </button>
          </div>

          {toggleAdd ? <AddTransaction colors={colors} handleClose={handleClose} handleAdd={handleAdd}/> : <></>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SummaryComponent;
