import React from 'react'


const UserRecipeCard = (props) => {
   
    const {id, title, image, sourceUrl, readyInMinutes, ingredients} = props.recipe
    
    let text = ingredients.split('')
    let text2 = text.filter(letter  => letter !== "[")
    let text3 = text2.filter(letter => letter !== "]")
    let text4 = text3.filter(letter => letter !== '"')
    let final = text4.join("")
    
    
    return(
    <div className="column">
    <div className="recipe-card" key={id} >
        <div className="image">
            <img alt="2012 Toyota tundra" src={image} />
        </div>
        <div className="content">
            <div className="title-2">
                {title}
            </div>
            <div className="cooking time">
                <small>Cooking Time: {readyInMinutes} minuets</small>

            </div><br></br>
            <div className="ingredients">
            Ingredients: {final}
            </div><br></br>
            <a className="read-more" href={sourceUrl} >Read more...</a><br></br>
            <button className="delete-button" onClick={() => props.handleDelete(props.recipe)}>Delete</button>
       
        </div>
    </div>
   
</div>
    )
}
export default UserRecipeCard