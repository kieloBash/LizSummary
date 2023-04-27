import React, { useState } from "react";
import FileUploadModal from './FileUploadModal'
function Hero({ colors, handleUploadedFile }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`bg-transparent pb-12 overflow-y-hidden`}
      style={{ minHeight: 700 }}
    >
      <dh-component>
        <div
          className={`${colors.gradient} h-screen flex justify-center items-center`}
        >
          <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
              <h1 className={`text-5xl text-center ${colors.textDark} font-black mb-8`}>
                Summary
                <span className={`text-white`}> Report</span>
              </h1>
              <div className="w-2/3 mx-auto mb-4 shadow-lg rounded-lg">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://images.pexels.com/photos/2002717/pexels-photo-2002717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              </div>
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
