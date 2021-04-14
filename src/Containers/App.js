import React, {Component} from "react";
import CardList from "../Components/CardList";
//import { robots } from '../robots'; //- using API to impor the data
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import './App.css';

//parent component
class App extends Component{ //smart component
    constructor(){
        super()
        this.state = {
            robots: [],
            searchField: '',
        }
    }

    componentDidMount(){ // using the API to update the users 
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));  
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }
    render(){
        const {robots, searchField} = this.state;
        const filterRobots = robots.filter (robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        if (robots.length === 0){ // if statment is used if our data gets delay.
            return <h1 className='tc'>Loading</h1> // it'll show loading until the data gets display.
        } else {
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots = {filterRobots} />
                        </ErrorBoundry>
                    </Scroll>                   
                </div>
            );
        }
        
    }
    
}

export default App;