import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { unavailable, unavailableLandscape } from "../unavailable_posters";
import CustomCard from "../Customs/CustomCard";
import "../Customs/CustomCard.css";
import CustomPagination from "../Customs/CustomPagination";
import "./Pages.css";
import Genres from "../Customs/Genres";

const Series = () => {
  const [allData, setAllData] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  // Series data URL
  const URL = `https://api.themoviedb.org/3/discover/tv?api_key=ff467eb5250b9dbc204f57aa97463c7e&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const dataURL = "https://image.tmdb.org/t/p/w500/";

  // Fetching Series URL
  useEffect(() => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data.results);
        setAllData(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [URL]);

  return (
    <div className="container">
      <h1 className="page-title text-light text-center mb-4 mt-4 animate__rollIn">
        TV Series
      </h1>
      <h5 className="mb-3 text-center text-dark info">
        Enjoy with an information for
        <span className="text-danger"> +{allData.total_results}</span> TV Series
      </h5>

      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
        type={"tv"}
      />

      {loading ? <div className="text-danger">Loading...</div> : null}
      {error ? (
        <div className="text-danger">{`There is a problem fetching the post data - ${error}`}</div>
      ) : null}

      <div className="d-flex gap-5 flex-wrap col align-items-center justify-content-center">
        {data &&
          data.map((movie) => (
            <Row key={movie.id}>
              <CustomCard
                poster={
                  movie.poster_path ? dataURL + movie.poster_path : unavailable
                }
                movieName={movie?.title || movie?.name || movie?.original_name}
                movieRelease={movie?.release_date || movie?.first_air_date}
                movieRate={movie.vote_average}
                movieDetails={movie.overview}
                movieVoteCount={movie.vote_count}
                movieLang={movie.original_language}
                movieType={movie.media_type}
                movieShot={
                  movie.backdrop_path
                    ? dataURL + movie.backdrop_path
                    : unavailableLandscape
                }
              />
              {/* <Card className="movie_card p-1 m-0 border-0" bg="dark">
                <Card.Img
                  variant="top"
                  src={
                    movie.poster_path
                      ? dataURL + movie.poster_path
                      : unavailable
                  }
                  className="rounded"
                />
                <Card.Body>
                  <Card.Title className="text-light fs-5 fw-bold">
                    {truncate(
                      movie?.title || movie?.name || movie?.original_name,
                      25
                    )}
                  </Card.Title>
                  <Card.Text className="text-danger fs-6">
                    <span className="text-primary">Release Date: </span>
                    {movie?.release_date || movie?.first_air_date}
                  </Card.Text>
                  <Card.Text>
                    {movie.vote_average > 5 ? (
                      <span className="rate text-light bg-success w-25 text-center">
                        {movie.vote_average}
                      </span>
                    ) : (
                      <span className="rate text-light bg-danger  w-25 text-center">
                        {movie.vote_average}
                      </span>
                    )}
                  </Card.Text>
                  <Card.Title className="text-light fs-6">
                    <span className="text-primary">Details: </span>
                    {truncate(movie.overview, 55)}
                  </Card.Title>
                  <Button
                    className="mb-2 btn btn-warning border-0 rounded-pill"
                    onClick={showDetails}
                  >
                    Details
                  </Button>
                </Card.Body>
              </Card> */}
            </Row>
          ))}
      </div>
      <div className="mt-4">
        <CustomPagination setPage={setPage} numOfPages={allData.total_pages} />
      </div>
    </div>
  );
};

export default Series;
