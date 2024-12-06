import "./tabs.scss";

import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";

const DashTabs = ({ value, setValue }) => {
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Tabs className="dashtabs" value={value} onChange={handleChange}>
        <Tab className="dashtab" value="expense" label={t("expense")} />
        <Tab className="dashtab" value="income" label={t("income")} />
        <Tab className="dashtab" value="summary" label={t("summary")} />
      </Tabs>
    </Box>
  );
};

export default DashTabs;
