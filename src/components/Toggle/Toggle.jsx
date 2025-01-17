import { useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
      <ToggleButton value="Create">Create</ToggleButton>
      <ToggleButton value="Join">Join</ToggleButton>
    </ToggleButtonGroup>
  );
}
export default Toggle;
