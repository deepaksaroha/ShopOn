import React from "react";

function Sort(props){

    function handleChangeSort(e){
        props.handleChangeSort(e.target.value);
    }

    return(
        <React.Fragment>
            <div className="sort-options-box">
                <input id="low-to-high" type="radio" name="sort_option" value="true" onChange={handleChangeSort}/>
                <label htmlFor="low-to-high">Low to High</label>
                <input id="high-to-low" type="radio" name="sort_option" value="false" onChange={handleChangeSort}/>
                <label htmlFor="high-to-low">High to Low</label>
            </div>
        </React.Fragment>
    )
}

export default Sort;