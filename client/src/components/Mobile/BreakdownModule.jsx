import React, { useEffect, useState } from "react";

const BreakdownModule = ({ toBreakDown, setToggleModule, colors }) => {
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let debit = 0;
    let credit = 0;
    toBreakDown.data.debits.forEach((val) => {
      debit += Number(val.debit);
    });
    setDebit(debit.toFixed(2));

    toBreakDown.data.credits.forEach((val) => {
      credit += Number(val.credit);
    });
    setCredit(credit.toFixed(2));

    if(toBreakDown.name === 'Acc. Payable' || toBreakDown.name === 'Capital'){
        setTotal((credit-debit).toFixed(2))
    }else{
        setTotal((debit-credit).toFixed(2))
    }
  }, []);

  return (
    <div
      className="w-screen h-screen absolute bg-gray-400/80 flex justify-center items-center"
      onClick={() => setToggleModule(false)}
    >
      <div className="w-5/6 h-3/4 bg-gray-800 rounded-2xl p-4 shadow-lg flex flex-col">
        <div>
          <h1 className={`text-center text-4xl font-black ${colors.text} mb-5`}>
            {toBreakDown.name}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 h-4/5">
          <div
            className={`${colors.bg} rounded-3xl p-2 grid grid-cols-2 mx-auto max-h-[27rem] overflow-y-auto shadow-lg`}
          >
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {toBreakDown.data.debits.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-[11px] text-center border-b border-black flex justify-center items-center"
                    >
                      <td>{value.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Debit</th>
                </tr>
              </thead>
              <tbody>
                {toBreakDown.data.debits.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-[11px] text-center font-bold border-b border-black flex justify-center items-center"
                    >
                      <td>{value.debit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            className={`${colors.bg} rounded-3xl p-2 grid grid-cols-2 mx-auto max-h-[27rem] overflow-y-auto shadow-lg`}
          >
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {toBreakDown.data.credits.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-[11px] text-center border-b border-black flex justify-center items-center"
                    >
                      <td>{value.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                {toBreakDown.data.credits.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-[11px] text-center font-bold border-b border-black flex justify-center items-center"
                    >
                      <td>{value.credit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="flex flex-col text-white justify-center items-center">
            <h1>Total Debit</h1>
            <h1>{debit}</h1>
          </div>
          <div className="flex flex-col text-white justify-center items-center">
            <h1>Total Credit</h1>
            <h1>{credit}</h1>
          </div>
        </div>

        <div
          className={`w-full flex justify-center items-center text-4xl font-bold mt-1 ${colors.text}`}
        >
          {total}
        </div>
      </div>
    </div>
  );
};

export default BreakdownModule;
