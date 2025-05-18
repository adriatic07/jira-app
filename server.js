const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/jira-login", async (req, res) => {
  const { email, token, authType } = req.body;

  if (authType == "Basic Auth") {
    if (!email || !token) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  } else {
    if (!token) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  }

  const auth = Buffer.from(`${email}:${token}`).toString("base64");

  try {
    const response = await axios.get(
      `https://jaina290.atlassian.net/rest/api/3/myself`,
      {
        headers: {
          Authorization:
            authType === "Bearer Token" ? `Bearer ${token}` : `Basic ${auth}`,
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Jira login error:", err?.response?.data || err.message);
    res.status(err?.response?.status || 500).json({
      error: "Authentication failed",
      details: err?.response?.data || err.message,
    });
  }
});

app.post("/fetchItems", async (req, res) => {
  const { loggedInUser, token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }
  const baseURL = "https://jaina290.atlassian.net/rest/api/3/search";
  const auth = Buffer.from(`${loggedInUser}:${token}`).toString("base64");
  const jql = `assignee in ("Aniket Jain")`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
  };
  try {
    const response = await axios.get(`${baseURL}?jql=${jql}`, {
      headers,
    });
    res.json(response.data);
  } catch {
    console.error(
      "Unable to fetch data from JIRA:",
      err?.response?.data || err.message
    );
    res.status(err?.response?.status || 500).json({
      error: "Unable to fetch data",
      details: err?.response?.data || err.message,
    });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
