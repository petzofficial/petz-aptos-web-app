import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function LinearProgressEnergy(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          style={{ color: "#5c6cff", backgroundColor: "#959595" }}
          sx={{ color: "#5c6cff", height: "5px", backgroundColor: "#959595" }}
          variant="determinate"
          value={props.energy}
          {...props}
        />
      </Box>
    </Box>
  );
}

export default LinearProgressEnergy;
