import axios from "axios";
import { useEffect, useState } from "react";

const useStatusQuery = () => {
  const [status, setStatus] = useState([]);

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

  return status;
};

export default useStatusQuery;
