import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Search from "../components/Search";
import { searchMoviesActions } from "../actions/searchActions";

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchMoviesActions
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
