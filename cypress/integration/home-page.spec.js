let movies;

const filterByTitle = (movieList, string) => {
  return movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);
}

const filterByGenre = (movieList, genreId) => {
  return movieList.filter((m) => m.genre_ids.includes(genreId));
}

describe('Home Page', () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")   
      .then((response) => {
        movies = response.results
      })
  })

  beforeEach(() => {
    cy.visit('/')
  });

  describe('Base Test', () => {
    it('displays page header', () => {
      cy.get('h2').contains("No. Movies");
      cy.get('.badge').contains(20);
    })
  })

  describe("Filtering", () => {
    describe("By movie title" ,() => {
      it("should display movies with 'p ' in the title", () => {
        const searchString = 'p'
        const matchingMovies = filterByTitle(movies, searchString );
        cy.get("[data-cy=headerInput]").clear().type(searchString) ;
        cy.get(".card").should("have.length", matchingMovies.length);
        cy.get(".card").each(($card, index) => {
          cy.wrap($card)
          .find(".card-title")
          .should("have.text", matchingMovies[index].title);
        });
      })
      it("should display movies with 'o' in the title", () => {
        const searchString = "o";
        const matchingMovies = filterByTitle(movies, searchString);
        cy.get("[data-cy=headerInput]").clear().type(searchString);
        cy.get(".card").should("have.length", matchingMovies.length);
        cy.get(".card").each(($card, index) => {
          cy.wrap($card)
          .find(".card-title")
          .should("have.text", matchingMovies[index].title);
        })
      })
      it("should display no movies with 'xyz' in the title", () => {
        const searchString = "xyz"
        const matchingMovies = filterByTitle(movies, searchString)
        expect(matchingMovies).to.have.length(0)
        cy.get("[data-cy=headerInput]").clear().type(searchString)
        cy.get(".card").should("have.length", 0)
      })
    })
    describe("By movie genre" ,() => {
      it('should display movies with the specified genre only', () => {
        const selectedGenreId = 35
        const selectedGenreText = "Comedy"

        const matchingMovies = filterByGenre(movies, selectedGenreId)
        cy.get('select').select(selectedGenreText);
        cy.get('.card').should("have.length", matchingMovies.length);
        cy.get('.card').each(($card, index) => {
          cy.wrap($card)
          .find(".card-title")
          .should("have.text", matchingMovies[index].title)
        });
      })
    })
    describe('By movie title and movie genre', () => {
      it('should display movies with the specified title and specified genre', () => {
        const searchString = "o"
        const selectGenreId = 28
        const selectGenreText = 'Action'

        const matchingMovies = filterByGenre(filterByTitle(movies, searchString), selectGenreId)
        // for title
        cy.get("[data-cy=headerInput]").clear().type(searchString)
        // for genreSelect
        cy.get('select').select(selectGenreText)
        cy.get('.card').should('have.length', matchingMovies.length)
        cy.get('.card').each(($card, index) => {
          cy.wrap($card)
          .find('.card-title')
          .should('have.text', matchingMovies[index].title)
        })
      })
      it("should display no movies when title or genre no match", () => {
        const searchString = "xyz"
        const selectGenreId = 28
        const selectGenreText = 'Action'

        const matchingMovies = filterByGenre(filterByTitle(movies, searchString), selectGenreId)
        expect(matchingMovies).to.have.length(0)
        // for title
        cy.get("[data-cy=headerInput]").clear().type(searchString)
        // for genreSelect
        cy.get('select').select(selectGenreText)
        cy.get('.card').should('have.length', 0)
      })
    })
  });
})



