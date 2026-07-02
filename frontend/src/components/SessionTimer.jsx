// SessionTimer.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SessionTimer = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("Token");

        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const timeLeft = payload.exp * 1000 - Date.now();
        if (timeLeft <= 0) {
            sessionStorage.removeItem("Token");
            navigate("/login");
            return;
        }

        const timer = setTimeout(() => {
            sessionStorage.removeItem("Token");
            toast.success("Session expired");
            navigate("/login");
        }, timeLeft);

        return () => clearTimeout(timer);
    }, [navigate]);

    return null;
};

export default SessionTimer;