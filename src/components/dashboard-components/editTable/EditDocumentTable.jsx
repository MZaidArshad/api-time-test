import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useNavigate, useParams } from "react-router-dom";

const EditDocumentTable = ({
  data,
  selectedDoc,
  setSelectedDoc,
  deleteDoc,
}) => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const { parentId, folderId } = useParams();
  const navigate = useNavigate();

  const handleRowClick = (doc) => {
    setSelectedRowId(doc.id); // Set the selected row to the clicked row's id
    setSelectedDoc(doc);
    const path = parentId
      ? `/dashboard/add/${parentId}/${folderId}/${doc.id}`
      : `/dashboard/add/${folderId}/${doc.id}`;

    navigate(path);
  };

  useEffect(() => {
    console.log("selectedRowId", selectedRowId);
  }, [selectedRowId]);

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "var(--primary)", color: "white" }}>
          {/* Blue header background */}
          <th
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              whiteSpace: "nowrap",
            }}
          >
            File
          </th>
          <th
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              whiteSpace: "nowrap",
            }}
          >
            File Name
          </th>
          <th
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              whiteSpace: "nowrap",
            }}
          >
            Drawing Number
          </th>
          <th
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              whiteSpace: "nowrap",
            }}
          >
            Drawing Title
          </th>
          <th
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              whiteSpace: "nowrap",
            }}
          >
            Latest Revision
          </th>
          <th
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              whiteSpace: "nowrap",
            }}
          >
            Latest Revision Date
          </th>
          <th
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              whiteSpace: "nowrap",
            }}
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody style={{ backgroundColor: "#323238" }}>
        {" "}
        {/* Dark background for table body */}
        {data.map((doc) => (
          <tr
            key={doc.id}
            onClick={() => handleRowClick(doc)}
            style={{
              backgroundColor: selectedRowId === doc.id ? "#e0f7fa" : "#323238",
              color: selectedRowId === doc.id ? "#000000" : "#ffffff",
              cursor: "pointer",
            }}
          >
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              <a href={doc?.imageURL} target="_blank">
                <PictureAsPdfIcon />{" "}
              </a>
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {doc.fileName}
            </td>

            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {doc.drawing_number}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {doc.drawing_title}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {doc.latest_revision}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {doc.latest_revision_date}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              <Tooltip title="Delete file" placement="top">
                <IconButton
                  onClick={() => {
                    deleteDoc(doc.id);
                    setSelectedDoc(data[0] || []);
                  }}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditDocumentTable;
