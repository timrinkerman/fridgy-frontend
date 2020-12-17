import React, {Component} from 'react'
import Favorites from '../containers/Favorites'
import UserRecipeCard from '../components/UserRecipeCard'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

//this is saved Recipes
class FavoritesPage extends Component{
state ={
    recipes: []
}
componentDidMount(){
    this.getRecipes()
}
getRecipes(){
    fetch("http://localhost:3001/user_recipes")
    .then(res => res.json())
    .then(data => this.setRecipes(data))
    
}


setRecipes = (recipes) => {
    const newRecipes = recipes.filter(recipe => (recipe.user_id === this.props.user.id))
   // console.log(newRecipes)
    this.setState({recipes: newRecipes})
}
handleDelete = (recipe) => {
    console.log(this.state.recipes)
    let array = [...this.state.recipes]; // make a separate copy of the array
    let index = array.indexOf(recipe)
    array.splice(index, 1)
    this.setState({recipes: array})
  
    fetch(`http://localhost:3001/user_recipes/${recipe.id}`, {
    method: 'DELETE',
    headers: {
      Accepts: 'application/json',
      'Content-type': 'application/json'
    }
    })
  }
    render(){
   
        return(
        
            <div>
            <div className="something">
            <div className="">
              {/* <a href="" className="logo"><img className="logo" src={logo} alt=""/></a> */}
              <NavLink to="/userpage" className='home-button' ><a href="" className="logo"><img className="logo" src={logo} alt=""/></a></NavLink> 
                </div>
              <header className="header-component">
             
                <NavLink to="/" className='home-login' onClick={() => this.handleLogoutClick()}><span className="login-text"><strong>Sign Out</strong></span></NavLink><br></br>
              
              <div className="navigation-buttons">
              
              <NavLink to="/ingredients" className='ingredients' className="ingredient-nav-button">Refrigerator</NavLink>
              <NavLink to="/recipes" className="recipes" >Favorites</NavLink>
              <NavLink to="/shoppinglist" className="shoppingList" >Shopping List</NavLink>
              </div>
            
          </header><br></br>
          <hr className="header-line"/>
          </div>
      
        
        <div className="card-row">
        {this.state.recipes.map(recipe => (<UserRecipeCard recipe={recipe} key={recipe.id} handleDelete={this.handleDelete} />))}
        </div>
        </div>
        
    )
}
}
export default FavoritesPage