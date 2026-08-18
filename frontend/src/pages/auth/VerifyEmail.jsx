


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    verifyEmailOTP,
    resendOTP
} from "../../services/registerService";

import "./VerifyEmail.css";

export default function VerifyEmail() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [seconds, setSeconds] = useState(60);

    useEffect(() => {

        if (seconds <= 0) return;

        const timer = setTimeout(() => {

            setSeconds((prev) => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [seconds]);

    async function handleVerify(e) {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await verifyEmailOTP(
                email,
                otp
            );

            // toast.success(response.message);
            toast.success(
                " Email verified successfully!"
            );

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (err) {

            const msg =

                err.response?.data?.error ||

                "OTP verification failed.";

            setError(msg);

            toast.error(msg);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleResend() {

        try {

            const response = await resendOTP(email);

            toast.success(response.message);

            setSeconds(60);

        }

        catch (err) {

            toast.error(

                err.response?.data?.error ||

                "Unable to resend OTP."

            );

        }

    }

    return (

        <div className="verify-container">

            <div className="verify-card">

                {/* <h2>Email Verification</h2> */}
                <div
                    style={{
                        fontSize: "55px",
                        marginBottom: "10px"
                    }}
                >
                    📧
                </div>

                <h2>Email Verification</h2>

                <p>

                    Enter the OTP sent to

                </p>

                <strong>{email}</strong>

                {error && (

                    <div className="verify-error">

                        {error}

                    </div>

                )}

                <form onSubmit={handleVerify}>

                    <input
                        inputMode="numeric"
                        pattern="[0-9]*"

                        type="text"

                        placeholder="Enter 6-digit OTP"

                        value={otp}

                        maxLength={6}

                        onChange={(e)=>

                            setOtp(e.target.value)

                        }

                        required

                    />

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Verifying..."

                            :

                            "Verify Email"

                        }

                    </button>

                </form>

                {

                    seconds > 0

                    ?

                    <p className="timer">

                        Resend OTP in {seconds}s

                    </p>

                    :

                    <button

                        className="resend-btn"

                        onClick={handleResend}

                    >

                        Resend OTP

                    </button>

                }

            </div>

        </div>

    );

}

