import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useLocation } from "react-router-dom";


const PageLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, [location]);
   

    return (
        loading && (
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage:
                        "linear-gradient(135deg, #1a0059, #3508c6, #0088ff, #8e00ff)",
                    backgroundSize: "400% 400%",
                    animation: "gradientShift 10s ease infinite",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 1000000,
                    flexDirection: "column",
                }}
            >
                <ClipLoader color="#00ffd5" size={60} /> 
                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: "900",
                        background: "linear-gradient(90deg, #1a0059, #ff00c8, #00ffd5, #ff7b00)",
                        backgroundSize: "300% 300%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "zoomInText 2s ease forwards, textGradient 5s ease infinite",
                        textAlign: "center",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        transform: "scale(0)", // default scale before animation kicks in
                    }}
                >
                    ViniStore <span style={{ fontSize: "1.5rem" }}>| Client Panel</span>
                </h1>

            </div>

        )
    );
};

export default PageLoader;
