import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../utils";

function Login() {
    const history = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: "",
        error: null,
    });

    useEffect(() => {
        if (getUser()) {
            history("/homepage");
        }
    }, []);
    async function handleSubmit(e) {
        // setState((prev) => ({ ...prev, error: null }));
        e.preventDefault();
        try {
            const resp = await axios.post(
                "http://localhost:8081/api/auth/login",
                state
            );
            console.log(resp);
            if (resp.status === 200) {
                localStorage.setItem("token", resp.data.accessToken);
                history("/homepage");
            }
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: "invalid email or password",
            }));
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            {" "}
            <div
                style={{
                    display: "flex",
                    width: "auto",
                    height: "700px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <div class="imgcontainer">
                        {state.error && (
                            <h4 style={{ color: "red" }}>
                                invalid username or password
                            </h4>
                        )}
                    </div>

                    <div class="container">
                        <label for="uname">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name="email"
                            onChange={handleChange}
                            required
                        />

                        <label for="psw">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={handleChange}
                            required
                        />

                        <button className="button" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Login;
