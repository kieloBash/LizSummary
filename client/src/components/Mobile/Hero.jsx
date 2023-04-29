import React from "react";
import FileUploadModal from './FileUploadModal'
function Hero({ colors, handleUploadedFile }) {
  return (
    <div
      className={`bg-transparent pb-12 overflow-y-hidden`}
      style={{ minHeight: 700 }}
    >
      <dh-component>
        <div
          className={`h-screen flex justify-center items-center font-main`}
        >
          <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
              <h1 className={`text-5xl text-center ${colors.text} font-black mb-8`}>
                Summary
                <span className={`text-white`}> Report</span>
              </h1>
            </div>
            <div className="flex justify-center items-center w-1/2">
                <FileUploadModal colors={colors} handleUploadedFile={handleUploadedFile}/>
            </div>
          </div>
        </div>
      </dh-component>
      {/* Code block ends */}
    </div>
  );
}

export default Hero;
