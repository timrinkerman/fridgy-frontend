import React, { Component } from "react";
//import Ingredients from '../containers/Ingredients'
//import Favorites from '../containers/Favorites'
//import Recipes from '../containers/Recipes'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import MissingIngredientCard from '../components/MissingIngredientCard'
//import MissingIngredientCard from '../components/MissingIngredientCard'
//import RecipeCard from '../components/RecipeCard'
//import WantedRecipeCard from '../components/WantedRecipeCard'
import logo from '../assets/logo.png'

class ShoppingList extends Component{
state={
    shoppingItems:[],
    value: ''
}

componentDidMount(){
   this.fetchShoppingList()
}

fetchShoppingList = () =>{
fetch("http://localhost:3001/shopping_items")
.then(res => res.json())
.then(data => this.setShoppingItems(data)) 
}

handleDeleteIngredient = (ingredient) =>{
  console.log(ingredient)
  let text = ingredient.name.split('')
  let text2 = text.filter(letter  => letter !== "[")
  let text3 = text2.filter(letter => letter !== "]")
  let text4 = text3.filter(letter => letter !== '"')
  let final = text4.join("")
  if(window.confirm(`Are you sure you want to delete ${ingredient.recipe} from you shopping list?`)){
    let array = [...this.state.shoppingItems]; // make a separate copy of the array
    let index = array.indexOf(ingredient)
    array.splice(index, 1)
    this.setState({shoppingItems: array})
  
  
    fetch(`http://localhost:3001/shopping_items/${ingredient.id}`, {
      method: 'DELETE',
      headers: {
        Accepts: 'application/json',
        'Content-type': 'application/json'
      }
      })
    }else{
      console.log("hey")
    }}

    setShoppingItems = (shoppingItems) => {
      const newShoppingItems = shoppingItems.filter(item => (item.user_id === this.props.user.id))
      this.setState({shoppingItems: newShoppingItems})
    }

    addToList = (ingredient) => {
        //console.log(ingredient)
        axios.post("http://localhost:3001/shopping_items", {
        name: ingredient,
        user_id: this.props.user.id
      },
      { withCredentials: true }
      )
      .then(response => {if (this.props.user.id === response.data.user_id){
        this.setState({shoppingItems: [...this.state.shoppingItems, response.data]})}
      })}
      

      handleChange = (event) => {
        this.setState({value: event.target.value});
        }

      handleSubmit = (event) => {
        //console.log(this.state.value)
        alert(`We've added ${this.state.value} to your list`);
        event.preventDefault();
        this.addToList(this.state.value)
        }


handleLogoutClick(){
  axios.delete("http://localhost:3001/logout", {withCredentials: true})
  .then(resp=>this.props.handleLogout())
  .catch(error=>console.log('logout error', error))
  
}
// sortNames = (recipes) => {
// recipes.map(recipe => this.setState({shoppingItems: [...this.state.shoppingItems, recipe.name]}))

// }

    render(){
        //console.log(this.state.shoppingItems.map(ingredient => ingredient.recipe))
    //     let names = this.state.shoppingItems.map(ingredient => ingredient.name)
    //    let text = names.map(ingredient => ingredient)
    //     let god = text.map(jesus => jesus.split(""))
    //     console.log(god)
    // let text2 = god.map(letter => letter.filter(char => char !== "["))
    // //console.log(text2)
    //  let text3 = text2.map(char => char.filter(letter => letter !== "]"))
    //  let text4 = text3.map(char => char.filter(letter => letter !== '"'))
    //  console.log(text4)   
    //  let text5 = text4.map(char => char.filter(letter => letter !== ','))
    //     let text6 = text5.map(char => char.filter(letter => letter !== ' '))
    //  let final = text6.map(char => char.join(""))
    //     console.log(final)
    // console.log(final.map(ingredient => ingredient.split(", ")))
        
        
        //names.forEach(name => console.log(name))
        return(
          <div>
          <div className="something">
          <div className="">
            <NavLink to="/userpage" className='home-button' ><a href="" className="logo"><img className="logo" src={logo} alt=""/></a></NavLink> 
              </div>
            <header className="header-component">
           
              <NavLink to="/" className='home-login' onClick={() => this.handleLogoutClick()}><span className="login-text"><strong>Sign Out</strong></span></NavLink><br></br><br></br>
              <span className="title-text"><strong>Shopping List</strong></span>
            <div className="navigation-buttons">
            
            <NavLink to="/ingredients" className='ingredients' className="ingredient-nav-button">Refrigerator</NavLink>
            <NavLink to="/recipes" className="recipes" >Favorites</NavLink>
            <NavLink to="/shoppinglist" className="shoppingList" >Shopping List</NavLink>
            </div>
          
        </header><br></br>
        <hr className="header-line"/>
        </div>
    
           
        {/* <span className="title-text"><strong>Shopping List</strong></span> */}
        <div className='card-row'>
             
        {this.state.shoppingItems.map(ingredient => (<MissingIngredientCard ingredient={ingredient} key={ingredient.id} handleDeleteIngredient={this.handleDeleteIngredient}/>))}
        </div>
        </div>
        
    )
}

}

export default ShoppingList