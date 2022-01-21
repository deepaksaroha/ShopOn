import React, { useState } from 'react'
import getBannerImgURLs from './getBannerImgURLs';
import '../css/Banner.css'

function Banner(props){
    const [count, setCount] = useState(0);

    const banners = getBannerImgURLs();

    setTimeout(()=>{
        setCount((count + 1)%3);
    }, 4000);
    
    return (
        <React.Fragment>
            <div className="btnbox">
                <img src={banners[count]} alt="img" style={{width: '100vw', height: '50vh'}}/>
            </div>
        </React.Fragment>
    )
}

export default Banner;