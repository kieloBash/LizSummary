import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function FileUpload({
  toggleMobileData,
  setSelectedFile,
  colors,
}) {
  const [credits, setCredits] = useState([]);

  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const handleFileSelect = (event) => {
    let file = event.target.files[0];
    setSelectedFile(file);
  };

  const saveAsExcel = (buffer, filename) => {
    const datas = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(datas, filename + "_export_" + new Date().getTime() + ".xlsx");
  };

  function toggleMobile() {}

  return (
    <div>
      <div class="mb-0">
        <input
          onChange={handleFileSelect}
          class={`relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-purple-300 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none`}
          type="file"
          id="formFile"
        />
      </div>
    </div>
  );
}
