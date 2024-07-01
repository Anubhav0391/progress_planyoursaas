import React from "react";
import {
  Box,
  CircularProgress,
  Slider,
  SliderThumb,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const VerticalSlider = styled(Slider)(() => ({
  "& .MuiSlider-rail": {
    backgroundColor: "#c5d7ed",
  },
  "& .MuiSlider-track": {
    backgroundColor: "#1876FF",
  },
  transform: "rotate(180deg)",
  "& .MuiSlider-thumb": {
    width: 0,
    height: 0,
    backgroundColor: "white",
    // border: "0px solid white",
  },
}));

const ProgressBar = ({ label, value, icon, inprogress }) => {
  function Thumb(props) {
    const { children, ...other } = props;
    const index = props["data-index"];
    const showProgress = Array.isArray(value)
      ? (inprogress === "industry_analysis" && index === 0) ||
        (inprogress === "icp_graph" && index === 1)
      : inprogress;
    console.log(
      label == "Collective Reports" ? { showProgress, inprogress, index } : ""
    );
    return (
      <SliderThumb {...other}>
        {children}
        <Stack
          bgcolor={"white"}
          justifyContent={"center"}
          alignItems={"center"}
          style={{ position: "relative" }}
          height={21}
          width={21}
        >
          <Box
            m={1}
            // borderRadius={"50%"}
            height={18}
            width={18}
            // border={'1px solid'}
            sx={{ transform: "rotate(180deg)" }}
            component={"img"}
            src={showProgress || inprogress == undefined ? icon : "check.png"}
          />
          {showProgress && (
            <CircularProgress
              size={21}
              sx={{ position: "absolute", top: 0, left: 0 }}
            />
          )}
        </Stack>
      </SliderThumb>
    );
  }
  return (
    <Stack
      spacing={label == "Collective Reports" ? {xs:0,md:"35px"} : "20px"}
      width={"100%"}
      alignItems="center"
    >
      <Typography
        display={label == "Collective Reports" ?{ xs: "none", md: "block" }:'block'}
        width={label == "Collective Reports" ? "100%" : "90px"}
        fontWeight={500}
        fontFamily={"poppins"}
        textTransform={"capitalize"}
        fontSize={12}
        lineHeight={label == "Collective Reports" ? "40px" : "24px"}
        align="center"
        borderBottom={
          label == "Collective Reports" ? "1px dashed #c5d7ed" : "none"
        }
        borderTop={
          label == "Collective Reports" ? "1px dashed #c5d7ed" : "none"
        }
      >
        {label}
      </Typography>

      <VerticalSlider
        slots={{ thumb: Thumb }}
        orientation="vertical"
        value={value}
        sx={{
          height: label == "Collective Reports" ? "45px" : "355px",
          "& .MuiSlider-track": {
            border:
              label == "Collective Reports" ? "2px solid #F2F8FF" : "none",
          },
        }}
      />
    </Stack>
  );
};

export default ProgressBar;
