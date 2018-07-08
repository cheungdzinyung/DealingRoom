// Importing modules
import * as React from "react";

// Importing styling and static assets
import "./CustomerPerformance.scss";

// Importing interfaces from module
import { IConsumpGraphDataDeceiveAll } from "src/modules";

// Importing presentation components
import PageHeader from "src/Components/CustomerPageHeader/pageheader";
import UserProfileGraph from "./Graph/CustomerPerformanceGraph";
import Dialog from "./Dialog/CustomerPerformanceDialog";
import UserMenu from "src/Components/CustomerAccessMenu/CustomerAccessMenu";

// Redux
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import { getUserConsumptionByUserToken } from "src/redux/mobile/actions/actions_user";

// Importing assisting utility functions
import { switchUp } from "src/util/utility";

// States and Props
interface IUserPerformanceProps {
  userConsumptionComparison: IConsumpGraphDataDeceiveAll;
  getConsumption: () => void;
}
const mapStateToProps = (state: IRootState) => {
  return {
    userConsumptionComparison: state.customer.user.userConsumptionComparison
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getConsumption: () => {
      dispatch(getUserConsumptionByUserToken());
    }
  };
};

// Component
class PurePerformance extends React.Component<IUserPerformanceProps, {}> {
  constructor(props: IUserPerformanceProps) {
    super(props);
    // To init the consumption data before rendering the graph
    this.props.getConsumption();
  }

  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header={"Profile"} subHeader={"You are what you eat"} />
        <UserProfileGraph
          data={switchUp(this.props.userConsumptionComparison)}
        />
        <Dialog />
        <UserMenu />
      </div>
    );
  }
}

const Performance = connect(
  mapStateToProps,
  mapDispatchToProps
)(PurePerformance);

export default Performance;
