import React, { Component } from "react";
import RecipeCard from '../components/RecipeCard'

class Recipes extends Component{
    render(){
        const recipes = this.props.recipes

        return(
            
            <div className='recipe'>
            <h2 className='random'>
                {/* **Hot Recipes** */}
            </h2>
            <div className='card-row'>
                {recipes.map(recipe => 
                    (<RecipeCard recipe={recipe} key={recipe.id} handleClick={this.props.addToFaves}/>))}
                    {/* recipe card for veg */}
            </div>
        </div>
            )
    }
}


export default Recipes 