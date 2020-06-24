import React, { useEffect, useState } from 'react';
import { Jumbotron, Container } from 'reactstrap';


//component imports
import Pagination from './Pagination'
import Posts from './Posts'; 
import axios from 'axios';


const Home = () => {



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

//Declaring states
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const[postsPerPage, setPostsPerPage] = useState(100);
//get current posts
const indexOfLastPost = currentPage*postsPerPage;
const indexOfFirstPost = indexOfLastPost-postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
//Pagination
const paginate = pageNumber => setCurrentPage(pageNumber)




  return (
    
    
      <div>
        <div className = 'jumbotron-container'>
        
        
        <Jumbotron fluid>
          <Container fluid >
            <h1 className="display-3 med-title">Medical Cabinet</h1>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. </p>
          </Container>
        </Jumbotron>
        
        
        </div>
        
        <br></br>
        
        <hr></hr>
        <br></br>
        <hr></hr>
      
      
          <div className = 'search-component'>

          <h2 className = 'browse-title'>Browse All Strains</h2>
          <Posts posts={currentPosts} loading = {loading}  />
          <Pagination postsPerPage = {postsPerPage} totalPosts = {posts.length} paginate={paginate}/>

          </div>
        
      
      </div>
    

    <h3 className = 'explore-h3'>Search By:</h3>

    <div className="search-component">
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
