"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/components/shared/utils";

const BanglaDate = () => {
    const [date, setDate] = useState("");


    useEffect(() => {
        const updateDate = () => {
            setDate(getBanglaDate());
        };

        updateDate();

        const interval = setInterval(updateDate, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return <span>{date}</span>;


};

export default BanglaDate;
