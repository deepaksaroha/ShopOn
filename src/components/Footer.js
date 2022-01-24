import React from 'react'

import '../css/Footer.css'

function Footer(){
    return (
        <React.Fragment>
            <div id="ftr-mrgn"></div>
            <div className="footer">
                Developed by : Deepak, &nbsp;
                {/* <span style={{color: 'red'}}>&#10084;</span> */}
                <span>Connect over: deepaksaroha@yahoo.com</span>
            </div>
        </React.Fragment>
    )
}

export default Footer;