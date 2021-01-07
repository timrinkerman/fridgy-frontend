import React, { Component } from "react";


const Ingredient = (props) => {
    const {name} = props.ingredient
   
    return(
    
    <div className="wrapper" >
        <div className="content">
            <div className="title">
                {name}
            </div>
           
            
        </div>
    
    <button className='read-more' onClick={() => props.handleClick(props.ingredient)}>search ingredient</button><br></br>
    <button className='read-more' onClick={() => props.handleDeleteIngredient(props.ingredient)}>delete ingredient</button><br></br>
</div>
    )
}
export default Ingredient