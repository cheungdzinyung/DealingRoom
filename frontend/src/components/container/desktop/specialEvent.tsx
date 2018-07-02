// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
// import OrderCard from "../../ui/desktop/ordercard";
import { TimePicker } from "@blueprintjs/datetime";

// for redir
import * as History from "history";
import { withRouter } from "react-router";

// import { ISpecialEvent } from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
// import { specialEventTrigger } from "../../../redux/desktop/actions/actions_manager";

export interface ISpecialEvent {
    sponsor: string,
    percentage: number,
    description: string,
    eventTime: Date,          // date.now()
}

interface ICurrentOrdersProps {
    specialEventTrigger: (eventDetails: ISpecialEvent) => void,
    // handling redirect
    // customerProfile: IUserProfile,
    history: History.History,
}

const mapStateToProps = (state: IRootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        // specialEventTrigger: () => {
        //     dispatch(specialEventTrigger());
        // },
    };
};

interface ISpecialEventState {
    sponsor: string,
    percentage: number,
    description: string,
    eventTime: Date,
}

class PureSpecialEvent extends React.Component<ICurrentOrdersProps, ISpecialEventState> {
    constructor(props: ICurrentOrdersProps) {
        super(props);

        this.state = {
            sponsor: "",
            percentage: 0,
            description: "",
            eventTime: new Date,
        }
    }

    // public componentWillMount() {    }

    // public componentDidMount() {}

    public sponsor = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            sponsor: e.target.value
        })
    }

    public percentage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let num = parseInt(e.target.value, 10);
        if (num > 100) { num = 100 }
        if (num < 0) { num = 0 }
        this.setState({
            percentage: num
        })
    }

    public description = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: e.target.value
        })
    }

    public eventTime = (newTime: Date) => {
        this.setState({
            eventTime: newTime
        })
    }

    public render() {
        return (
            // tslint:disable-next-line:no-unused-expression
            <div className="desktop-page-container">
                <AdminSideMenu />
                <div className="currentorder-container-center">
                    <div className="currentorder-wrapper">
                        <div className="currentorder-header">
                            <PageHeader header="Special Event" />
                        </div>
                        <div className="special-event">
                            <div className="box">
                                <h5>Sponsor</h5>
                                <input
                                    type="text"
                                    className="event-box event-box-text"
                                    placeholder="sponsor"
                                    value={this.state.sponsor}
                                    onChange={this.sponsor} />
                            </div>
                            <div className="box">
                                <h5>Discount percentage (%)</h5>
                                <input
                                    type="number"
                                    className="event-box event-box-text"
                                    placeholder="percentage"
                                    max="100"
                                    min="0"
                                    value={this.state.percentage}
                                    onChange={this.percentage} />
                            </div>
                            <div className="box">
                                <h5>Event Message</h5>
                                <input
                                    type="text"
                                    className="event-box event-box-text"
                                    placeholder="description"
                                    value={this.state.description}
                                    onChange={this.description} />
                            </div>
                            <div className="box">
                                <h5>Trigger Time</h5>
                                <TimePicker
                                    className="event-box event-box-time"
                                    showArrowButtons={true}
                                    useAmPm={false}
                                    value={this.state.eventTime}
                                    onChange={this.eventTime} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const SpecialEvent = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureSpecialEvent);

export default withRouter(SpecialEvent as any);