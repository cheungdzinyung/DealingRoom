// Importing modules from library
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { getEntireMenu } from "../actions/actions_initialize";

// for redir
import * as History from "history";

interface IInitializeProps {
    // handling redirect
    history: History.History,
    // init
    getEntireMenu: () => void,
    readyMenu: boolean,
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


        // fetch ordersList


    }

    public componentDidUpdate() {
        if (this.props.readyMenu) {
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
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEntireMenu: () => {
            dispatch(getEntireMenu());
          },
    }
}

const Initialize = connect(mapStateToProps, mapDispatchToProps)(PureInitialize);

export default Initialize;