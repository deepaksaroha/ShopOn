import React from 'react'
import getBannerImgURLs from './getBannerImgURLs';
import '../css/Banner.css'
class Banner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            banners: getBannerImgURLs()
        }
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            this.setState({
                count: (this.state.count + 1)%this.state.banners.length
            })
        }, 4000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){

        const banners = this.state.banners;
        function ban(ind){
            if(ind === 0){
                return <img className="ban-img" src={banners[ind]} alt="img"/>
            }else if(ind === 1){
                return <img className="ban-img" src={banners[ind]} alt="img"/>
            }else{
                return <img className="ban-img" src={banners[ind]} alt="img"/>
            }
        }

        return <React.Fragment>
            <div className="btnbox">
                { ban(this.state.count) }
                {/* <img src={banners[this.state.count]} alt="img" style={{width: '100vw', height: '50vh'}}/> */}
            </div>
        </React.Fragment>
    }
}

export default Banner;