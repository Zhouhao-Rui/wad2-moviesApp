import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux'
import store from "./store";
import FloatingButton from "./components/floatingButton";
import SiteHeader from './components/siteHeader'
import MoviesContextProvider from './contexts/moviesContext'
import GenresContextProvider from './contexts/genresContext'
import AuthProvider from './contexts/authContext'
import PrivateRoute from './components/privateRoute'
const favoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const HomePage = lazy(() => import("./pages/homePage"));
const MoviePage = lazy(() => import('./pages/movieDetailsPage'))
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const UpcomingMoviesPage = lazy(() => import("./pages/upcomingMoviesPage"));
const AddMovieReviewPage = lazy(() => import('./pages/addMovieReviewPage'))
const Profile = lazy(() => import('./components/profile'))
const SigninPage = lazy(() => import('./pages/signinPage'))
const SignupPage = lazy(() => import('./pages/signupPage'))
const WatchListPage = lazy(() => import("./pages/watchListPage"));
const TodayTVPage = lazy(() => import('./pages/todayTVPage'))
const PopularTVPage = lazy(() => import('./pages/popularTVPage'))
const TopRatedTVPage = lazy(() => import('./pages/topRatedTVPage'))
const RatePage = lazy(() => import('./pages/ratePage'))
const DetailTVPage = lazy(() => import('./pages/detailTVPage'))
const SearchPage = lazy(() => import('./pages/searchPage'))
const PeoplePage = lazy(() => import("./pages/peoplePage"));
const ListPage = lazy(() => import('./pages/listPage'))
const ListCreatePage = lazy(() => import('./pages/listCreatePage'))
const ListAddPage = lazy(() => import('./pages/listAddPage'))

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="jumbotron">
          <AuthProvider>
            <SiteHeader />
          </AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
          <FloatingButton />
        </div>
      </BrowserRouter>
    </Provider >
  );
};

ReactDOM.render(<App />, document.getElementById("root"));