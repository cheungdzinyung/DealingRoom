// Importing modules
import * as React from "react";

// Importing UI elements
import UserMenu from "../../ui/mobile/usermenu";
import PageHeader from "src/components/ui/mobile/pageheader";
import { IConsumptionGraphData, IConsumpGraphDataDeceiveAll } from "src/modules";
import UserProfileGraph from "src/components/ui/mobile/profilegraph";

// Importing fake data
// import { profileConsumptionGraphTest } from "src/fakedata";

// Redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getUserConsumptionByUserToken } from "src/redux/mobile/actions/actions_user";

interface IUserPerformanceProps {
  userConsumptionComparison: IConsumpGraphDataDeceiveAll,
  getConsumption: () => void;
}
interface IUserPerformanceState {
  processedData: IConsumptionGraphData[];
} 

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    userConsumptionComparison: state.customer.user.userConsumptionComparison,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getConsumption: () => {
      dispatch(getUserConsumptionByUserToken());
    }
  };
};

class PurePerformance extends React.Component<
  IUserPerformanceProps,
  IUserPerformanceState
  > {
  constructor(props: IUserPerformanceProps) {
    super(props);

    this.state = {
      processedData: [
        { category: "beer", you: 100, everyone: 200, maxPrice: 250 },
        { category: "shake", you: 190, everyone: 180, maxPrice: 250 },
        { category: "love", you: 100, everyone: 250, maxPrice: 250 },
        { category: "hate", you: 170, everyone: 182, maxPrice: 250 },
        { category: "smart", you: 230, everyone: 100, maxPrice: 250 },
        { category: "power", you: 100, everyone: 90, maxPrice: 250 }
      ]
    };
  }

  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header={"Profile"} subHeader={"You are what you eat"} />
        <UserProfileGraph data={this.state.processedData} />
        <div className="cardd rd-corner">
          <p>
            This is just trying out haha. Thanks for joining us here.
            </p>
        </div>
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