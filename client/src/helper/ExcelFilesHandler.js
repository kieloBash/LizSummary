import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// const EXCEL_TYPE =
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

export async function readDebitsCash(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "D5:D60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readCreditsCash(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "F5:F60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readCreditsAccountsReceivable(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "K5:K60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readDebitsAccountsReceivable(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "I5:I60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readCreditsNotesReceivable(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "P5:P60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readDebitsNotesReceivable(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "N5:N60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readCreditsAccountsPayable(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "U5:U60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readDebitsAccountsPayable(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "S5:S60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readCreditsAdminExpense(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "X5:X60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readDebitsAdminExpense(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const ws = wb.Sheets["LEDGER"];

      const values = XLSX.utils.sheet_to_json(ws, {
        range: "Z5:Z60",
        header: 1,
      });

      let data = [];

      values.forEach((value) => {
        if (value !== undefined && value !== "" && value > 0) {
          data.push(value);
        }
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
