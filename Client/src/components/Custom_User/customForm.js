import React, { useEffect } from "react";
import './customForm.css';

const CustomUser = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id='hubspotMeeting'>
               <h2 style={{display: "flex", margin: "0 auto", justifyContent: "center", "marginBottom": "20px", marginTop: "20px"}}>Custom Plan <span className="highlight"> &nbsp;Meeting</span></h2>
            <div
                className="meetings-iframe-container"
                data-src="https://meetings-eu1.hubspot.com/tonmoy/spnf?embed=true"
            ></div>
        </div>
    );

}

export default CustomUser;