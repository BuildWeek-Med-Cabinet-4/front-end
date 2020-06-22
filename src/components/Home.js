import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import {Route, Link} from 'react-router-dom';
import Strains from './Strains';
import Symptoms from './Symptoms';
import Effects from './Effects'
const Home = (props) => {
  return (
    <div>
        <div className = 'jumbotron-container'>
    
    
          <Jumbotron fluid>
            <Container fluid >
              <h1 className="display-3">Medical Cabinet</h1>
              <p className="lead">Welcome to Med Cabinet!</p>
            </Container>
          </Jumbotron>
    
          
        </div>
    
    <h3 className = 'explore-h3'>Search By:</h3>

    <div class="search-component">
    <nav className = 'explore-nav'>
    <Link to = '/search_all_strains'>All Strains</Link>
    <Link to = '/search_symptom'>Symptoms</Link>
    <Link to = '/search_effect'>Effects</Link>
    </nav>
    <Route exact path= '/search_all_strains' component = {Strains}></Route>
    <Route path= '/search_symptom' component = {Symptoms}></Route>
    <Route path= '/search_effect' component = {Effects}></Route>
    </div>

    </div>
  );
};

export default Home;
