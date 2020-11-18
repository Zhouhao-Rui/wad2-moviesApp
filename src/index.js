import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import favoriteMoviesPage from "./pages/favoriteMoviesPage";
import HomePage from "./pages/homePage";
import MoviePage from './pages/movieDetailsPage'
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MoviesContextProvider from './contexts/moviesContext'
import GenresContextProvider from './contexts/genresContext'
import AddMovieReviewPage from './pages/addMovieReviewPage'
import Signup from './components/signup'

const App = () => {
  return (
    <BrowserRouter>
      <div className="jumbotron">
        <SiteHeader />
        <div className="container-fluid">
          <MoviesContextProvider>
            <GenresContextProvider>
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route exact path="/reviews/form" component={AddMovieReviewPage} />
                <Route path="/reviews/:id" component={MovieReviewPage} />
                <Route path="/movies/favorites" component={favoriteMoviesPage} />
                <Route path="/movies/upcoming" component={UpcomingMoviesPage} />
                <Route path="/movies/:id" component={MoviePage} />
                <Route path="/" component={HomePage} />
                <Redirect from="*" to="/" />
              </Switch>
            </GenresContextProvider>
          </MoviesContextProvider>
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));