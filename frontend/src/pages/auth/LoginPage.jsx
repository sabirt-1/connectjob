



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { getProfile } from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

import "./LoginPage.css";

function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const data = await loginUser(
                username,
                password
            );

            localStorage.setItem(
                "access",
                data.access
            );

            console.log(
                "Access Token Saved:",
                localStorage.getItem("access")
            );

            localStorage.setItem(
                "refresh",
                data.refresh
            );

            console.log(
                "Refresh Token Saved:",
                localStorage.getItem("refresh")
            );

            const profile =
                await getProfile();
            login(profile);
            toast.success(`Welcome ${profile.username}!`);

            if (profile.role === "candidate") {

                navigate( "/candidate/dashboard" );
                // window.location.href = "/candidate/dashboard";

            } else if (profile.role === "employer") {

                navigate( "/employer/dashboard" );
                // window.location.href = "/employer/dashboard";

            } else if (profile.role === "admin") {
                navigate("/admin/dashboard");
            }

        } catch (error) {

            const data = error.response?.data;

            // Email verification required
            if (data?.verification_required) {

                toast.warning(
                    "Please verify your email first."
                );

                navigate("/verify-email", {

                    state: {

                        email: data.email

                    }

                });

                return;

            }

            const message =

                data?.error ||

                "Invalid username or password.";

            setError(message);

            toast.error(message);


        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-container">

                <div className="login-left">

                    <div className="brand-logo">

                        <div className="brand-icon">
                            JC
                        </div>

                        <h2>
                            JobConnect
                        </h2>

                    </div>

                    <h1>
                        Find Your Dream Job
                    </h1>

                    <p>
                        Join thousands of candidates and employers on JobConnect.
                    </p>

                    

                </div>

                
                <div className="login-right">

                    <div className="login-card">

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            {/* Login to continue */}
                            Sign in to continue to your JobConnect account.
                        </p>

                        <form
                            onSubmit={handleLogin}
                        >

                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                            {error && (

                                <div className="error-box">

                                    {error}

                                </div>

                            )}

                            <button
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Logging In..."
                                    : "Login"}

                            </button>

                        </form>

                        <div className="register-link">

                            Don't have an account?

                            <Link to="/register">

                                {/* Register */}
                                Create Account

                            </Link>

                        </div>

                        <div className="text-center mt-3">

                            <Link to="/forgot-password">

                                Forgot Password?

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default LoginPage;



