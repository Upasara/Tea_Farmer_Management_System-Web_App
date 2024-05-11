import React, { useState } from "react";
import "../assets/css/home.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/icomoon.css";
import { AuthService } from "../servises/AuthService";
import {useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
    const initialState = { email: "", password: "" };
    const [userData, setUserData] = useState(initialState);
    const [disabledBtn, setDesableBtn] = useState<boolean>(false);
    const submitLogin = () => {
        console.log(userData.email)
        if (!userData.email) {
            toast.error("Please enter user email!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        }
        if (!userData.password) {
            toast.error("Please enter user password!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else {
            AuthService.userLogin(userData.email, userData.password)
                .then((res) => {
                    if (res.user) {
                        console.log(res.user)
                        AuthService.setToken(res.user.refreshToken);
                        const token = AuthService.getToken();
                        if (token) {
                            console.log(res.user.email)
                            AuthService.getUserFromEmail(res.user.email as string).then((res) => {
                                const userData: any = res
                                console.log(userData)
                                console.log(userData.role)
                                if (userData) {
                                    console.log(userData.role)
                                    if (userData.role === "ADMIN") {
                                        window.location.href = "/dashboard";
                                    } else {
                                        toast.error("Invalid User Role!", {
                                            position: toast.POSITION.BOTTOM_RIGHT,
                                            className: "foo-bar",
                                        });
                                    }
                                } else {
                                    toast.error("Some Error!", {
                                        position: toast.POSITION.BOTTOM_RIGHT,
                                        className: "foo-bar",
                                    });
                                }
                            });
                        }
                        setDesableBtn(false)
                    } else {
                        toast.error("Please verify your account!", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            className: "foo-bar",
                        });
                    }
                })
        }
    };






    return (
        <div id="main-wrapper" className="main-wrapper">
            <section className="account-page-area section-gap-equal">
                <div className="container position-relative">
                    <div className="row g-5 justify-content-center">
                        <div className="col-lg-5">
                            <div className="login-form-box">
                                <h3 className="title mt-30">Sign in</h3>
                                <div className="form-group mt-30">
                                    <label >Email*</label>
                                    <input type="email" name="current-log-email"
                                        placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                </div>
                                <div className="form-group mt-30">
                                    <label >Password*</label>
                                    <input type="password" name="current-log-password"
                                        placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                </div>
                                <div className="form-group mt-30 mb-30">
                                    <button type="button" className="edu-btn btn-medium mt-10" onClick={submitLogin}>Sign in <i
                                        className="icon-4"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
