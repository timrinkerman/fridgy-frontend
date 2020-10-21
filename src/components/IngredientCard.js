import React, { Component } from "react";


const Ingredient = (props) => {
    const {name} = props.ingredient
    //console.log(props, "something")
    return(
    <div className="column">
    <div className="ui-card" >
        <div className="content">
            <div className="title">
                {name}
            </div>
           
            
        </div>
    </div>
    <button className='ingredient-delete-btn' onClick={() => props.handleDeleteIngredient(props.ingredient)}>delete ingredient</button><br></br>
</div>
    )
}
export default Ingredient