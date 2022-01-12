import React, { useState } from 'react'
import getBannerImgURLs from './getBannerImgURLs';

function Banner(props){
    const [count, setCount] = useState(0);

    const banners = getBannerImgURLs();

    function changeImageP(){
        setCount(prevCount=>{
            if(prevCount+1<0){
                return banners.length - (prevCount+1)%banners.length;
            }else{
                return (prevCount+1)%banners.length;
            }
        });
    }

    function changeImageN(){
        setCount(prevCount=>{
            if(prevCount-1<0){
                return banners.length + (prevCount-1)%banners.length;
            }else{
                return (prevCount-1)%banners.length;
            }
        });
    }

    return (
        <React.Fragment>
            <img src={banners[count]} alt="img" style={{width: '100vw', height: '50vh'}}/>
            <button onClick={changeImageN}>previous</button>
            <button onClick={changeImageP}>next</button>
        </React.Fragment>
    )
}

export default Banner;