


import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            await forgotPassword(email);

            alert("OTP sent successfully.");

            navigate("/verify-reset-otp", {
                state: { email }
            });

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "Something went wrong."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="text-center mb-4">

                                Forgot Password

                            </h3>

                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email Address

                                    </label>

                                    <input

                                        type="email"

                                        className="form-control"

                                        value={email}

                                        onChange={(e) =>

                                            setEmail(e.target.value)

                                        }

                                        required

                                    />

                                </div>

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                        ?

                                        "Sending OTP..."

                                        :

                                        "Send OTP"

                                    }

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

