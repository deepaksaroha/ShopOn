import React from "react";
import '../css/Sort.css'

function Sort(props){

    function handleChangeSort(e){
        props.handleChangeSort(e.target.value);
    }

    return(
        <React.Fragment>
            <div className="sort-options-box">
                <h5>SORT</h5>
                <input id="low-to-high" type="radio" name="sort_option" value="true" onChange={handleChangeSort}/>
                <label htmlFor="low-to-high">Low to High</label><br/>
                <input id="high-to-low" type="radio" name="sort_option" value="false" onChange={handleChangeSort}/>
                <label htmlFor="high-to-low">High to Low</label>
            </div>
        </React.Fragment>
    )
}

export default Sort;