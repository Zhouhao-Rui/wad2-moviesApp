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
import WatchListPage from "./pages/watchListPage";
import TodayTVPage from './pages/todayTVPage'
import PopularTVPage from './pages/popularTVPage'
import TopRatedTVPage from './pages/topRatedTVPage'
import RatePage from './pages/ratePage'
import DetailTVPage from './pages/detailTVPage'
import SearchPage from './pages/searchPage'
import PeoplePage from "./pages/peoplePage";
import ListPage from './pages/listPage'
import ListCreatePage from './pages/listCreatePage'
import ListAddPage from './pages/listAddPage'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="jumbotron">
          <AuthProvider>
            <SiteHeader />
          </AuthProvider>
          <div className="container-fluid mt-3">
            <MoviesContextProvider>
              <GenresContextProvider>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/signin" component={SigninPage} />
                    <Route exact path="/reviews/form" component={AddMovieReviewPage} />
                    <Route path="/reviews/:id" component={MovieReviewPage} />
                    <Route path="/movies/watchLists" component={WatchListPage} />
                    <PrivateRoute path="/movies/favorites" component={favoriteMoviesPage} />
                    <Route path="/movies/upcoming" component={UpcomingMoviesPage} />
                    <Route path="/movies/:id" component={MoviePage} />
                    <PrivateRoute path="/list/create" component={ListCreatePage} />
                    <PrivateRoute path="/list" component={ListPage} />
                    <Route path="/people/:id" component={PeoplePage} />
                    <Route path="/search/:value/pages/:page" component={SearchPage} />
                    <Route path="/search/:value" component={SearchPage} />
                    <Route path="/tv/:id" component={DetailTVPage} />
                    <PrivateRoute path="/tvs/list/:id" component={ListAddPage} />
                    <PrivateRoute path="/tvs/rate/:id" component={RatePage} />
                    <Route path="/tvs/toprate/pages/:page" component={TopRatedTVPage} />
                    <Route path="/tvs/toprate" component={TopRatedTVPage} /> 
                    <Route path="/tvs/popular/pages/:page" component={PopularTVPage} />
                    <Route path="/tvs/popular" component={PopularTVPage} /> 
                    <Route path="/tvs/pages/:page" component={TodayTVPage} />
                    <Route path="/tvs" component={TodayTVPage} />
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