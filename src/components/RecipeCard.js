import React from 'react'


const Recipe = (props) => {
    const {id, title, image, sourceUrl, readyInMinutes, extendedIngredients, vegetarian, vegan, glutenFree} = props.recipe
   
    
    return(
    <div className="column">
    <>
    <div className="recipe-card" key={id} >
        <div className="image">
            <img alt="2012 Toyota tundra" src={image} /><br></br>
        </div>
        <div className="content">
            <div className="title-2">
                {title}
            </div><br></br>
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
            {`${extendedIngredients.map(ingredient => " " + ingredient.name)}`}
            </div><br></br>
            <button className="add-to-favs"onClick={() => props.handleClick(props.recipe)}>Add to my favorites</button><br></br>
            <a className="read-more" href={sourceUrl} >Read more...</a>
        </div>
    </div>
    </>
    {/* <a className="read-more" href={sourceUrl}>Read more...</a> */}
</div>
    )
}
export default Recipe