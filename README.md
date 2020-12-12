# Assignment 1 - ReactJS app.

Name: Zhouhao Rui

## Features.

...... A bullet-point list of the ADDITIONAL user features you have implemented for the  Movies Fan app ......,

 + Feature 1 - Sign in / sign up and authentication: To realize some router forbidden to the visitors, like the add Favorite, add to Watch List Functionality.
 + Feature 2 - Pagination for the movie List and upcoming movie List: User can click the page to see the specific page's movies, and the page number will keep alive after leaving the movie page.
 + Feature 3 - Review for the movies: User can add their reviews for the movies, and the reviews will show after the reviews from the website. 
 + Feature 4 - Floating button for watch list movie: User can click the floating button to see the top 2 movies' buttons in the watching list with an "ALL" button. Click the "ALL"will see the watch list movie page, and click the movie button will see the movie.
 + Feature 5 - Watch List Page: User can see the watch list movies in the watch list page.
 + Feature 6 - Profile page: User can see the personal information and favorite movies in the page.
 + Feature 7 - Side bar: The side bar has all the links in the website, together with a search input. When user type in the input, it will show the corresponding movies below in the form of  carousel.
 + Feature 8 - Search bar: The user can type in the search input, and click search button to find the tv shows they like.
 + Feature 9 - TV List Page: The user can see all the TV shows in the form of card. 
    + pagination: User can click the page to the specific pages' TV shows.
    + TV show category button group: User can click the buttons in the button group to see different kinds of TV shows. 
    + TV show sort button group: User can click the buttons in the button group to view the TV shows according to the different standards.
    + Hot TV recommendation: User can view the hot air tvs today in the Movie List Page.
+ Feature 10 - TV show rating: The user can rate for the TV show, and they can also delete the rating if they want.
+ Feature 11 - TV Page: User can view the TV show's basic information with a link to the TV show's official website. 
  + similar TV shows recommendation: User can view the similar TV shows under the TV page.
  + TV show review: User can view the reviews of the TV page at the bottom of the TV page.
+ Feature 12 - Creator Page: The user can view the creator with the movies they create.
+ Feature 13 - Create a List: The user can create a list for collecting the TV shows.
+ Feature 14 - List Page: The user can view all the list with name and TV shows it has.
+ Feature 15 - Add TV show to list: The user can add TV shows to the lists.

## Setup requirements (If required).

...... A brief explanation of any non-standard setup steps necessary to run your app/client locally (after cloning the repo) ........

It needs all the parameters of firebase and TMDB to start the service, and all of these parameters are defined in the .env file. However, it has been add to the .gitignore for the thought of security.

## API Data Model.

..... List the additional TMDB endpoints used in your assignment, e.g.

+ GET: https://api.themoviedb.org/3/movie/${id} - get detailed information on a specific movie. 
+ GET: https://api.themoviedb.org/3/search/movie?&language=en-us&query=${string}&page=1 - get the medias according to the query strings.
+ GET: https://api.themoviedb.org/3/tv/airing_today&language=en-US&page=${page} - get the today's TV shows according to the current page.
+ GET: https://api.themoviedb.org/3/tv/on_the_air - get the hot TV shows.
+ GET: https://api.themoviedb.org/3/tv/popular&language=en-US&page=${page} - get the popular TV shows according to the current page.
+ GET: https://api.themoviedb.org/3/tv/top_rated&language=en-US&page=${page} - get the top rated TV shows according to the current page.
+ GET: https://api.themoviedb.org/3/tv/${id} - get the TV show detail information.
+ POST: https://api.themoviedb.org/3/tv/${id}/rating&session_id=${session_id} - post rating to the specific TV show.
  + post-data: {"value": }
+ GET: https://api.themoviedb.org/3/account/${account_id}/rated/tv?language=en-US&session_id=${session_id}&sort_by=created_at.asc - get the detailed TV rating.
+ DELETE: https://api.themoviedb.org/3/tv/${id}/rating&session_Id=${session_id} - delete the rating for the specific TV show.
+ GET: https://api.themoviedb.org/3/search/tv&page=${page}&query=${query} - get the specific page of searched TV shows with specific search string
+ GET: https://api.themoviedb.org/3/tv/${id}/similar&page=1 - get the similar tv show according to the specific TV show.
+ GET: https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1 - get the specific TV show's reviews.
+ GET: https://api.themoviedb.org/3/credit/${id} - get the creator's information
+ GET: https://api.themoviedb.org/3/account/${account_id}/lists?session_id=${session_id} - get the lists according to the user.
+ POST: https://api.themoviedb.org/3/list?session_id={session_id} - post the name and description to create a list.
  + post-data: {name: '', description: ''}
+ POST: https://api.themoviedb.org/3/list/${list_id}/add_item?&session_id={session_id} - add the media to the list.
  + post-data: {media_id}
+ GET: https://api.themoviedb.org/3/list/${Id} - get all the detail of the specific list.

## App Design.

### Component catalogue (If required).

....... Insert a screenshot from the Storybook UI, hi-light stories relating to new/modified components you developed - see example screenshot below] .......

![][new_story.png)

### UI Design.

...... Insert screenshots of the new/modified views you have added to the Movies Fan app. Include a caption for each one clearly stating its purpose and any user interaction it supports ........

![][movie_pagination]
>Provide the pagination functionality for the users.  When the user click the previous/next, it can load the previous/next page movie data. When the user click the specific page number, it can load the corresponding page's movie data. And after the user coming back from other route, the page number will still alive.(e.g. still remain 2 in the above picture)





![][login]

![][register]

>Support user to sign in and sign up in the movie app. 





![][floating_button]

> The floating button in the form of "plus icon" contains the top 2 watch list movies and the link to the movie list page. Clicking the floating button can switch the display status of movie list.





![][watch_list_page]

> The watch list page show all the movies in the movie list. 





![][profile]

> The profile page show the basic information of the user, and show the favorite movies of the current user. The favorite movies display in the form of carousel.





![][side_bar]

> The side bar contain the main routes in the movie app, and support the search functionality. The searched medias will display below in the form of card and carousel.





![][TV_list]

![][TV_list2]

> The TV list page support the functionalities as follows:
>
> - search the related TV Show.
> - display the TV shows in the form of TV card.
> - display the hot air TV.
> - change the TV category by the first button group.
> - sort the TV shows in the current page by the second button group.
> - use pagination to change the page number.





![][rate_page]

> The rate page support the functionalities as follows:
>
> - send the rating to TMDB
> - delete the current rating by clicking the delete button





![][tv_detail]



![][tv_detail2]

> The tv detail support the following functionalities:
>
> - show the basic information of the tv
>
> - show the link to the movie official website.
> - show 8 similar tv shows related to the current TV show.
> - show the reviews of the current TV show.





![][search_page]

> The search page show the result of the searched TV shows.





![][creator_page]

> The creator page shows the basic information of the creator with the shows he/she created.





![][add_list]

> The add list page support the functionality of adding TV shows to the collection list.





![][List_page]

> The list page show all the list created by the user with the medias covering by the list.







![][create_list]

> The create list page support user to create a new list.



## Routing.

...... Insert a list of the additional routes supported by your Movies Fan app. If relevant, specify which of the routes require authentication, i.e. protected/private.

+ /movies/favorites (private) - displays the user's favorite movies selection.

+ /movies/watchLists(private) - displays the user's watch list's movies.

+ /profile(private) - displays the user's profile

+ /list(private) - display the list of the user

+ /list/create(private) - display the create list page

+ /signin(public) - display the sign in page

+ /signup(public) - display the signup page

+ /people/:id(public) - display the creator information

+ /search/:value(public) - display the first page's searched medias.

+ /search/:value/pages/:page(public) - display the searched medias according to the specific page number.

+ /tv/:id(public) - displays the tv show detail.

+ /tvs/list/:id(private) - display the adding TV show to list page.

+ /tvs/rate/:id(private) - display the rating page for the TV show.

+ /tvs/toprate - display the first page's top-rate TV shows.

+ /tvs/toprate/pages/:page - displays the top-rate TV shows according to the specific page number. 

+ /tvs/popular- display the first page's popular TV shows.

+ /tvs/popular/pages/:page - displays the popular TV shows according to the specific page number. 

+ /tvs: display the first page's today air TV shows.

+ /tvs/pages/:page - display the first page's today air TV shows according to the specific page number.

  

### Data hyperlinking.

.... Use screenshots to illustrate where data hyperlinking is present in your views - include captions.

![][movie_card]
> Clicking a card causes the display of that movie's details.



![][review_link]
>Clicking the 'Full Review' for a review extract will display the full text of the review



![][show_watch_list]

> Clicking the 'ALL' for viewing all the movies in the watch list.



![][profile_hyperlink]

> Click the image to view the favorite movie detail



![][sign_in_hyperlink]

> Click the "signin" to login the movie app



![][side_bar_hyperlink]

> Click the side bar link to redirect to the corresponding route.



![][side_bar_input_hyperlink]

> Click the image to redirect the media Detail page.



![][search_button_hyperlink]

> Click the search button to redirect to the search page and display search results.



![][hot_air_TV_hyperlink]

> Click the link in the hot air tvs, and redirect to the TV detail page.



![][tv_category_link]

> Click the link in the button groups, and turn to the popular tv page and top rated tv page.



![][TV_card_link]

> Click the image to redirect to the TV detail page



![][rating_link]

> Click the "rate now" to turn to the rating page



![][list_link]

> Click the "Add To List" to redirect to the add tv to list page.



![][creator_link]

> Click the link after "created by" to view the creator page.



![][official_website_link]

> Click the image to view the TV show's official website.



![][logout_link]

> Click the "logout" to log out from the movie app.



## Independent learning (If relevant).

. . . . . Briefly mention each technologies/techniques used in your project codebase that were not covered in the lectures/labs. Provide source code filename references to support your assertions and include reference material links (articles/blogs).

1. react-transition-group

   - I use the react-transition-group to support the animation in my own component(Floating button).

   - filename:  

     - /src/components/floatingButton/index.js

   - part of source code:

     - ```js
       import { CSSTransition } from 'react-transition-group'
       const [show, setShow] = useState(false)
       <CSSTransition
               in={show}
               unmountOnExit={true}
               timeout={1000}
               classNames="watchLists">
               {watchLists.length > 0 ?
                 <WatchLists watchLists={watchLists} />
                 :
                 <div></div>
               }
             </CSSTransition>
       ```

   - reference:
     
     - https://reactcommunity.org/react-transition-group/css-transition

2. redux, redux-thunk and immutable

   - I use the redux instead of context to refactor the original movie app, to support the pagination, page number alive after moving to other pages and adding different pages' movies to the favorite page and watch list page.

   - Also use redux in my own TV pages. All the data requests which will be reused, I use the redux to encapsulate the request.

   - filename:

     - /src/store/
     - /src/components/tvStore
     - /src/components/movieStore

   - part of the source code:

     - ```js
       // store
       import {compose, createStore, applyMiddleware} from 'redux'
       import reducer from './reducer'
       import thunk from 'redux-thunk'
       
       const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
       
       const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
       
       export default store
       
       // tvreducer
       const tvReducer = (state = initialState, action) => {
         switch (action.type) {
           case CHANGE_TODAY_TVS:
             return state.set("today_tvs", action.tvs)
           case CHANGE_LATEST_TVS:
             return state.set("latest_tvs", action.tvs)
           ...
           default:
             return state
         }
       }
       ```

3. Material UI

   - I use the material in all of my own features and pages development, including the side bar, components about the list pages, and components about the tv pages.

   - filename:

     - /src/components/sidebar
     - /src/components/tv/tvcard
     - /src/components/sortButtonGroup
     - /src/components/tv/searchHeader
     - /src/components/tv/cateButtonGroup

   - part of the source code

     - ```js
       sidebar
       <Drawer
               className={classes.drawer}
               variant="persistent"
               anchor="left"
               open={open}
               classes={{
                 paper: classes.drawerPaper,
               }}
       >
           ... 
       </Drawer>
       
       tvcard
        <Card>
               <CardActionArea>
                 <Link to={`/tv/${tv.id}`} data-cy="detail-link">
                   <CardMedia
                     className={classes.media}
                     image={tv.poster_path ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : "./film-poster-placeholder.png"}
                     title="Contemplative Reptile"
                   />
                 </Link>
       ... 
       </CardActions>
             </Card>
       ```

   - reference:
     
     - https://material-ui.com/zh/

4. firebase

   - I use the firebase to support the sign in and sign up page.

   - filename:

     - /src/config/firebase.js
     - /src/context/authContext.js

   - part of the source code:

     - ```js
       const AuthContext = React.createContext()
       
       export function useAuth() {
         return useContext(AuthContext)
       }
       
       function AuthProvider({ children }) {
       
         const signup = (email, password) => {
           return auth.createUserWithEmailAndPassword(email, password)
         }
       
         const signin = (email, password) => {
           return auth.signInWithEmailAndPassword(email, password)
         }
       
         const signout = () => {
           return auth.signOut()
         }
         ...
       }
       
       ```

   - reference
     
     - https://firebase.google.com/docs/auth

5. formik

   - I use formik to support the form control and validation.

   - filename:

     - /src/components/templateAuthPage/
     - /src/pages/listCreatePage

   - part of the source code:

     - ```js
       <Formik
               initialValues={{ email: '', password: '' }}
               validate={validate}
               onSubmit={async values => {
                 try {
                   await authMethod(values.email, values.password)
                   history.push(successRoutePath)
                 } catch (e) {
                   setErrorMsg(e.message)
                 }
               }}
       >
       ```

# Assignment 1 - Agile Software Practice.

Name: Zhouhao Rui



## Some explanation 

**I'm sorry for that because I start the agile very early, I didn't see the modified specification for the agile assignment. I write all of the web development part in the develop branch, and place the all of things related to the test and CI in the staging branch.**



## App Features.

[Document each new feature/page in your Movies Fan app, including: Feature Name; Its objective/purpose; The associated test file; a screenshot of its UI.]
e,g,

+ Sign up page: Support user to sign up in the application by firebase. 

Tests: cypress/integration/auth.spec.js

![][register]

+ Sign in page: Support user to login in the application to visit some private routes.

Tests: cypress/integration/auth.spec.js

![][login]

+ Profile page: Display the user basic information and favorite movies

Tests: cypress/integration/auth.spec.js

![][profile]

+ Pagination: Support user to change the movie page by number and see watch list movies in the floating button.

Test: cypress/integration/pagination.spec.js

![][movie_pagination]

- review: Display both the user review and review from the API.

Test: cypress/integration/review.spec.js

![][review_test]

- creator: Display the information of the creator and the shows he/she directed

Test: cypress/integration/peoplePage.spec.js

![][creator_page]

- side_bar: Display all the links to the pages in the project, and also support the search in the input form.

Test: cypress/integration/sideBar.spec.js

![][side_bar]

- tvPage: Display the tv page by the specific page number, together with the search functionality, category functionality, sort functionality, rate functionality and pagination functionality.

Test: cypress/integration/tvPage.spec.js

![][TV_list]

![][TV_list2]

- TVDetailPage: Display the information of the tv page with the similar tv shows and reviews.

Test: cypress/integration/tvDetailPage.spec.js

![][tv_detail]

![][tv_detail2]

- create list: support the user to create the list.

![][create_list]

## Testing.

Cypress Dashboard URL: https://dashboard.cypress.io/organizations/04569f27-908c-4566-9e40-976c412e0a70/projects

**I'm sorry that I didn't push every test results to the dashboard.**

and this is the gitlab link if read further:

https://gitlab.com/ZhouhaoRui/moviesapp-ci

### Advanced Testing (If required).

[State briefly each instances of boundary and/or error/exceptional test case in your project]
e.g.

+ cypress/integration/movieDetails.spec.js - test when a movie has no reviews.
+ cypress/integration/auth.spec.js - test when the email address does not contain @
+ cypress/integration/auth.spec.js - test when the email address does not have . after @
+ cypress/integration/auth.spec.js - test when the email address does not have fewer than 2 chars after @
+ cypress/integration/auth.spec.js - test when the email address does not have longer than 4 chars after @
+ cypress/integration/auth.spec.js - test when the password length is less than 6.
+ cypress/integration/pagination.spec.js - test when the floating button have no watch list movie
+ cypress/integration/pagination.spec.js - test when the floating button have only one watch list movie
+ cypress/integration/listPage.spec.js - test when the name is empty
+ cypress/integration/listPage.spec.js - test when the description's length is less than 10.
+ cypress/integration/listPage.spec.js - test when the description is empty.

## Independent learning (If relevant).

[ Itemize each technologies/techniques used in your project that were not covered in the lectures/labs. Provide the necessary evidence of their use (e,g, project file names, screenshots, service URL, etc)

List reference material links (articles/blogs).

1. code coverage:

   - I use the code coverage for the project by using the instrument-cra package, and the test won't pass if the line coverage is lower than 80%.

   - screenshot

     ![][code_coverage_cra]
     
     ![][code_coverage]
   
   - reference: 
   
     https://www.npmjs.com/package/@cypress/instrument-cra
   
     https://docs.cypress.io/guides/tooling/code-coverage.html#Videos
   
2. Cypress custom command

   - I use the cypress custom command to reduce the redundant test code.

   - filename:

     - cypress/integration/auth.spec.js
     - cypress/integration/pagination.spec.js

   - part of source code

     - ```js
       auth.spec.js
       Cypress.Commands.add('errorEmailMessageType', (message) => {
         cy.get('#email').type(message)
         cy.get('[data-cy=email-warning]').should("have.text", "Invalid email address")
       })
       
       pagination.spec.js
       Cypress.Commands.add('currentPageTest', (name) => {
         cy.get('[data-cy=page-active]').click()
         cy.get('.card-body').find(`.card-title:contains(${name})`).should('have.length', 1)
       })
       
       Cypress.Commands.add('specificPageTest', (name) => {
         cy.get('.page-link').eq(2).click()
         cy.wait(2000)
         cy.get('.page-item').eq(2).each($el => {
           expect($el).to.have.class('active')
         })
         cy.get('.card-body').each($el => {
           cy.wrap($el).find('.card-title').should('not.contain', name)
         })
       })
       ...
       ```

   - reference

     - https://docs.cypress.io/api/cypress-api/custom-commands.html#Syntax

3. Cypress data-cy usage

   - I use the data-cy to bind most of the new elements

   - part of source code:

     - ```js
       tvPage.spec.js
       beforeEach(() => {
           cy.visit('/')
           cy.get('[data-cy=menu]').click()
           cy.get('[data-cy=ListItem]').eq(1).click()
           cy.get('[data-cy=secondaryListItem]').eq(0).click()
           cy.url().should('match', /tv/)
           cy.wait(1000)
         })
       ...
       ```

   - reference:

     - ![][data_cy]

---------------------------------

[login]: ./public/readme_pic/login.png
[register]: ./public/readme_pic/register.png
[add_list]: ./public/readme_pic/add_list.png
[card_link]: ./public/readme_pic/cardlink.png
[create_list]: ./public/readme_pic/create_list.png
[creator_link]: ./public/readme_pic/creator_link.png
[creator_page]: ./public/readme_pic/creator_page.png
[floating_button]: ./public/readme_pic/floating_button.png
[hot_air_TV_hyperlink]: ./public/readme_pic/hot_air_TV_hyperlink.png
[list_link]: ./public/readme_pic/list_link.png
[list_page]: ./public/readme_pic/list_page.png
[logout_link]: ./public/readme_pic/logout_link.png
[movie_card]: ./public/readme_pic/movie_card.png
[movie_pagination]: ./public/readme_pic/movie_pagination.png
[movie_detail]: ./public/readme_pic/movie_detail.png
[new_story]: ./public/readme_pic/new_story.png
[official_website_link]: ./public/readme_pic/official_website_link.png
[profile]: ./public/readme_pic/profile.png
[profile_hyperlink]: ./public/readme_pic/profile_hyperlink.png
[rate_page]: ./public/readme_pic/rate_page.png
[rating_link]: ./public/readme_pic/rating_link.png
[review]: ./public/readme_pic/review.png
[review_link]: ./public/readme_pic/review_link.png
[search_page]: ./public/readme_pic/search_page.png
[search_button_hyperlink]: ./public/readme_pic/search_button_hyperlink.png
[show_watch_list]: ./public/readme_pic/show_watch_list.png
[side_bar_hyperlink]: ./public/readme_pic/side_bar_hyperlink.png
[side_bar_input_hyperlink]: ./public/readme_pic/side_bar_input_hyperlink.png
[side_bar]: ./public/readme_pic/side_bar.png
[sign_in_hyperlink]: ./public/readme_pic/sign_in_hyperlink.png
[TV_card_link]: ./public/readme_pic/TV_card_link.png
[tv_category_link]: ./public/readme_pic/tv_category_link.png
[tv_detail]: ./public/readme_pic/tv_detail.png
[tv_detail2]: ./public/readme_pic/tv_detail2.png
[TV_list]: ./public/readme_pic/TV_list.png
[TV_list2]: ./public/readme_pic/TV_list2.png
[watch_list_page]: ./public/readme_pic/watch_list_page.png
[review_test]: ./public/readme_pic/review_test.png
[code_coverage_cra]: ./public/readme_pic/code_coverage_cra.png

[data_cy]: ./public/readme_pic/data_cy.png
[code_coverage]: ./public/readme_pic/code_coverage.png

