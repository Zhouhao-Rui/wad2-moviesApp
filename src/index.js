import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import favoriteMoviesPage from "./pages/favoriteMoviesPage";
import HomePage from "./pages/homePage";
import MoviePage from './pages/movieDetailsPage'
import MovieReviewPage from "./pages/movieReviewPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="jumbotron">
        <div className="container-fluid">
          <ul className="navbar-nav text-black">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies/favorites">
                Favorites
              </Link>
            </li>
          </ul>
          <Switch>
            <Route path="/reviews/:id" component={MovieReviewPage} />
            <Route path="/movies/favorites" component={favoriteMoviesPage} />
            <Route path="/movies/:id" component={MoviePage} />
            <Route path="/" component={HomePage} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));