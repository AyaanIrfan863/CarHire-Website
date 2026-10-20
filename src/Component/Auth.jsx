import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Mail, Lock, User, Eye, EyeOff, Car } from "lucide-react";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const fullName = formData.get("name")?.trim() || "";

    try {
      if (isLogin) {
        // ===== LOGIN =====
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Login successful! Redirecting...");
        setIsError(false);
        setTimeout(() => navigate("/"), 800);
      } else {
        // ===== SIGNUP =====
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        // Profile table mein entry karo
        if (data.user) {
          await supabase.from("profiles").insert([
            {
              id: data.user.id,
              full_name: fullName,
            },
          ]);
        }

        setMessage("Account created! Redirecting...");
        setIsError(false);
        setTimeout(() => navigate("/"), 800);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setIsError(true);
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        {/* ===== Left Side: Branding ===== */}
        <div className="auth-branding">
         
          
            <span>Car Hire</span>
          
          <h2>{isLogin ? "Welcome Back!" : "Join Us Today"}</h2>
          <p>
            {isLogin
              ? "Log in to book premium cars with ease."
              : "Create an account and book your dream car today."}
          </p>
          <ul className="brand-features">
            <li>✓ 500+ Premium Cars Available</li>
            <li>✓ 24/7 Customer Support</li>
            <li>✓ Best Price Guarantee</li>
          </ul>
        </div>

       
        <div className="auth-form-wrapper">
          <div className="auth-toggle">
            <button
              type="button"
              className={isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(true);
                setMessage(null);
              }}
            >
              LOGIN
            </button>
            <button
              type="button"
              className={!isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(false);
                setMessage(null);
              }}
            >
              SIGN UP
            </button>
          </div>

          <h1>{isLogin ? "Login to Your Account" : "Create New Account"}</h1>
          <p className="auth-subtitle">
            {isLogin
              ? "Enter your credentials to continue"
              : "Fill in the details below to get started"}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}

            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 6 characters)"
                minLength="6"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading
                ? "PLEASE WAIT..."
                : isLogin
                ? "LOGIN"
                : "CREATE ACCOUNT"}
            </button>

            {message && (
              <p className={`form-message ${isError ? "error" : "success"}`}>
                {message}
              </p>
            )}
          </form>

          <p className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage(null);
              }}
            >
              {isLogin ? "Sign up here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;