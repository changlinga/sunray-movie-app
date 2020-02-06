import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PopularMovies from "../components/PopularMovies";
import { popularMoviesActions } from "../actions/moviesActions";

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      popularMoviesActions
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);
