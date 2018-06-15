// Importing modules from library
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { 
    getEntireMenu,
    getUserProfileByUserid,
    getOrdersByUserid
} from "../actions/actions_initialize";


// for redir
import * as History from "history";

interface IInitializeProps {
    // handling redirect
    history: History.History,
    // init
    getEntireMenu: () => void,
    readyMenu: boolean,
    getUserProfileByUserid: (userID: number) => void,
    readyUserProfile: boolean,
    getOrdersByUserid: (userID: number) => void,
    readyOrderList: boolean,
}

// interface IInitializeState {

// }

class PureInitialize extends React.Component<IInitializeProps, {}> {
    constructor(props: IInitializeProps) {
        super(props)
    }

    public componentDidMount() {
        // fetch entireMenu , set categories[]
        this.props.getEntireMenu();

        // fetch user data
        this.props.getUserProfileByUserid(1);

        // fetch ordersList (or not?)
        this.props.getOrdersByUserid(1);

    }

    public componentDidUpdate() {
        if (this.props.readyMenu && this.props.readyOrderList) {
            this.props.history.push("/menu");
        }
    }

    public render () {
        return (
            <div />
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        readyMenu: state.initialize.readyMenu,
        readyUserProfile: state.initialize.readyUserProfile,
        readyOrderList: state.initialize.readyOrderList,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEntireMenu: () => {
            dispatch(getEntireMenu());
          },
          getUserProfileByUserid: (userID: number) => {
              dispatch(getUserProfileByUserid(userID));
          },
          getOrdersByUserid: (userID: number) => {
            dispatch(getOrdersByUserid(userID));
          },
    }
}

const Initialize = connect(mapStateToProps, mapDispatchToProps)(PureInitialize);

export default Initialize;