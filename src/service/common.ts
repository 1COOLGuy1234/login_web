import React from "react";

export const queryInfo = async (infoName: string, setInfo: (value: React.SetStateAction<string>) => void) => {
    const token = localStorage.getItem("token")?.substring(7);
    if (!token) {
        alert("There is no token. Something went wrong.");
        return;
    }
    const response = await fetch("/user/getInfoByToken", {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "GET",
    });
    const data = await response.json();
    if (data["code"] !== 400) {
        setInfo(data["data"][infoName]);
    } else {
        setInfo("");
        alert("Token has expired, please refresh the page");
        localStorage.setItem("token", "");
    }
};