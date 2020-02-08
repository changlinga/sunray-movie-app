import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MediaItemDetails from "../components/MediaItemDetails";
import {
  movieDetailsAction,
  movieCreditsAction
} from "../actions/moviesActions";

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      movieDetailsAction,
      movieCreditsAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaItemDetails);
