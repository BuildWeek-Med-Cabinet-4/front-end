import React, { useEffect, useState } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Posts from './Posts'; 
import axios from 'axios';


const Home = () => {

const [allStrains, setAllStrains] = useState(' ');


//Declaring states
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const[postsPerPage, setPostsPerPage] = useState(10);

useEffect(()=>{
  const fetchPosts = async () =>{
    setLoading(true);
    const res = await axios.get('https://best-med-cabinet.herokuapp.com/api/products');
    console.log(res.data)
    setPosts(res.data);
    setLoading(false);

  }

  fetchPosts();
},[]);






  return (
    
    <Router>
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
        <hr></hr>
        <div className="search-component">
        
          <nav className = 'explore-nav'>
          
            <Link to = '/all_strains'>All Strains</Link>
            
          
          </nav>
        
      
          <div>
          
            <Route exact path= '/all_strains' component = {Posts}></Route>
          
          <Posts posts={posts} loading = {loading}/>


          </div>
        </div>
      
      </div>
    </Router>
  );
};

export default Home;
