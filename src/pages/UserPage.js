import React, { Fragment, PureComponent } from "react";
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios';
import Recipes from '../containers/Recipes'

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
 

}


 componentDidMount(){
  
  this.props.handleCheckLogin()
  //window.location.reload(false)
  // this.fetchRandom()
  //   this.fetchVeg()
  //   this.fetchGlutenFree()
    //this.refreshPage()
    // this.fetchIngredients()
}


refreshPage = () => {
  //window.location.reload(false);
}

// fetchRandom = () => {
  
//   fetch("https://api.spoonacular.com/recipes/random?number=5&apiKey=6b82bd43bd3f47b7b66398a4e4c11249")
//     .then(res => res.json())
//     .then(data => this.setState({recipes: data.recipes}))
// }

// fetchVeg = () =>{

//   fetch("https://api.spoonacular.com/recipes/random?number=5&tags=vegetarian&apiKey=6b82bd43bd3f47b7b66398a4e4c11249")
//   .then(res => res.json())
//   .then(data => this.setState({vegRecipes: data.recipes}))
//  }

// fetchGlutenFree = () =>{
  
//   fetch("https://api.spoonacular.com/recipes/random?number=5&tags=vegan&apiKey=6b82bd43bd3f47b7b66398a4e4c11249")
//   .then(res => res.json())
//   .then(data => this.setState({glutenFree: data.recipes}))
// }

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

  
  return(
  
    <Fragment>
      <div className="container" onMouseMove={() => this.refreshPage()}>
      <div className="">
        <a href="" className="logo"><img className="logo" src={logo} alt=""/></a>
            
          </div>
        <header className="header-component">
       
          <NavLink to="/" className='home-login' onClick={() => this.handleLogoutClick()}><span className="login-text"><strong>Sign Out</strong></span></NavLink><br></br>
        
          <div className="add-ingredient"><form className="" onSubmit={this.handleSubmit}>
            <label className="ingredient-input">
              Add to your refrigerator:
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
        </div>
    
    <p className="title-text">Spotlight</p>
    <div className="card-row" >
      
    <Recipes addToFaves={this.addToFaves} recipes={this.state.recipes}/>

  </div>
  <p className="title-text">Vegetarian</p>
  <div className="card-row">
   
  <Recipes addToFaves={this.addToFaves} recipes={this.state.vegRecipes}/>
    </div>
    <p className="title-text">Vegan</p>
    <div className="card-row">
    
    <Recipes addToFaves={this.addToFaves} recipes={this.state.glutenFree}/>
    </div>
    
  </Fragment>
  )
}

}

export default MainPage