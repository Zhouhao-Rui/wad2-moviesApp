import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import favoriteMoviesPage from "./pages/favoriteMoviesPage";
import HomePage from "./pages/homePage";
import MoviePage from './pages/movieDetailsPage'
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'

const App = () => {
  return (
    <BrowserRouter>
      <div className="jumbotron">
        <SiteHeader />
        <div className="container-fluid">
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