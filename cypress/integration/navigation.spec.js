let movies;
const movieId = 497582
let reviews

describe('Navigation', () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then(res => {
        movies = res.results
      })

    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((response) => {
        console.log(response);
        reviews = response.results;
      });
  })

  describe('From the Home page', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it("should navigate to the movie details page and change browser URL", () => {
      cy.get(".card").eq(1).find("img").click()
      cy.url().should("include", `/movies/${movies[1].id}`)
      cy.get("h2").contains(movies[1].title)
    })
    it("should allow navigation from site header", () => {
      cy.get("nav").find("li").eq(2).find("a").click()
      cy.url().should("include", "/upcoming")
      cy.get("h2").contains("Upcoming Movies");
      cy.get("nav").find("li").eq(1).find("a").click()
      cy.url().should("eq", "http://localhost:3000/")
      cy.get("h2").contains("No. Movies");
      cy.get("nav").find("li").eq(3).find("a").click();
      cy.url().should("include", `/favorites`);
      cy.get("h2").contains("Favorite Movies");
      cy.get("nav").find("li").eq(2).find("a").click();
    })
  })
  
  // describe('From the Movie Details Page', () => {
  //   beforeEach(() => {
  //     cy.visit(`/movies/${movieId}`)
  //   })

  //   it("should change browser URL when show/hide reviews is clicked", () => {
  //     cy.contains("Show Reviews").click();
  //     cy.url().should("include", `/movies/${movieId}/reviews`);
  //     cy.contains("Hide Reviews").click();
  //     cy.url().should("not.include", `/movies/${movieId}/reviews`);
  //   })
  //   it("navigate to the full review page when a 'Full Review' link is clicked", () => {
  //     cy.contains("Show Reviews").click()
  //     cy.get(".table")
  //     .find("tbody").find("tr").eq(0).find("td").eq(2).find("a")
  //     .click()
  //     // check whether we are in the right page
  //     cy.url().should("contains", reviews[0].id)
  //     cy.get(".col-sm-9").find("p").eq(0).contains(reviews[0].author)
  //   });
  // })

  describe("From the Favorites page", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".card").eq(0).find("button").click();
      cy.get("nav").find("li").eq(3).find("a").click();
    });
    it("should navigate to the movies detail page and change the browser URL", () => {
      cy.get(".card").eq(0).find("img").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h2").contains(movies[0].title);
    });
  });
  

  describe("The Go Back button", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("should navigate from home page to movie details and back", () => {
      cy.get(".card").eq(1).find("img").click();
      cy.get("svg[data-icon=arrow-circle-left]").click();
      cy.url().should("not.include", `/movies`);
      cy.get("h2").contains("No. Movies");
    });
    it("should navigate from favorites page to movie details and back", () => {
      // first click add favorite with one moive go to favorite movies page
      cy.get(".card").eq(1).find('.card-footer').find('.btn').click()
      cy.get(".navbar-expand").find(".navbar-nav").find(".nav-item").eq(2).find(".nav-link").click()
      // second go to the favorite page then find the movie to click
      cy.get(".card").eq(0).find("img").click()
      cy.get("svg[data-icon=arrow-circle-left]").click();
      cy.url().should("include", "favorites")
      cy.get("h2").contains("Favorite Movies")
    });
  });
})
