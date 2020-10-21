import React, { Fragment, PureComponent } from "react";
import Ingredients from '../containers/Ingredients'
import Favorites from '../containers/Favorites'
import Recipes from '../containers/Recipes'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import IngredientPage from "../pages/IngredientPage"
import Recipe from "../components/RecipeCard";

const key = process.env.REACT_APP_API_KEY
const unirest = require('unirest')
const url = `https://api.spoonacular.com/recipes/findByIngredients.json?api-key=${key}`

let requestString= "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com" 

class MainPage extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {value: '',
    recipes: [],
    vegRecipes: [],
    glutenFree: [],
    userRecipes: [],
  };
 
// this.handleChange = this.handleChange.bind(this);
// this.handleSubmit = this.handleSubmit.bind(this);
}


 componentDidMount(){
  console.log(this.props.user)  
  
  this.fetchRandom()
    this.fetchVeg()
    this.fetchGlutenFree()
    // this.fetchIngredients()
}

fetchRandom = () => {
  console.log("hey")
  fetch("https://api.spoonacular.com/recipes/random?number=5&apiKey=a3d1d81d14934346b6475f9c622814f0")
    .then(res => res.json())
    .then(data => this.setState({recipes: data.recipes}))
}

fetchVeg = () =>{
  console.log("hey")
  fetch("https://api.spoonacular.com/recipes/random?number=5&tags=vegetarian&apiKey=a3d1d81d14934346b6475f9c622814f0")
  .then(res => res.json())
  .then(data => this.setState({vegRecipes: data.recipes}))
 }

fetchGlutenFree = () =>{
  console.log("hey")
  fetch("https://api.spoonacular.com/recipes/random?number=5&tags=Gluten Free&apiKey=a3d1d81d14934346b6475f9c622814f0")
  .then(res => res.json())
  .then(data => this.setState({glutenFree: data.recipes}))
}

addToIngredients = (ingredient) => {
  console.log(this.props.user)
  axios.post("http://localhost:3001/ingredients", {
  name: ingredient,
  user_id: this.props.user.id
},
{ withCredentials: true }
)
.then(response => {if (this.props.user.id === response.data.user_id){
  this.setState({ingredients: [...this.state.ingredients, response.data]})}
})}


// setIngredients = (ingredients) => {
//   const newIngredients = ingredients.filter(ingredient => (ingredient.user_id === this.props.user.id))
//   this.setState({ingredients: newIngredients})
// }


addToFaves = (recipe) => {
  console.log(recipe)
  let ingredients = recipe.extendedIngredients.map(ingredient => ingredient.name)
  if(window.confirm(`Would you like to add ${recipe.title} to your favorites list?`)){
  if(!this.state.userRecipes.includes(recipe)){
  axios.post("http://localhost:3001/user_recipes", {
  title: recipe.title,
  ingredients: ingredients,
  readyInMinutes: recipe.readyInMinutes,
  sourceUrl: recipe.sourceUrl,
  image: recipe.image,
  user_id: this.props.user.id
},
{ withCredentials: true }
)
.then(response => {if (this.props.user.id === response.data.user_id){
  this.setState({userRecipes: [...this.state.userRecipes, response.data]})}
})
}}else{
  console.log("hey")
}
}





handleLogoutClick(){
  axios.delete("http://localhost:3001/logout", {withCredentials: true})
  .then(resp=>this.props.handleLogout())
  .catch(error=>console.log('logout error', error))
  
}



handleChange = (event) =>{

this.setState({value: event.target.value});
}

handleSubmit = (event) =>{
console.log(this.state.value)
alert(`We've added ${this.state.value} to your list`);
event.preventDefault();
this.addToIngredients(this.state.value)
}


render(){
  //console.log(this.props.user)

  //console.log(this.props.ingredients)
  
  return(
    
    <Fragment>
      <div className="wrapper">
      
        <header className="header-component">
          <NavLink to="/" className='home-login' onClick={() => this.handleLogoutClick()}><span className="login-text"><strong>Sign Out</strong></span></NavLink><br></br>
          <div className="fridgy-text">Fridgy</div>
          <div><form onSubmit={this.handleSubmit}>
            <label>
              Ingredient:
              <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form></div>
            <div className="navigation-buttons">
            <NavLink to="/ingredients" className='ingredients' className="ingredient-nav-button"  >Ingredients</NavLink>
            <NavLink to="/recipes" className="recipes" >Favorites</NavLink>
            <NavLink to="/shoppinglist" className="shoppingList" >Shopping List</NavLink>
            </div>
          
        </header><br></br>
        <hr className="header-line"/>
        </div>
    
    <p>Spotlight</p>
    <div className="card-row" >
      
    <Recipes addToFaves={this.addToFaves} recipes={this.state.recipes}/>

  </div>
  <div className="card-row">
    Vegetarian
  <Recipes addToFaves={this.addToFaves} recipes={this.state.vegRecipes}/>
    </div>
    <div className="card-row">
    Vegan
    <Recipes addToFaves={this.addToFaves} recipes={this.state.glutenFree}/>
    </div>
    {/* </div> */}
  </Fragment>
  )
}

}

export default MainPage