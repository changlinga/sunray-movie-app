import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Person from "../components/Person";
import { personGetActions } from "../actions/peopleActions";

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      personGetActions
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
