import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    
    // Demo mode - simulate success
    if (isLogin) {
      setMessage("Login successful!");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setIsLogin(true);
      setMessage("Signup successful. Please login.");
      setTimeout(() => setMessage(""), 3000);
    }
    
    /* Your original backend code - keep this exactly as is:
    try {
      let res;
      if (isLogin) {
        res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        login(res.data.token);
        navigate("/");
      } else {
        res = await axios.post(`${API_URL}/api/auth/signup`, { name, email, password });
        setIsLogin(true);
        setMessage("Signup successful. Please login.");
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
    */
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      padding: "32px 16px",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "600",
          marginBottom: "32px",
          color: "#333",
        }}>
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <div onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {!isLogin && (
              <div style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                border: "2px solid #e0e0e0",
                borderRadius: "25px",
                padding: "12px 20px",
                transition: "border-color 0.3s",
              }}>
                <span style={{ color: "#4fc3dc", marginRight: "12px", fontSize: "20px" }}>
                  👤
                </span>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: "16px",
                    color: "#333",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            )}

            <div style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              border: "2px solid #e0e0e0",
              borderRadius: "25px",
              padding: "12px 20px",
              transition: "border-color 0.3s",
            }}>
              <span style={{ color: "#4fc3dc", marginRight: "12px", fontSize: "20px" }}>
                👤
              </span>
              <input
                type="email"
                placeholder={isLogin ? "Username" : "Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: "16px",
                  color: "#333",
                  backgroundColor: "transparent",
                }}
              />
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              border: "2px solid #e0e0e0",
              borderRadius: "25px",
              padding: "12px 20px",
              transition: "border-color 0.3s",
            }}>
              <span style={{ color: "#4fc3dc", marginRight: "12px", fontSize: "20px" }}>
                🔒
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: "16px",
                  color: "#333",
                  backgroundColor: "transparent",
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#4fc3dc",
                color: "white",
                border: "none",
                borderRadius: "25px",
                padding: "14px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "8px",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3ab0ca"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4fc3dc"}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>

        <p style={{
          textAlign: "center",
          marginTop: "24px",
          color: "#666",
          cursor: "pointer",
        }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            style={{
              color: "#333",
              fontWeight: "600",
              textDecoration: "none",
            }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        {message && (
          <div style={{
            marginTop: "16px",
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: message.includes("successful") ? "#d4edda" : "#f8d7da",
            color: message.includes("successful") ? "#155724" : "#721c24",
            textAlign: "center",
            fontWeight: "500",
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
