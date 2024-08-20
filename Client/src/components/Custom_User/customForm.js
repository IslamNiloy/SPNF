import React, {useEffect} from "react";
import './customForm.css';

const CustomUser = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src='https://js.hsforms.net/forms/embed/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @TS-ignore
            if (window.hbspt) {
                // @TS-ignore
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: "47070065",
                    formId: "65d4dfb8-f308-4ed5-af8d-2e00a33ab64b",
                    target: '#hubspotForm'
                })
            }
        });
    }, []);

    return (
        <div className="hubspotForm_main">
            <div id="hubspotForm"></div>
        </div>
    );

}

export default CustomUser;