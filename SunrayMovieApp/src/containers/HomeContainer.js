import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "../components/Home";
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
