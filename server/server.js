const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const fs = require("fs");
const path = require("path");

server.use(middlewares);

const processesOrder = [
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

const planProcessesOrder = ["industry_analysis", "icp_graph"];

const getRandomDelay = () => Math.floor(Math.random() * 30000) + 30000; // Random delay between 30s and 1 min

const updateStatus = (currentStatus) => {
  for (let i = 0; i < processesOrder.length; i++) {
    const process = processesOrder[i];
    if (!currentStatus[process]) {
      currentStatus[process] = {
        status: "registered",
        timestamp: Date.now(),
        delay: null,
      };
      break;
    } else if (currentStatus[process].status === "registered") {
      currentStatus[process].status = "in_progress";
      currentStatus[process].timestamp = Date.now();
      currentStatus[process].delay = getRandomDelay();
      break;
    } else if (currentStatus[process].status === "in_progress") {
      if (
        Date.now() - currentStatus[process].timestamp >=
        currentStatus[process].delay
      ) {
        currentStatus[process].status = "completed";
        currentStatus[process].timestamp = Date.now();
        currentStatus[process].delay = null; // Clear delay after completion
      }
      break;
    } else if (currentStatus[process].status === "completed") {
      // Ensure that previous process is completed before moving to the next
      if (
        i < processesOrder.length - 1 &&
        !currentStatus[processesOrder[i + 1]]
      ) {
        currentStatus[processesOrder[i + 1]] = {
          status: "registered",
          timestamp: Date.now(),
          delay: null,
        };
      }
    }
  }
  return currentStatus;
};

const updatePlanStatus = (currentStatus) => {
  for (let i = 0; i < planProcessesOrder.length; i++) {
    const process = planProcessesOrder[i];
    if (!currentStatus[process]) {
      currentStatus[process] = {
        status: "registered",
        timestamp: Date.now(),
        delay: null,
      };
      break;
    } else if (currentStatus[process].status === "registered") {
      currentStatus[process].status = "in_progress";
      currentStatus[process].timestamp = Date.now();
      currentStatus[process].delay = getRandomDelay();
      break;
    } else if (currentStatus[process].status === "in_progress") {
      if (
        Date.now() - currentStatus[process].timestamp >=
        currentStatus[process].delay
      ) {
        currentStatus[process].status = "completed";
        currentStatus[process].timestamp = Date.now();
        currentStatus[process].delay = null; // Clear delay after completion
      }
      break;
    } else if (currentStatus[process].status === "completed") {
      // Ensure that previous process is completed before moving to the next
      if (
        i < planProcessesOrder.length - 1 &&
        !currentStatus[planProcessesOrder[i + 1]]
      ) {
        currentStatus[planProcessesOrder[i + 1]] = {
          status: "registered",
          timestamp: Date.now(),
          delay: null,
        };
      }
    }
  }
  return currentStatus;
};

server.get("/status", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const items = db.items;

  items.forEach((item) => {
    if (item.type === "product_level") {
      item.status = updateStatus(item.status);
    }
  });

  const allCompleted = items.every((item) => {
    if (item.type === "product_level") {
      return processesOrder.every(
        (process) =>
          item.status[process] && item.status[process].status === "completed"
      );
    }
    return true;
  });

  if (allCompleted) {
    items.forEach((item) => {
      if (item.type === "plan_level") {
        item.status = updatePlanStatus(item.status);
      }
    });
  }

  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

  const response = items.filter((item) => item.type !== "plan_level");
  if (allCompleted) {
    response.push(...items.filter((item) => item.type === "plan_level"));
  }

  res.json(response);
});

server.get("/reset", (req, res) => {
  const initialDb = fs.readFileSync(
    path.join(__dirname, "initial-db.json"),
    "utf-8"
  );
  fs.writeFileSync("db.json", initialDb);
  res.json({ message: "Database reset to initial state" });
});

server.use(router);

server.listen(8080, () => {
  console.log("JSON Server is running at http://localhost:8080");
});
