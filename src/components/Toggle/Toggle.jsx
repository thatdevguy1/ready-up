import { useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material";

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: "#50B848",
  backgroundColor: "black",
  width: "170px",
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: "#50B848",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#50B848",
    },
  },
  "&:hover": {
    color: "#fff",
    backgroundColor: "#50B848",
  },
}));

function Toggle({ alignment, setAlignment }) {
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    console.log(alignment);
  }, [alignment]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <CustomToggleButton value="Create">Create</CustomToggleButton>
      <CustomToggleButton value="Join">Join</CustomToggleButton>
    </ToggleButtonGroup>
  );
}
export default Toggle;
