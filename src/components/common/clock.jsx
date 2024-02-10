import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

function CircularProgressWithLabel(props) {
  const { seconds, totalseconds } = props;
  console.log("total seconds");
  console.log(totalseconds);
  console.log("seconds");
  console.log(seconds);
  const progress = (seconds / totalseconds) * 100; // Calculate progress percentage
  console.log(progress);
  const formattedTime = formatTime(seconds);

  return (
    <Box sx={{ position: "relative", display: "inline-flex", height: "100%" }}>
      <CircularProgress
        style={{ color: "#ff6900" }}
        variant="determinate"
        thickness={2}
        size={200}
        value={progress} // Set the progress seconds
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          className={`absolute max-sm:text-[33px] sm:text-[40px] md:text-[43px] lg:text-[48px] font-semibold ${props.barlow.className}`}
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {formattedTime}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
