import React, { useState, useEffect } from 'react';
import RegistrationPage from './pages/RegistrationPage';  
import { BrowserRouter as Router, 
  Route, 
  Switch, 
  Link, 
  Redirect 
} from "react-router-dom";
import './App.css';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IngredientPage from './pages/IngredientPage';
import Favorites from './containers/Favorites';
import FavoritesPage from './pages/FavoritesPage'
import ShoppingList from './pages/ShoppingList'
import LoginComponent from './auth/LoginComponent';
import RegistrationComponent from './auth/RegistrationComponent';

const key = "4a3311546fe34804ba49b5e07d88c2e7"
const url = `https://api.spoonacular.com/recipes/findByIngredients.json?api-key=${key}`
const apiCall =  "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2"


function App () {
const [loggedInStatus, setLogIn] = useState({loggedInStatus: 'NOT_LOGGED_IN'})
const [userName, setName] = useState({}) 
const [recipes, setRecipe] = useState([])
// const loggedInStatus = state.loggedInStatus
// const userName = state.user
// const recipes = state.recipes
  // constructor(props){
  //  super(props);
 
  // this.state = {
  //   loggedInStatus: "NOT_LOGGED_IN",
  //   user: {},
  //   recipes: [], 
  //   ingredients: []
  // };}
  useEffect(() => {
  function checkLoginStatus(){
    console.log("checkLoginStatus")
    axios.get("http://localhost:3001/logged_in", { withCredentials: true})
  
    .then(response => {
      console.log(response)
      if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN"){
        //note to self this is a change from class state to hook state
        setLogIn( loggedInStatus => {
          return {loggedInStatus: "LOGGED_IN"}
        })
        setName( prevState => {
          return {user: response.data.user}
        })
        } else if (!response.data.logged_in & loggedInStatus === "LOGGED_IN"){
        //and here
        setLogIn( prevState => {
          return {loggedInStatus: "NOT_LOGGED_IN"}
        })
        setName( prevState => {
          return{}
        }) 
        
  }
  })}}, [])
  
//   componentDidMount = () =>{
//     this.checkLoginStatus()
//     this.fetchIngredients()
//   }
  
//   handleLogin = (data) => {
//     this.setState({
//       loggedInStatus: "LOGGED_IN",
//       user: data.user
//     })
//   }

//   handleLogout = () => {
//     this.setState({
//       loggedInStatus: "NOT_LOGGED_IN",
//       user: {}
//     })
//   }
  
//   fetchIngredients = () => {
//     fetch("http://localhost:3001/ingredients")
//      .then(res => res.json())
//      .then(ingredients => this.setIngredients(ingredients))
//   }
//  setIngredients = (ingredients) => {
//      const newIngredients = ingredients.filter(ingredient => (ingredient.user_id === this.state.user.id))
//      this.setState({ingredients: newIngredients})
//   }

  
  
  return (
 
    <Router>
      <Route exact path="/" render={<LoginComponent />}/>
     <RegistrationComponent /> 
  </Router>
  //<Route exact path="/" render={props => (<LoginPage {...props}  
  //   handleLogin={this.handleLogin} 
  //   handleLogout={this.handleLogout} 
  //   handleCheckLogin={this.checkLoginStatus}
  //   loggedInStatus={this.state.loggedInStatus}/>)}/>
  //   <Route exact path="/login" render={props => (<LoginPage {...props}  
  //   handleLogin={this.handleLogin} 
  //   handleLogout={this.handleLogout} 
  //   handleCheckLogin={this.checkLoginStatus}
  //   loggedInStatus={this.state.loggedInStatus}/>)}/>
    
  //   <Route exact path="/registration" render={props => (<RegistrationPage {...props} 
  //   handleLogin={this.handleLogin} 
  //   loggedInStatus={this.state.loggedInStatus}/> )} />
  //   <Route exact path="/userpage" render={props => (<UserPage {...props} ingredients={this.state.ingredients} user={this.state.user} handleCheckLogin={this.checkLoginStatus} handleLogout={this.handleLogout} />)}/>
  //   <Route exact path ="/ingredients" render={props => (<IngredientPage {...props} user={this.state.user}  handleCheckLogin={this.checkLoginStatus} handleLogout={this.handleLogout} ingredients={this.state.ingredients} />)}/>
  //   <Route exact path ="/recipes" render={props => (<FavoritesPage {...props} recipes={this.state.recipes} user={this.state.user}  handleCheckLogin={this.checkLoginStatus} handleLogout={this.handleLogout} />)}/>
  //   <Route exact path ="/shoppinglist" render={props => (<ShoppingList {...props} user={this.state.user}  handleCheckLogin={this.checkLoginStatus} handleLogout={this.handleLogout} />)}/>
  //   </Switch>
  //   </div>
  // </Router>
      );
}
  

export default App;



