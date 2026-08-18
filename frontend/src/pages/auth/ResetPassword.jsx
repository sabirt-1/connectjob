


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../../services/authService";

export default function ResetPassword() {

    const navigate = useNavigate();

    const location = useLocation();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        // Save token in sessionStorage
        if (location.state?.resetToken) {

            sessionStorage.setItem(
                "resetToken",
                location.state.resetToken
            );

        }

    }, [location]);

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        const token = sessionStorage.getItem("resetToken");

        if (!token) {

            setError("Reset session expired.");

            return;

        }

        setLoading(true);

        try {

            await resetPassword(

                token,

                password,

                confirmPassword

            );

            sessionStorage.removeItem("resetToken");

            alert("Password changed successfully.");

            navigate("/login");

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "Unable to reset password."

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

                                Reset Password

                            </h3>

                            {

                                error &&

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>

                                        New Password

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        value={password}

                                        onChange={(e)=>

                                            setPassword(e.target.value)

                                        }

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Confirm Password

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        value={confirmPassword}

                                        onChange={(e)=>

                                            setConfirmPassword(e.target.value)

                                        }

                                        required

                                    />

                                </div>

                                <button

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                        ?

                                        "Updating..."

                                        :

                                        "Reset Password"

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

