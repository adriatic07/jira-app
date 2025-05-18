import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedInUser, userToken } from "../utils/userSlice";

const JiraLogin = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [authType, setAuthType] = useState("Basic Auth");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  const redirect = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/jira-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setUserInfo(data);
      dispatch(loggedInUser(data));
      dispatch(userToken(token));
      setError("");
      redirect("/landing");
    } catch (err) {
      console.error(err);
      setUserInfo(null);
      setError("Login failed. Check credentials and domain.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Jira Login</h2>
      <form onSubmit={handleLogin}>
        {/* <input
          type="text"
          placeholder="Domain (e.g. yourcompany.atlassian.net)"
          //value={domain}
          //onChange={(e) => setDomain(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        /> */}
        <select
          onChange={(e) => setAuthType(e.target.value)}
          style={{ width: "100%", height: "20px", marginBottom: 10 }}
        >
          <option>Basic Auth</option>
          <option>Bearer Token</option>
        </select>
        {authType === "Basic Auth" ? (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "495px", marginBottom: 10 }}
          />
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="Personal Access Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
          style={{ width: "495px", marginBottom: 10 }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userInfo && (
        <div style={{ marginTop: 20 }}>
          <h3>User Info</h3>
          <p>
            <strong>Name:</strong> {userInfo.displayName}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.emailAddress}
          </p>
          <p>
            <strong>Account ID:</strong> {userInfo.accountId}
          </p>
        </div>
      )}
    </div>
  );
};

export default JiraLogin;
