import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HoverEffect({ 
    theme = "light", 
    children, 
    id = "", 
    customStyle = {}, 
    className = "",
    disabled = false
}) {
    var URL_name = "";

    var custom_color = "";

    if (id == "eduCard") {
        URL_name = "https://i.imgur.com/dOt7YBJ.jpeg";
        custom_color = "#F56600";   
    }
    else if (id == "msCard") {
        URL_name = "https://i.imgur.com/kn1UNUe.png";
        custom_color = "#B3A369";
    }


    const [hovered, setHovered] = useState(false);

    if (id !== "eduCard" && id !== "msCard") {
        return (

            <motion.div
                id={id}
                className={`card ${theme} ${className}`}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                initial={{ scale: 0.96 }}
                whileHover={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                    border: hovered ? "1px solid #00d5ff" : "1px solid var(--accent)",
                    background: hovered
                        ? "linear-gradient(to right top, rgba(0, 63, 122, 0.8), rgba(0, 0, 0, 0.5))"
                        : "black",
                    transition: "background 0.4s ease-in-out, border 0.4s ease-in-out",
                    position: "relative",
                    borderRadius: "12px",
                    width: "100%",
                    ...customStyle,
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hovered ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "4px",
                        backgroundColor: "#00f0ff",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                    }}
                />
    
                <div id="internal-card" className="card-info">{typeof children === "function" ? children({ hovered }) : children}</div>
            </motion.div>
        );
    }
    else {
        return (

            <motion.div
                id={id}
                className={`card ${theme} ${className}`}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                initial={{ scale: 0.96 }}
                whileHover={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                    boxShadow: hovered ? "0 0 20px 4px rgba(109, 194, 255, 0.5)" : "none",
                    transition: "background 0.4s ease-in-out, box-shadow 0.3s ease",
                    position: "relative",
                    borderRadius: "12px",
                    ...customStyle,
                    background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))," + "url(" + URL_name + ")", 
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                    width: "100%",
                    border: "1px solid white"
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hovered ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "5px",
                        backgroundColor: custom_color,
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                    }}
                />
                <div className="card-info">{children}</div>

            </motion.div>
        );
    }

    
}
