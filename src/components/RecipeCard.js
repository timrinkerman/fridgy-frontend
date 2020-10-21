import React, { Fragment } from 'react'
import Ingredients from '../containers/Ingredients'

const Recipe = (props) => {
    const {id, title, image, sourceUrl, readyInMinutes, extendedIngredients, vegetarian, vegan, glutenFree} = props.recipe
    //console.log(props.recipe)
    //console.log(vegetarian)
    return(
    <div className="column">
    <>
    <div className="recipe-card" key={id} onClick={() => props.handleClick(props.recipe)}>
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
            <div className="vegitarian">
            Vegetarian?: 
            {vegetarian ? "Yes" : "No"}
            </div>
            <div className="vegitarian">
            Vegan?: 
            {vegan ? "Yes" : "No"}
            </div>
            <div className="vegitarian">
            Gluten Free?: 
            {glutenFree ? "Yes" : "No"}
            </div>
            <div className="ingredients">
            Ingredients:
            {`${extendedIngredients.map(ingredient => ingredient.name)}, `}
            </div><br></br>
        </div>
    </div>
    </>
    <a className="read-more" href={sourceUrl}>Read more...</a>
</div>
    )
}
export default Recipe