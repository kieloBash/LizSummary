import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// const EXCEL_TYPE =
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1; // getMonth() returns a zero-based value
  var year = date.getFullYear();

  // add leading zeros to the day and month values if necessary
  day = day.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");

  // format the date as dd/mm/yyyy
  var formattedDate = day + "/" + month + "/" + year;

  return formattedDate; // output: "24/10/2021"
}

export async function readCashModule(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, {
        type: "buffer",
        cellDates: true,
        cellNF: false,
        cellText: false,
        dateFormat: "dd/mm/yyyy",
      });

      const ws = wb.Sheets["LEDGER"];

      // const NewWorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(NewWorkBook, ws, 'LEDGER_TEMP')
      // XLSX.writeFile(NewWorkBook, 'new_workbook.xlsx');

      const rowValues = XLSX.utils.sheet_to_json(ws, {
        range: "C5:F60",
        header: 1,
      });

      let debits = [];
      let credits = [];

      rowValues.forEach((row) => {
        if (row[1] !== undefined && row[1] !== "" && row[1] > 0) {
          let debitRow = {
            date: formatDate(new Date(row[0])),
            debit: row[1],
          };
          debits.push(debitRow);
        }
        if (row[3] !== undefined && row[3] !== "" && row[3] > 0) {
          let creditRow = {
            date: formatDate(new Date(row[2])),
            credit: row[3],
          };
          credits.push(creditRow);
        }
      });

      let data = {debits,credits};
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readAccountsReceivableModule(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, {
        type: "buffer",
        cellDates: true,
        cellNF: false,
        cellText: false,
        dateFormat: "dd/mm/yyyy",
      });

      const ws = wb.Sheets["LEDGER"];

      // const NewWorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(NewWorkBook, ws, 'LEDGER_TEMP')
      // XLSX.writeFile(NewWorkBook, 'new_workbook.xlsx');

      const rowValues = XLSX.utils.sheet_to_json(ws, {
        range: "H5:K60",
        header: 1,
      });

      let debits = [];
      let credits = [];

      rowValues.forEach((row) => {
        if (row[1] !== undefined && row[1] !== "" && row[1] > 0) {
          let debitRow = {
            date: formatDate(new Date(row[0])),
            debit: row[1],
          };
          debits.push(debitRow);
        }
        if (row[3] !== undefined && row[3] !== "" && row[3] > 0) {
          let creditRow = {
            date: formatDate(new Date(row[2])),
            credit: row[3],
          };
          credits.push(creditRow);
        }
      });

      let data = {debits,credits};
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readNotesReceivableModule(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, {
        type: "buffer",
        cellDates: true,
        cellNF: false,
        cellText: false,
        dateFormat: "dd/mm/yyyy",
      });

      const ws = wb.Sheets["LEDGER"];

      // const NewWorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(NewWorkBook, ws, 'LEDGER_TEMP')
      // XLSX.writeFile(NewWorkBook, 'new_workbook.xlsx');

      const rowValues = XLSX.utils.sheet_to_json(ws, {
        range: "M5:P60",
        header: 1,
      });

      let debits = [];
      let credits = [];

      rowValues.forEach((row) => {
        if (row[1] !== undefined && row[1] !== "" && row[1] > 0) {
          let debitRow = {
            date: formatDate(new Date(row[0])),
            debit: row[1],
          };
          debits.push(debitRow);
        }
        if (row[3] !== undefined && row[3] !== "" && row[3] > 0) {
          let creditRow = {
            date: formatDate(new Date(row[2])),
            credit: row[3],
          };
          credits.push(creditRow);
        }
      });

      let data = {debits,credits};
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readAccountsPayableModule(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, {
        type: "buffer",
        cellDates: true,
        cellNF: false,
        cellText: false,
        dateFormat: "dd/mm/yyyy",
      });

      const ws = wb.Sheets["LEDGER"];

      // const NewWorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(NewWorkBook, ws, 'LEDGER_TEMP')
      // XLSX.writeFile(NewWorkBook, 'new_workbook.xlsx');

      const rowValues = XLSX.utils.sheet_to_json(ws, {
        range: "R5:U60",
        header: 1,
      });

      let debits = [];
      let credits = [];

      rowValues.forEach((row) => {
        if (row[1] !== undefined && row[1] !== "" && row[1] > 0) {
          let debitRow = {
            date: formatDate(new Date(row[0])),
            debit: row[1],
          };
          debits.push(debitRow);
        }
        if (row[3] !== undefined && row[3] !== "" && row[3] > 0) {
          let creditRow = {
            date: formatDate(new Date(row[2])),
            credit: row[3],
          };
          credits.push(creditRow);
        }
      });

      let data = {debits,credits};
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readAdminExpenseModule(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, {
        type: "buffer",
        cellDates: true,
        cellNF: false,
        cellText: false,
        dateFormat: "dd/mm/yyyy",
      });

      const ws = wb.Sheets["LEDGER"];

      // const NewWorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(NewWorkBook, ws, 'LEDGER_TEMP')
      // XLSX.writeFile(NewWorkBook, 'new_workbook.xlsx');

      const rowValues = XLSX.utils.sheet_to_json(ws, {
        range: "W5:Z60",
        header: 1,
      });

      let debits = [];
      let credits = [];

      rowValues.forEach((row) => {
        if (row[1] !== undefined && row[1] !== "" && row[1] > 0) {
          let debitRow = {
            date: formatDate(new Date(row[0])),
            debit: row[1],
          };
          debits.push(debitRow);
        }
        if (row[3] !== undefined && row[3] !== "" && row[3] > 0) {
          let creditRow = {
            date: formatDate(new Date(row[2])),
            credit: row[3],
          };
          credits.push(creditRow);
        }
      });

      let data = {debits,credits};
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

