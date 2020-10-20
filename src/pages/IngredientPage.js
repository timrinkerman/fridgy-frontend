import React, { Fragment, Component } from "react";
import Ingredients from '../containers/Ingredients'
import Favorites from '../containers/Favorites'
import Recipes from '../containers/Recipes'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import IngredientCard from '../components/IngredientCard'
import MissingIngredientCard from '../components/MissingIngredientCard'
import RecipeCard from '../components/RecipeCard'
import WantedRecipeCard from '../components/WantedRecipeCard'
class IngredientPage extends Component{
   state = {
       ingredients: [],
       recipes: [],
       missingIngredients: [],
       wholeRecipe: [],
       value: ''

       
   }
   addToFaves = (recipe) => {
    console.log(recipe)
    let ingredients = recipe.extendedIngredients.map(ingredient => ingredient.name)
    axios.post("http://localhost:3001/user_recipes", {
    title: recipe.title,
    ingredients: ingredients,
    sourceUrl: recipe.sourceUrl,
    image: recipe.image,
    user_id: this.props.user.id
  },
  { withCredentials: true }
  )
  }
   componentDidMount = () => {
       this.fetchIngredients()
   }
   
fetchIngredients = () => {
   fetch("http://localhost:3001/ingredients")
    .then(res => res.json())
    .then(ingredients => this.setIngredients(ingredients))
}
setIngredients = (ingredients) => {
    const newIngredients = ingredients.filter(ingredient => (ingredient.user_id === this.props.user.id))
    this.setState({ingredients: newIngredients})
  }

 handleClick = () => {
  console.log("hey")
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${this.state.ingredients.map(ingredient => ingredient.name).join(",+")}&number=10&apiKey=a3d1d81d14934346b6475f9c622814f0`)
    .then(res => res.json())
    .then(data => this.getWholeRecipe(data))
}     
  
getWholeRecipe(recipes){
this.setState({recipes: recipes})
recipes.map(recipe => this.setState({missingIngredients: recipe.missedIngredients}))

// Promise.all(recipes.map(recipe => 
//   fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?&apiKey=a820779a09b941cb84aff653698930e1`)
//   .then(res => res.json())
//   .then(data => this.setState({recipes: data}
//     ))))
}
displayMissingIngredients = (recipe) =>{

let names = recipe.missedIngredients.map(ingredient => ingredient.name)
let answer = window.confirm(`Do you want to add this recipe to your favorites and add ${names} to your shopping list?`)
if (answer){
this.addToShoppingList(recipe)
 }else{
console.log("this is no")
}
 }

addToShoppingList = (recipe) =>{
  console.log(recipe)
  let ingredients = recipe.missedIngredients.map(ingredient => ingredient.name)
    axios.post("http://localhost:3001/shopping_items", {
  recipe: recipe.title,
    name: ingredients,
  user_id: this.props.user.id
},
{ withCredentials: true }
)
.then(response => {if (this.props.user.id === response.data.user_id){
  this.setState({ingredients: [...this.state.ingredients, response.data]})}
})
  //console.log(ingredients)
  //let names = ingredients.map(ingredient => ingredient)
  //names.forEach(element => console.log(element))

  
}

handleReadMore = (recipe) =>{
  console.log(recipe)
// //console.log(recipe)
fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?&apiKey=a3d1d81d14934346b6475f9c622814f0`)
  .then(res => res.json())
  .then(data => this.setState({wholeRecipe: data}))
//   .then(data => this.setState({sourceUrl: data.sourceUrl}))
 }

handleDeleteIngredient = (ingredient) =>{

  let array = [...this.state.ingredients]; // make a separate copy of the array
  let index = array.indexOf(ingredient)
  array.splice(index, 1)
  this.setState({ingredients: array})


  fetch(`http://localhost:3001/ingredients/${ingredient.id}`, {
    method: 'DELETE',
    headers: {
      Accepts: 'application/json',
      'Content-type': 'application/json'
    }
    })
  }
  handleSubmit = (event) => {
    //console.log(this.state.value)
    alert(`We've added ${this.state.value} to your list`);
    event.preventDefault();
    this.addToIngredients(this.state.value)
    this.setState({ingredients: [...this.state.ingredients, this.state.value]})
    }
    
    handleChange = (event) => {
    this.setState({value: event.target.value});
    }
      

    addToIngredients = (ingredient) => {
      //console.log(ingredient)
      axios.post("http://localhost:3001/ingredients", {
      name: ingredient,
      user_id: this.props.user.id
    },
    { withCredentials: true }
    )
    .then(response => this.setState({ingredients: response.data}))}
        render(){
        //console.log(this.state)
        return(
            <div>
              <header className="header-component">
              <NavLink to="/userpage" className='home-button' ><span className="login-text"><strong>Main</strong></span></NavLink><br></br>
              <div><form onSubmit={this.handleSubmit}>
            <label>
              Ingredient:
              <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form></div>
              <div className="navigation-buttons">
              <NavLink to="/recipes" className="recipes" >Saved Recipes</NavLink><br></br>
              <NavLink to="/shoppinglist" className="shoppingList" >Shopping List</NavLink>
              </div>
              </header>
                {/* <Ingredients ingredients={this.state.ingredients} recipes={this.state.recipes} addToFaves={this.addToFaves} /> */}
              
               
               
               
               {/* <div className='card-row'> */}
               What you got!
                {this.state.ingredients.map(ingredient => 
                    <IngredientCard ingredient={ingredient} key={ingredient.id + ingredient.name} handleDeleteIngredient={this.handleDeleteIngredient}/>)}<br></br>
                      <button onClick={this.handleClick}>submit</button><br></br>
                      <div className="card-row" > 
                       {this.state.recipes.map(recipe => (<WantedRecipeCard recipe={recipe} key={recipe.id + recipe.name} wholeRecipe={this.state.wholeRecipe} handleClick={this.displayMissingIngredients} addToShoppingList={this.addToShoppingList} addToFavs={this.addToFaves} handleReadMore={this.handleReadMore}/>))}
                      
                      {/* what you need!
                      {this.state.missingIngredients.map(ingredient => 
                    (<MissingIngredientCard ingredient={ingredient} />))} */}
               </div>
           </div>
        )
    }
}


export default IngredientPage 