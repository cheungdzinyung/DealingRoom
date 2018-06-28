// Importing modules
import * as React from "react";

// Importing UI elements
import UserMenu from "../../ui/mobile/usermenu";
import PageHeader from "src/components/ui/mobile/pageheader";
import { IConsumptionGraphData } from "src/modules";
import UserProfileGraph from "src/components/ui/mobile/profilegraph";

// Importing fake data
import { profileConsumptionGraphTest } from "src/fakedata";

// Redux
// import { connect } from "react-redux";
// import { IRootState } from "../../../redux/store";
// import {
//   getUserConsumptionByUserToken
// } from "../../../redux/mobile/actions/actions_users";

// interface IUserProfileProps {
//   userConsumptionComparison: IConsumptionGraphData[],
// getConsumption:()=>void;
// }
interface IUserProfileState {
  userConsumption: IConsumptionGraphData[];
}


// Redux
// const mapStateToProps = (state: IRootState) => {
//   return {
//     userConsumptionComparison: state.customer.user.userConsumptionComparison,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     getConsumption: () => {
//       dispatch(getUserConsumptionByUserToken());
//     }
//   };
// };

export default class PureProfile extends React.Component<
  {},
  IUserProfileState
  > {
  constructor(props: {}) {
    super(props);
    this.state = {
      userConsumption: profileConsumptionGraphTest
    };
  }

  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header={"Profile"} subHeader={"You are what you eat"} />
        <UserProfileGraph data={this.state.userConsumption} />
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



// const Profile = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PureProfile);

// export default Profile;