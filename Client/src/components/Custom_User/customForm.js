import React, { useEffect } from "react";
import './customForm.css';

const CustomUser = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @TS-ignore
            if (window.hbspt) {
                // @TS-ignore
                window.hbspt.forms.create({
                    region: "eu1",
                    portalId: "26291308",
                    formId: "2d161d8c-dbf4-45af-849a-38928baf6b06",
                    target: '#hubspotForm'
                })
            }
        });
    }, []);

    return (
        <div className="hubspotForm_main">
            <h2 className="workflow-title">Get <span>Custom Subscription</span></h2>
            <p>Please submit this form for custom package, one of our team member will reach out to you ASAP</p>
            <div id="hubspotForm"></div>
        </div>
    );

}

export default CustomUser;