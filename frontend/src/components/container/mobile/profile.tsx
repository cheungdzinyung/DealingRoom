// Importing modules
import * as React from "react";

// Importing UI elements
import UserMenu from "../../ui/mobile/usermenu";
import PageHeader from "src/components/ui/mobile/pageheader";
import { IConsumptionGraphData } from "src/modules";
import UserProfileGraph from "src/components/ui/mobile/profilegraph";

// Importing fake data
import { profileConsumptionGraphTest } from "src/fakedata";

// interface IUserProfileProps {
//   userConsumption: IConsumptionGraphData[];
// }
interface IUserProfileState {
  userConsumption: IConsumptionGraphData[];
}

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
            This is just trying out haha.You are what you eat and that's a hell lot of food you are actually eatting with that face hahahahahaha
            </p>
        </div>
        <UserMenu />
      </div>
    );
  }
}
