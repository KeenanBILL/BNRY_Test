import React, { Component } from 'react';
import NavBar from "./Components/NavBar";
import "./Styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-03-21&sortBy=publishedAt&apiKey=c0c1fbe267e1471da76710b32449fae4')
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          articles: data.articles,
        })
      }); 
  }

  render() {
    const { isLoaded, articles } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      
      <div className="App">

        <NavBar/>

        <h1>Welcome to our daily report on Tesla</h1>

        <div className="container">

                {articles.map(article => (

                  <div key={article.url} className="card">

                    <h5 className="card-title">{article.title}</h5>

                    <img src={article.urlToImage} className="card-img-top" alt="..." />

                      <div className="card-header">Author: {article.author} | Date Published: {article.publishedAt}</div>

                        <div className="card-body">

                          <p>{article.description}</p>

                      </div>

                  </div>
              ))}

        </div>

      </div>
    );
  }
}

export default App;
