



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser }

from "../../services/registerService";

import "./RegisterPage.css";


function RegisterPage() {

    const navigate = useNavigate();

    const [role, setRole] =
        useState("candidate");

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleRegister =
        async (e) => {

        e.preventDefault();

        try {

            await registerUser({

                username,
                email,
                password,
                phone,
                role

            });

            // alert(
            //     "Registration Successful"
            // );
            toast.success("Registration Successful. Please verify your email.");

            // navigate("/login");
            navigate("/verify-email", {

                state: {

                    email

                }

            });

        } catch (error) {

            const usernameError =
                error.response?.data?.username?.[0];

            if (usernameError) {

                alert(usernameError);

            } else {

                // alert("Registration Failed");
                toast.error("Registration Failed");

            }

            console.log(error.response?.data);

        }

    };

    return (

        <div className="register-page">

            <div className="register-container">

                <div className="register-left">

                    <div className="brand-logo">

                        <div className="brand-icon">
                            JC
                        </div>

                        <h2>
                            JobConnect
                        </h2>

                    </div>

                    <h1>
                        Build Your Career
                    </h1>

                    <p>
                        Join thousands of candidates and employers using JobConnect.
                    </p>


                </div>

                <div className="register-right">

                    <div className="register-card">

                        {/* KEEP EVERYTHING YOU ALREADY HAVE HERE */}
                        <div className="register-page">

                            <div className="register-card">

                                <h1>
                                    Create Account
                                </h1>

                                <div className="role-toggle">

                                    <button
                                        type="button"
                                        className={
                                            role === "candidate"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setRole(
                                                "candidate"
                                            )
                                        }
                                    >
                                        Candidate
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            role === "employer"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setRole(
                                                "employer"
                                            )
                                        }
                                    >
                                        Employer
                                    </button>

                                </div>

                                <form
                                    onSubmit={
                                        handleRegister
                                    }
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
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(
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

                                    <button
                                        type="submit"
                                    >
                                        Register
                                    </button>

                                </form>

                            </div>

                        </div>



                    </div>

                </div>

            </div>

        </div>

        

    );

}

export default RegisterPage;















