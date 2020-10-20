// import React, { Component } from "react";
// import IngredientCard from '../components/IngredientCard'
// import Recipe from "../components/RecipeCard";
// import IngredientPage from "../pages/IngredientPage";
// import RecipeCard from "../components/RecipeCard"
// class Ingredients extends Component{
  
//   state={
//     recipes: [],
//     missingIngredients: []
//   } 
//   // componentDidMount = () => {
//   //   // console.log(this.props)
//   //  this.fetchByIngredients()
//   //   }
   
//    handleClick = () => {
//     fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${this.props.ingredients.map(ingredient => ingredient.name).join(",+")}&number=4&apiKey=a820779a09b941cb84aff653698930e1`)
//       .then(res => res.json())
//       .then(data => this.getWholeRecipe(data))
//   }     
    
//  getWholeRecipe(recipes){
//   recipes.map(recipe => this.setState({missingIngredients: recipe.missedIngredients}))
  
//   // Promise.all(recipes.map(recipe => 
//   //   fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?&apiKey=a820779a09b941cb84aff653698930e1`)
//   //   .then(res => res.json())
//   //   .then(data => this.setState({recipes: data}
//   //     ))))
//  }
//    render(){
//         console.log(this.props.recipes)
//         //console.log(this.props.ingredients.map(ingredient => ingredient.name).join(",+"))
//         return(
//             <div>
//                 What you got:
                 
//                   {/* look at the return data and naming conventions for missing ingredinets and get them to render onto an ingredient card*/}
//                   {this.props.ingredients.map(ingredient => 
//                     (<IngredientCard ingredient={ingredient} key={ingredient.id}/>))}
//                     <button onClick={this.handleClick}>submit</button>
//                     //
                   
//                     {this.state.missingIngredients.map(ingredient => 
//                     (<IngredientCard missingIngredient={ingredient} />))}
//            </div>
//         )
//     }
// }


// export default Ingredients 