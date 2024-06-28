import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ProgressBar from "./ProgressBar";
import axios from "axios";

const ProgressTracker = () => {
  const [status, setStatus] = useState([]);
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

  useEffect(() => {
    fetchStatus();
  }, []);

  function fetchStatus() {
    axios.get("http://localhost:8080/status").then((res) => {
      console.log(res.data);
      const data = res?.data?.map((el) => {
        const obj = {
          label: el?.name || "Collective Reports",
          value: 0,
          icon: el?.name ? "adblock.png" : "graycheck.png",
          inprogress: false,
        };
        const keys = Object.keys(el?.status);

        if (el.type == "product_level") {
          obj.inprogress = ["registered", "in_progress"].includes(
            el.status[keys[keys.length - 1]].status
          );
          obj.value = (keys.length - 1) * 11;
        } else {
          obj.inprogress = ["registered", "in_progress"].includes(
            el.status[keys[keys.length - 1]].status
          )
            ? keys[keys.length - 1]
            : "";
          obj.value = keys.map((_, i) => i * 100);
        }
        return obj;
      });
      setStatus(data);

      if (
        res?.data[res?.data.length - 1]?.type !== "plan_level" ||
        res?.data[res?.data.length - 1]?.status?.icp_graph?.status !==
          "completed"
      ) {
        new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
          fetchStatus()
        );
      }
    });
  }

  console.log(status);

  // const data = [
  //   {
  //     label: "Adblock Plus",
  //     value: 11 * 5,
  //     icon: "adblock.png",
  //   },
  //   { label: "Getadblock", value: 50, icon: "getadblock.png" },
  //   { label: "Adguard", value: 90, icon: "adgaurd.png" },
  //   { label: "Quetta", value: 30, icon: "quetta.png" },
  //   { label: "Cybird", value: 10, icon: "cybrid.png" },
  // ];

  return (
    <Stack direction={"row"}>
      <Stack p={"30px 50px"} width={"320px"} bgcolor={"#fafbfd"}>
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
        <Typography fontFamily={"poppins"} fontWeight={600} fontSize={"32px"}>
          All-in-One Industry Insights and Competitive Tracking
        </Typography>
        <Stack spacing={5} pb={8}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack width={"300px"} spacing={"20px"}>
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
              {plan.map((process, i) => (
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
            </Stack>
            <Stack
              sx={{ width: "calc(100% - 300px)" }}
              justifyContent={"space-between"}
              direction="row"
            >
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
            width: "200px",
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
