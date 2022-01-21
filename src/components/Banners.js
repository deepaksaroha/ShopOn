import React, { useState } from 'react'
import getBannerImgURLs from './getBannerImgURLs';
import '../css/Banner.css'

function Banner(props){
    const [count, setCount] = useState(0);

    const banners = getBannerImgURLs();

    function changeImage(val){
        setCount(prevCount=>{
            if(prevCount-1<0){
                return banners.length - val*((prevCount + val)%banners.length);
            }else{
                return (prevCount + val)%banners.length;
            }
        });
    }

    return (
        <React.Fragment>
            <div className="btnbox">
                <img src={banners[count]} alt="img" style={{width: '100vw', height: '50vh'}}/>
                <button className="ban-btn btn1" onClick={()=>changeImage(-1)}>&lt;</button>
                <button className="ban-btn btn2" onClick={()=>changeImage(+1)}>&gt;</button>
            </div>
        </React.Fragment>
    )
}

export default Banner;