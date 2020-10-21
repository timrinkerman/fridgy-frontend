import React, { Component, useState } from 'react'
import Modal from '../modal'
import Ingredients from '../containers/Ingredients'

//change to class component 
const WantedRecipeCard = (props) => {
// state={
//     wholeRecipe: []
// }
    const [isOpen, setIsOpen] = useState(false)
            let names = props.recipe.missedIngredients.map(ingredient => ingredient.name).join(", ")
            let have = props.recipe.usedIngredients.map(ingredient => ingredient.name).join(", ")
            return(
    <div className="column">
    <div className="recipe-card" key={props.id} >
        <div className="image">
            <img alt="2012 Toyota tundra" src={props.recipe.image} />
        </div>
        <div className="content">
            <div className="title">
                {props.recipe.title}
            </div>
            <div className="needed-ingredients">
                <small>Missing Ingredients: {names} </small>
            </div><br></br>
            <small>Ingredients on hand: {have}</small>
            <div className="ingredients">
            {/* {extendedIngredients.map(ingredient => console.log(ingredient))} */}
            </div><br></br>
            <button onClick={() => {setIsOpen(true); props.handleReadMore(props.recipe)} } >OPen Modal</button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <p>{props.recipe.title}</p>
        <p>You still need:</p>
        <p>{names}</p>
        <button onClick={() => props.addToShoppingList(props.recipe)}>add these ingredients to my shopping list</button><br></br> 
        <button onClick={() => props.addToFavs(props.wholeRecipe)}>add this recipe to my favorites</button> <br></br>
        <a href={props.wholeRecipe.sourceUrl}>Read more</a>
    </Modal>
        </div>
    </div>
  
</div>
    
 
    )
}


export default WantedRecipeCard