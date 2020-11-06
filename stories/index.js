import React from "react";
import { storiesOf } from "@storybook/react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import MovieCard from "../src/components/movieCard";
import FilterControls from "../src/components/filterControls";
import MoviesHeader from "../src/components/headerMovieList";
import MovieList from "../src/components/movieList";
import MovieDetails from "../src/components/movieDetails";
import MovieHeader from "../src/components/headerMovie";
import AddFavoriteButton from "../src/components/buttons/addToFavorites";
import { MemoryRouter } from "react-router";
import GenresContextProvider from "../src/contexts/genresContext";
import MovieCotextProvider from '../src/contexts/moviesContext'
import { action } from "@storybook/addon-actions";
import MovieReviews from '../src/components/movieReviews'
import MovieReview from '../src/components/movieReview'
import ReviewForm from '../src/components/reviewForm'

const sample = {
  adult: false,
  backdrop_path: "/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg",
  belongs_to_collection: {
    id: 10,
    name: "Star Wars Collection",
    poster_path: "/iTQHKziZy9pAAY4hHEDCGPaOvFC.jpg",
    backdrop_path: "/d8duYyyC9J5T825Hg7grmaabfxQ.jpg"
  },
  budget: 200000000,
  genres: [
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 28,
      name: "Action"
    }
  ],
  homepage:
    "https://www.starwars.com/films/star-wars-episode-viii-the-last-jedi",
  id: 181808,
  imdb_id: "tt2527336",
  original_language: "en",
  original_title: "Star Wars: The Last Jedi",
  overview:
    "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
  popularity: 44.208,
  poster_path: "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
  production_companies: [
    {
      id: 1,
      logo_path: "/o86DbpburjxrqAzEDhXZcyE8pDb.png",
      name: "Lucasfilm",
      origin_country: "US"
    },
    {
      id: 11092,
      logo_path: null,
      name: "Ram Bergman Productions",
      origin_country: "US"
    },
    {
      id: 2,
      logo_path: "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
      name: "Walt Disney Pictures",
      origin_country: "US"
    }
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America"
    }
  ],
  release_date: "2017-12-13",
  revenue: 1332459537,
  runtime: 152,
  spoken_languages: [
    {
      iso_639_1: "en",
      name: "English"
    }
  ],
  status: "Released",
  tagline: "Darkness rises... and light to meet it",
  title: "Star Wars: The Last Jedi",
  video: false,
  vote_average: 7,
  vote_count: 9692
};

const review = {
  author: "Weedinator",
  content: "I got so high before going in to see \"The Last Jedi\" it's a wonder I figured out how to get into the theater. We started rocking the shatter bong hardcore, just pump it, pump it, till you can actually feel your brain melting, then hit that nail and do it again and again. At some point somebody asked the question \"where are we?\" and while I was reflecting philosophically on the matter, somebody else pointed out that we were parked in a lot by the cineplex and we slowly realized that we were here to see 'The Last Jedi'! I could barely function at all, so I went to my old go-to routine of donning dark glasses and a white cane to help disguise my complete stonification by pretending I was just some poor blind guy stumbling around and knocking things over. I usually do this to get past security at rock concerts and it never crossed my mind that a blind guy wouldn't be able to see a movie in the first place, but it worked anyway and soon enough we were in our seats. There were these fucking kids sitting right behind us and they kept kicking my seat like little retards, kicking, kicking, kicking.... so I took the lid off my extra-large Coke and just tossed it over my shoulder. Bingo! Direct hit! The little creeps shuffled off all pissed and whining, covered in sticky cola, us laughing at them, calling them losers, it was great! \r\n\r\nThen the movie started. The sound was awesome and everything but the screen was pretty freakin' dark I thought, could hardly make out anything. I started chanting \"Turn up the brightness! Turn up the brightness!\", expecting the rest of the audience to join in to my righteous chant of outrage, but then I realized I still had my Blind Guy Glasses on. Took 'em off and yup, cleared right up. There was some kind of big space battle going on so we took out our vape pens and started hoofing back lungfuls of sweet sweet shatter vapor. My girlfriend started texting me, bitching at me to pick her up some vag pads on the way home. WTF?? Get up off your fat ass and get 'em yourself I texted back. A barrage of bitchtexts followed, I was a jerk, I was an asshole and bla bla bla... I took a picture of my bare ass and sent it to her as a reply, fuckin bitch, anyway, apparently, this was considered 'indecent exposure' according to the usher-dork who wouldn't shut up about it so we had to leave the movie. We saw those stupid kids in the lobby as we were being escorted out, laughing at US, calling US 'losers'... I wanted to get back at them when they came out, even formed this elaborate plan where we would swoop down on them and soak them with freezing water this time, but we ended up just getting high again then went to Burger King."
}

storiesOf("Home Page/MovieCard", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <MovieCard
      movie={sample}
      action={movie => <button className="btn w-100 btn-primary">Test</button>}
    />
  ))
  .add("exception", () => {
    const sampleNoPoster = { ...sample, poster_path: undefined };
    return (
      <MovieCard
        movie={sampleNoPoster}
        action={movie => (
          <button className="btn w-100 btn-primary">Test</button>
        )}
      />
    );
  });

storiesOf("Home Page/FilterControls", module)
  .addDecorator(story => (
    <GenresContextProvider>{story()}</GenresContextProvider>
  ))
  .add("default", () => (
    <FilterControls onUserInput={action("button-click")} numMovies={10} />
  ));

storiesOf("Home Page/Header", module).add("default", () => (
  <MoviesHeader title="All Movies" numMovies={10} />
));

storiesOf("Home Page/MovieList", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => {
    const movies = [sample, sample, sample, sample, sample];
    return (
      <MovieList
        movies={movies}
        action={movie => (
          <button className="btn w-100 btn-primary">Test</button>
        )}
      />
    );
  });

storiesOf("Movie Details Page/MovieDetails", module).add("default", () => (
  <MovieDetails movie={sample} />
));

storiesOf("Movie Details Page/MovieHeader", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <MovieHeader movie={sample} />);


// storires for Movie Review  
storiesOf("Movie Reviews Page/MovieReviews", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add('default', () => {
    return (
      <MovieReviews movie={sample} />
    )
  })

storiesOf("Movie Reviews Page/MovieReview", module)
  .add("default", () => {
    return (
      <MovieReview review={review} />
    )
  })

storiesOf("Movie Reviews Page/ReviewForm", module)
  .addDecorator(story => (
    <MovieCotextProvider>{story()}</MovieCotextProvider>
  ))
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => {
    return (
      <ReviewForm movie={sample} />
    )
  })