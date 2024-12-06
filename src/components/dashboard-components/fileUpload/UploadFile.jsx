import React, { useEffect, useState } from "react";

import { Dropzone, FileMosaic } from "@dropzone-ui/react";

import "./uploadFile.scss";

const UploadFile = ({ files, setFiles, handleSubmit }) => {
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
    console.log(incommingFiles);
  };

  useEffect(() => {
    // Call the handleSubmit function whenever files state is updated
    if (files.length > 0) {
      // console.log("Calling Submit in Upload File ..");
      handleSubmit();
    }
  }, [files]);

  return (
    <section className="uploadFile">
      <>
        <Dropzone
          onChange={updateFiles}
          value={files}
          footerConfig={{ customMessage: "Only PDF files are allowed" }}
          label="Drop your files here"
          maxFileSize={52428800}
          accept="application/pdf"
        >
          {files.map((file) => (
            <FileMosaic
              className="filePreview"
              key={file.name + new Date().getMilliseconds()}
              {...file}
              preview
              resultOnTooltip
            />
          ))}
        </Dropzone>
      </>
    </section>
  );
};

export default UploadFile;
