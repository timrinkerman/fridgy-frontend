import React, { Fragment } from 'react'
import Ingredient from './IngredientCard'


const UserRecipeCard = (props) => {
    const {id, title, image, sourceUrl, readyInMinutes, ingredients} = props.recipe
    //console.log(props.recipe.ingredients.map(ingredient => ingredient))
    console.log(ingredients.split(""))
    let text = ingredients.split('')
    let text2 = text.filter(letter  => letter !== "[")
    let text3 = text2.filter(letter => letter !== "]")
    let text4 = text3.filter(letter => letter !== '"')
    let final = text4.join("")
    //console.log(final)
    
    return(
    <div className="column">
    <div className="recipe-card" key={id} >
        <div className="image">
            <img alt="2012 Toyota tundra" src={image} />
        </div>
        <div className="content">
            <div className="title">
                {title}
            </div>
            <div className="cooking time">
                <small>Cooking Time: {readyInMinutes} minuets</small>

            </div><br></br>
            <div className="ingredients">
            Ingredients: {final}
            </div><br></br>
            <a className="read-more" href={sourceUrl}>Read more...</a>
            
        </div>
    </div>
    <button className="delete-recipe" onClick={() => props.handleDelete(props.recipe)}>Delete</button>
</div>
    )
}
export default UserRecipeCard