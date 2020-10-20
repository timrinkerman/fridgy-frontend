import React, { Component } from "react";


const MissingIngredient = (props) => {
    const {name, recipe} = props.ingredient
    console.log(name)
    let text = name.split('')
    let text2 = text.filter(letter  => letter !== "[")
    let text3 = text2.filter(letter => letter !== "]")
    let text4 = text3.filter(letter => letter !== '"')
    let final = text4.join("")
    console.log(props)
    return(
    <div className="column">
    <div className="ui-card" >
        <div className="content">
            <div className="title">
               {recipe} needs<br></br>
                {final}
            </div>
            <button className="delete-recipe" onClick={() => props.handleDeleteIngredient(props.ingredient)}>Delete</button>
        </div>
    </div>
</div>
    )
}
export default MissingIngredient