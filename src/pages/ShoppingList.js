import React, { Fragment, Component } from "react";
//import Ingredients from '../containers/Ingredients'
//import Favorites from '../containers/Favorites'
//import Recipes from '../containers/Recipes'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import MissingIngredientCard from '../components/MissingIngredientCard'
//import MissingIngredientCard from '../components/MissingIngredientCard'
//import RecipeCard from '../components/RecipeCard'
//import WantedRecipeCard from '../components/WantedRecipeCard'


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
    }

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
             <header className="header-component">
              <NavLink to="/userpage" className='home-button' ><span className="login-text"><strong>Main</strong></span></NavLink><br></br>
            <NavLink to="/ingredients" className='ingredients' className="ingredient-nav-button"  ><strong>Ingredients</strong> </NavLink><br></br>
            <NavLink to="/recipes" className="recipes" >Saved Recipes</NavLink><br></br>
            </header>
            <div><form onSubmit={this.handleSubmit}>
            <label>
              Ingredient:
              <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form></div>
        Shopping List
        <div className='card-row'>
             
        {this.state.shoppingItems.map(ingredient => (<MissingIngredientCard ingredient={ingredient} key={ingredient.id} handleDeleteIngredient={this.handleDeleteIngredient}/>))}
        </div>
        </div>
    )
}

}

export default ShoppingList