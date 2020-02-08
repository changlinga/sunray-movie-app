import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Person from "../components/Person";
import {
  personGetActions,
  personMovieCreditsAction
} from "../actions/peopleActions";

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      personGetActions,
      personMovieCreditsAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
