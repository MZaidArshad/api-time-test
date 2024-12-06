import React, { useContext, useEffect, useState } from "react";
import "./header.scss";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DownloadIcon from "@mui/icons-material/Download";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import exportExcelFile from "../../utils/ExcelFile";
import exportPDFFile from "../../utils/PdfFile"; // Import the PDF export function
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import ExportModal from "../../exportModal/ExportModal";

const Header = ({ months, selectedMonth, setSelectedMonth, allDocuments }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  const monthNames = [
    t("months.jan"),
    t("months.feb"),
    t("months.mar"),
    t("months.apr"),
    t("months.may"),
    t("months.jun"),
    t("months.jul"),
    t("months.aug"),
    t("months.sep"),
    t("months.oct"),
    t("months.nov"),
    t("months.dec"),
  ];

  useEffect(() => {
    console.log("months ", months);
  }, [months]);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleDownloadExcel = async () => {
    await exportExcelFile(
      `All details of ${selectedMonth}`,
      allDocuments,
      user.uid,
      setIsDownloading
    );
    setIsDownloading(false);
    setIsModalOpen(false);
  };

  const handleDownloadPdf = async () => {
    await exportPDFFile(
      `All details of ${selectedMonth}`,
      allDocuments,
      user.uid,
      setIsDownloading
    );
    setIsDownloading(false);
    setIsModalOpen(false);
  };

  const handleExportClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="header">
      <div className="months_select">
        <FormControl fullWidth sx={{ color: "#ffff", borderColor: "#ffff" }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ color: "#ffff", borderColor: "#ffff" }}
          >
            {t("month")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedMonth}
            label="Month"
            onChange={handleChange}
            sx={{ color: "#ffff" }}
          >
            {months?.map((mon) => (
              <MenuItem key={mon} value={mon}>
                {`${monthNames[parseInt(mon.split("-")[0]) - 1]} ${
                  mon.split("-")[1]
                }`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="header_btns ">
        <Button
          variant="outlined"
          startIcon={
            isDownloading ? (
              <CircularProgress size={25} sx={{ color: "#ffff" }} />
            ) : (
              <DownloadIcon />
            )
          }
          className="header_btns_btn "
          onClick={handleExportClick}
          disabled={isDownloading}
        >
          {t("export")}
        </Button>
      </div>

      <ExportModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onExportExcel={handleDownloadExcel}
        onExportPdf={handleDownloadPdf}
      />
    </div>
  );
};

export default Header;
