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
import AuthProvider from './contexts/authContext'
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PrivateRoute from './components/privateRoute'
import Profile from './components/profile'
import SigninPage from './pages/signinPage'
import SignupPage from './pages/signupPage'
import { Provider } from 'react-redux'
import store from "./store";
import FloatingButton from "./components/floatingButton";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="jumbotron">
          <AuthProvider>
            <SiteHeader />
          </AuthProvider>
          <div className="container-fluid">
            <MoviesContextProvider>
              <GenresContextProvider>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/signin" component={SigninPage} />
                    <Route exact path="/reviews/form" component={AddMovieReviewPage} />
                    <Route path="/reviews/:id" component={MovieReviewPage} />
                    <PrivateRoute path="/movies/favorites" component={favoriteMoviesPage} />
                    <Route path="/movies/upcoming" component={UpcomingMoviesPage} />
                    <Route path="/movies/:id" component={MoviePage} />
                    <Route path="/" component={HomePage} />
                    <Redirect from="*" to="/" />
                  </Switch>
                </AuthProvider>
              </GenresContextProvider>
            </MoviesContextProvider>
          </div>
          <FloatingButton />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));