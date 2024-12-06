import { useEffect, useState } from "react";
import EditHeader from "../../../components/dashboard-components/editHeader/EditHeader";
import "./editDoc.scss";
import { useSelectedDoc } from "../../../context/SelectedDocContext";
import placeholderImg from "../../../assets/imgs/placeholder-image.jpg";
import UploadFile from "../../../components/dashboard-components/fileUpload/UploadFile";
import Modal from "react-modal";
import axios from "axios";
Modal.setAppElement("#root");

const EditDoc = () => {
  const [endPoint, setEndPoint] = useState("analyze");
  const [files, setFiles] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [docType, setDocType] = useState("Fidelity");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setFiles([]);
  }, []);

  useEffect(() => {
    console.log("End Point ", endPoint);
  }, [endPoint]);

  const apiDetails = {
    analyze: {
      url: "https://5xvqscov7waaasd2gjq2eajpce0edmor.lambda-url.us-east-1.on.aws/analyze",
      headers: {
        accept: "application/json",
        "API-KEY": "abc",
        "Content-Type": "application/json",
      },
      body: (base64) => ({
        base64_content: base64,
        document_type: docType,
      }),
    },
    brokerage: {
      url: "https://gyjjt2uc2sk2u4swrjhmen3cmy0voevb.lambda-url.us-east-1.on.aws/document/brokerage",
      headers: {
        accept: "application/json",
        "API-KEY": "abc",
        "Content-Type": "application/json",
      },
      body: (base64) => ({
        content_base64: base64,
      }),
    },
    general: {
      url: "https://gyjjt2uc2sk2u4swrjhmen3cmy0voevb.lambda-url.us-east-1.on.aws/document/general",
      headers: {
        accept: "application/json",
        "API-KEY": "abc",
        "Content-Type": "application/json",
      },
      body: (base64) => ({
        content_base64: base64,
      }),
    },
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    const selectedApi = apiDetails[endPoint];
    if (!selectedApi) {
      console.error("Invalid endpoint selected");
      setIsProcessing(false);
      return;
    }

    try {
      const startTime = Date.now();
      console.log("Processing started...");

      const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
        });

      console.log("Converting files to base64...");
      const base64Results = await Promise.allSettled(
        files.map((file) =>
          convertToBase64(file.file).then((base64) => ({ id: file.id, base64 }))
        )
      );

      const base64Files = base64Results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      console.log("base64Files", base64Files);

      const conversionErrors = base64Results
        .filter((result) => result.status === "rejected")
        .map((result, index) => ({
          fileName: files[index].file.name,
          error: result.reason,
        }));

      if (conversionErrors.length > 0) {
        console.warn("Some files failed to convert:", conversionErrors);
      }

      console.log("Sending files to API...");

      const sendRequest = async (base64) => {
        console.log(
          `Sending request for file with base64 length: ${base64.length}`
        );

        console.log(
          "headers, body",
          selectedApi.url,
          selectedApi.headers,
          selectedApi.body(base64)
        );
        return axios.post(selectedApi.url, selectedApi.body(base64), {
          headers: selectedApi.headers,
        });
      };

      const responseResults = await Promise.allSettled(
        base64Files.map(({ base64 }) => sendRequest(base64))
      );

      // Filter successful and failed responses
      const successfulResponses = responseResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => JSON.parse(result.value.data));

      const apiErrors = responseResults
        .filter((result) => result.status === "rejected")
        .map((result, index) => ({
          fileName: base64Files[index].id,
          error: result.reason,
        }));

      if (apiErrors.length > 0) {
        console.warn("Some API requests failed:", apiErrors);
      }

      const endTime = Date.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
      console.log(`Processing completed in ${timeTaken} seconds`);
      window.toastify(`Processing completed in ${timeTaken} seconds`);

      setFiles([]);
      setTableData(successfulResponses); // Only set successful responses in table data
    } catch (error) {
      console.error("Error processing files:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    console.log(docType);
  }, [docType]);

  return (
    <>
      <div>
        <EditHeader
          setEndPoint={setEndPoint}
          endPoint={endPoint}
          docType={docType}
          setDocType={setDocType}
        />

        <div className="editDoc_body">
          <div className="row gy-5">
            <div className="col-12 uploadAndSelectedImageContainer">
              <UploadFile
                files={files}
                setFiles={setFiles}
                handleSubmit={handleSubmit}
                disabled={isProcessing} // Disable upload while processing
              />
            </div>
            <div className="col-12">
              {isProcessing ? (
                <h2 style={{ color: "#ffff" }}>
                  Processing files, please wait...
                </h2> // Show loading message or spinner
              ) : (
                tableData.length > 0 && (
                  <div className="table">
                    <table>
                      <thead>
                        <tr>
                          {tableData[0] &&
                            Object.keys(tableData[0]).map((key) => (
                              <th key={key}>{key}</th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData?.map((data, index) => (
                          <tr key={index}>
                            {typeof data === "object" &&
                              data &&
                              Object.entries(data).map(([key, value], i) => (
                                <td key={i}>
                                  {typeof value === "object" &&
                                  !Array.isArray(value) ? (
                                    <table>
                                      <tbody>
                                        {Object.entries(value || {}).map(
                                          ([subKey, subValue], j) => (
                                            <tr key={j}>
                                              <td>{subKey}</td>
                                              <td>
                                                {subValue?.toString() || ""}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  ) : Array.isArray(value) ? (
                                    <table>
                                      <thead>
                                        <tr>
                                          {value.length > 0 &&
                                            Object.keys(value[0] || {}).map(
                                              (subKey, j) => (
                                                <th key={j}>{subKey}</th>
                                              )
                                            )}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {value.map((item, j) => (
                                          <tr key={j}>
                                            {Object.values(item || {}).map(
                                              (subValue, k) => (
                                                <td key={k}>
                                                  {subValue?.toString() || ""}
                                                </td>
                                              )
                                            )}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  ) : (
                                    value?.toString() || ""
                                  )}
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDoc;
