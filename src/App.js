import React, { Component } from 'react';
import NavBar from "./Components/NavBar";
import Spinner from "./Components/Spinner";
import "./Styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from "./Components/Search";
import Footer from "./Components/Footer";
import Button from "react-bootstrap/Button";
// import Catalogue from "./Components/Catalogue";
// import Articles from "./Components/Articles"

const APIKey = "c0c1fbe267e1471da76710b32449fae4";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      shownArticles: [],
      isLoaded: false,
      lookUp: "",
      linkID: 0,
      Links: [
        {
          id: 0,
          name: "Wall Street Journal",
          link: `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${APIKey}`
        },
        {
          id: 1,
          name: "Business in US",
          link: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${APIKey}`
        },
        {
          id: 2,
          name: "TechCrunch",
          link: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${APIKey}`
        },
      ],
    }
  }

  componentDidMount() {
    fetch(`${this.state.Links[this.state.linkID].link}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          articles: data.articles,
        })
      }); 
  }

  removeArticles = function() {
    this.setState({
      shownArticles: [],
    });
  }
  
  // searchArticle = async function() {
  //   await this.removeArticles();
  //   this.state.articles.forEach((article) => {
  //     if (!this.state.lookUp) {
  //       this.setState({
  //         shownArticles: [...this.state.article],
  //       }); 
  //     } else if (
  //       this.state.lookUp &&
  //       article.title
  //         .toLowerCase()
  //         .includes(this.state.lookUp.toLowerCase())
  //     ) {
  //       this.setState({
  //         shownArticles: [...this.state.shownArticles, article],
  //       });
        
  //     }
  //   });
    
    
  // }


  
  popArticles = async function() {
    this.setState({
      shownArticles: [],
      articles: [],
    });
  
    await fetch(`${this.state.Links[this.state.linkID].link}`, {
      headers: {
        Upgrade: "HTTP/2.0",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        data.articles.forEach((article) => {
          this.setState(prevState => ({
            articles: [...prevState.articles, article],
            shownArticles: [...prevState.shownArticles, article],
          }));
        });
      });
  }
  
  // onChange = function(event) {
  //   this.setState({
  //     lookUp: event.target.value,
  //   }, () => {
  //     this.lookUp();
  //   });
  // }

    render() {
      const { isLoaded, articles } = this.state;

      if (!isLoaded) {
        return <div><Spinner/></div>;
      }

      return (
        
        <div className="App">

          <NavBar/>

          <br/>

          <div className="home">

          <br/>

          <h1 style={{fontWeight:'bolder'}}>Daily Dispatch</h1>

          <div className="line my-4"></div>

          <br/>

          <div className="Search">

            <Search value={this.state.searchArticle} onChange={this.onChange} />

          </div>

          </div>

          <div className="container mb-5">

                  {articles.map(article => (

                    <div key={article.url} className="card">


                      <img src={article.urlToImage} className="card-img-top" alt="..." />

                      <h5 className="card-title">{article.title}</h5>

                            <p>{article.description}</p>

            
                        <Button className='btn-dark mb-5'><a target='_blank' rel="noreferrer" href={article.url}>See more</a></Button>

                    </div>
                ))}

          </div>

          <br/>

          <Footer/>

        </div>
      )
    }
  }

export default App;
