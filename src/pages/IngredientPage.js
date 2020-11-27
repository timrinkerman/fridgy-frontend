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
import logo from '../assets/logo.png'
class IngredientPage extends Component{
  constructor(props){
    super(props)
  
  this.state = {
       ingredients: [],
       recipes: [],
       missingIngredients: [],
       wholeRecipe: [],
       value: ''

  }     
   }
   addToFaves = (recipe) => {
    console.log(recipe)
    window.alert(`${recipe.title} has been added to your favorites!`)
    let ingredients = recipe.extendedIngredients.map(ingredient => ingredient.name)
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
  }
   componentDidMount(){
    console.log("hey from ingredients")  
    this.props.handleCheckLogin()
    this.fetchIngredients()
    this.setState({ingredients: this.props.ingredients})
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
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${this.state.ingredients.map(ingredient => ingredient.name).join(",+")}&number=10&apiKey=6b82bd43bd3f47b7b66398a4e4c11249`)
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

 handleLogoutClick(){
  axios.delete("http://localhost:3001/logout", {withCredentials: true})
  .then(resp=>this.props.handleLogout())
  .catch(error=>console.log('logout error', error))
  
}
addToShoppingList = (recipe) =>{
  console.log(recipe)
  window.alert(`${recipe.title}'s missing ingredients have been added to your shopping list!`)
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
  
fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?&apiKey=6b82bd43bd3f47b7b66398a4e4c11249`)
  .then(res => res.json())
  .then(data => this.setState({wholeRecipe: data}))

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
        
    
    handleIngredientClick = (ingredient) => {
      console.log(ingredient)
      fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient.name}&number=10&apiKey=6b82bd43bd3f47b7b66398a4e4c11249`)
        .then(res => res.json())
        .then(data => this.getWholeRecipe(data))
     }     
    
    render(){
        //console.log(this.state)
        return(
            
          <div className="container">
          <div className="">
          <NavLink to="/userpage" className='home-button' ><a href="" className="logo"><img className="logo" src={logo} alt=""/></a></NavLink> 
                
              </div>
            <header className="header-component">
           
              <NavLink to="/" className='home-login' onClick={() => this.handleLogoutClick()}><span className="login-text"><strong>Sign Out</strong></span></NavLink><br></br>
            
              <div className="add-ingredient"><form className="" onSubmit={this.handleSubmit}>
                <label className="ingredient-input">
                  Ingredient:
                  <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
              </div>
                <div className="navigation-buttons">
                <NavLink to="/ingredients" className='ingredients' className="ingredient-nav-button">Refrigerator</NavLink>
                <NavLink to="/recipes" className="recipes" >Favorites</NavLink>
                <NavLink to="/shoppinglist" className="shoppingList" >Shopping List</NavLink>
                </div>
                </header><br></br>
                <hr className="header-line"/>
                {/* </div> */}
     
              
                <p className="title-text">What's in the fridge</p>
               <div className='wrapper-2'>
               
                {this.state.ingredients.map(ingredient => 
                    <IngredientCard ingredient={ingredient} key={ingredient.id + ingredient.name} handleDeleteIngredient={this.handleDeleteIngredient} handleClick={this.handleIngredientClick} />)}<br></br>
                      <button className="home-login" onClick={this.handleClick}>Search all</button>
                      </div><br></br>
                      <div className="card-row" > 
                       {this.state.recipes.map(recipe => (<WantedRecipeCard recipe={recipe} key={recipe.id + recipe.name} wholeRecipe={this.state.wholeRecipe} handleClick={this.displayMissingIngredients} addToShoppingList={this.addToShoppingList} addToFavs={this.addToFaves} handleReadMore={this.handleReadMore}/>))}
                       </div>
                     
              
           </div>
           
           
        )
    }
}


export default IngredientPage 