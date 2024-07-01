import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import ProgressBar from "./ProgressBar";
import useStatusQuery from "./useStatusQuery";
import { MdOutlineExpandMore } from "react-icons/md";

const ProgressTracker = () => {
  // const [status, setStatus] = useState([]);
  const status = useStatusQuery();
  const processes = [
    "product",
    "social_media",
    "product_metadata",
    "product_word_map",
    "product_external",
    "product_swot",
    "product_pest",
    "product_cem",
    "icp_segment",
    "icp_persona",
  ];
  const plan = ["industry_analysis", "icp_graph"];
  const inprogress = status?.find((el) => el?.label == "Collective Reports");

  const mappedProcesses = (
    <>
      <Typography fontFamily={"poppins"} fontWeight={500} fontSize={16}>
        Reports and Analysis
      </Typography>
      {processes.map((process, i) => (
        <Typography
          fontWeight={400}
          fontSize={12}
          textTransform={"capitalize"}
          fontFamily={"poppins"}
          key={i}
        >
          {process.replace(/_/g, " ")}
        </Typography>
      ))}
    </>
  );

  const mappedPlans = plan.map((process, i) => (
    <Typography
      fontWeight={400}
      fontSize={{ xs: 16, md: 12 }}
      textTransform={"capitalize"}
      fontFamily={"poppins"}
      key={i}
    >
      {process.replace(/_/g, " ")}
    </Typography>
  ));

  console.log(status);

  return (
    <Stack direction={"row"}>
      <Stack
        display={{ xs: "none", md: "flex" }}
        p={"30px 50px"}
        width={"320px"}
        bgcolor={"#fafbfd"}
      >
        <Stack spacing={1} direction={"row"}>
          <Box
            width={25}
            component={"img"}
            src="https://app.planyoursaas.io/assets/logo-grey-ck-6FNCH.svg"
          ></Box>
          <Box
            width={150}
            component={"img"}
            src="https://app.planyoursaas.io/assets/logo-text-CWEjBm6Z.svg"
          ></Box>
        </Stack>
      </Stack>
      <Stack p={"30px 60px"} spacing={4} width={"100%"}>
        <Typography
          fontFamily={"poppins"}
          fontWeight={600}
          fontSize={{ md: "32px", xs: 20 }}
        >
          All-in-One Industry Insights and Competitive Tracking
        </Typography>
        <Stack display={{ xs: "none", md: "flex" }} spacing={5} pb={8}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack width={"300px"} spacing={"20px"}>
              {mappedProcesses}
            </Stack>
            <Stack
              sx={{ width: "calc(100% - 300px)" }}
              justifyContent={"space-between"}
              direction="row"
            >
              {status
                ?.filter((el) => el?.label !== "Collective Reports")
                ?.map((item, i) => (
                  <ProgressBar
                    key={i}
                    label={item?.label}
                    value={item?.value}
                    icon={item?.icon}
                    inprogress={item?.inprogress}
                  />
                ))}
            </Stack>
          </Stack>
          <Stack direction={"row"}>
            <Stack width={"300px"} spacing={"20px"}>
              <Typography
                lineHeight={"40px"}
                fontFamily={"poppins"}
                fontWeight={500}
                fontSize={16}
                pb={1.5}
              >
                Comprehensive Market Insights
              </Typography>
              {mappedPlans}
            </Stack>
            <Stack flexGrow={1}>
              <ProgressBar
                label={"Collective Reports"}
                icon={"graycheck.png"}
                value={[0, 100]}
                inprogress={inprogress?.inprogress}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={2} display={{ xs: "flex", md: "none" }}>
          <Typography fontSize={12}>Products</Typography>
          <Box>
            {status
              ?.filter((el) => el.label !== "Collective Reports")
              ?.map((item, i) => (
                <Accordion
                  key={i}
                  sx={{
                    boxShadow: "none",
                    border: "1px solid gainsboro",
                    borderRadius: 1,
                    mb: 2,
                    "&::before": {
                      height: 0,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<MdOutlineExpandMore size={30} />}
                  >
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <Box
                        height={19}
                        width={19}
                        component={"img"}
                        src={"adblock.png"}
                      />
                      <Typography fontWeight={500} textTransform={"capitalize"}>
                        {item?.label}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack width={"300px"} spacing={"20px"}>
                        {mappedProcesses}
                      </Stack>
                      <Stack
                        sx={{ width: "calc(100% - 300px)" }}
                        justifyContent={"space-between"}
                        direction="row"
                      >
                        <ProgressBar
                          label={item?.label}
                          value={item?.value}
                          icon={item?.icon}
                          inprogress={item?.inprogress}
                        />
                      </Stack>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Box>
          <Typography fontSize={12}>Collective Reports</Typography>
          <Stack direction={"row"}>
            <Stack width={"300px"} spacing={"20px"}>
              {mappedPlans}
            </Stack>
            <Stack flexGrow={1}>
              <ProgressBar
                label={"Collective Reports"}
                icon={"graycheck.png"}
                value={[0, 100]}
                inprogress={inprogress?.inprogress}
              />
            </Stack>
          </Stack>
        </Stack>
        <Button
          size="large"
          sx={{
            alignSelf: "flex-end",
            textTransform: "none",
            width: { xs: "100%", sm: "200px" },
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "poppins",
            bgcolor: "#1876ff",
          }}
          variant="contained"
        >
          Go To Dashboard
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProgressTracker;
