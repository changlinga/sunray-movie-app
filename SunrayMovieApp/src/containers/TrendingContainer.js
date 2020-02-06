import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Trending from "../components/Trending";
import { trendingGetActions } from "../actions/trendingActions";

const mapStateToProps = (state, ownProps) => {
  return {
    trending: state.trending
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      trendingGetActions
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
