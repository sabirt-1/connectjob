


import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { verifyResetOTP } from "../../services/authService";

export default function VerifyResetOTP() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await verifyResetOTP(
                email,
                otp
            );

            navigate("/reset-password", {
                state: {
                    resetToken: response.reset_token
                }
            });

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "OTP Verification Failed."

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

                                Verify OTP

                            </h3>

                            <p className="text-center">

                                OTP sent to

                                <br />

                                <strong>{email}</strong>

                            </p>

                            {

                                error &&

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>

                                        Enter OTP

                                    </label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        maxLength={6}

                                        value={otp}

                                        onChange={(e)=>

                                            setOtp(e.target.value)

                                        }

                                        required

                                    />

                                </div>

                                <button

                                    className="btn btn-success w-100"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                        ?

                                        "Verifying..."

                                        :

                                        "Verify OTP"

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

