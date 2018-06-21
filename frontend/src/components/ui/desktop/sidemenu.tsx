// Importing modules from library
import * as History from "history";
import * as React from "react";
import { withRouter } from "react-router";

// Importing static assets


// import redux and friends

interface IUserMenuProps {
    history: History.History,

}

class AdminSideMenu extends React.Component<IUserMenuProps, {}> {
    constructor(props: IUserMenuProps) {
        super(props);
    }

    public toStockManagement = () => {
        this.props.history.push(`/admin/stock`);
    };
    //   public toStaffManagement = () => {
    //     this.props.history.push(`/order`);
    //   };
    //   public toCurrentOrder = () => {
    //     this.props.history.push(`/payment`);
    //   };
    //   public toPendingOrder = () => {
    //     this.props.history.push(`/setting`);
    //   };


    public render() {
        return (
            <div className="admin-menu">
                123</div>
        );
    }
}

// const mapStateToProps = (state: IRootState) => {
//   return {
//     unpaidOrders: state.orders.unpaidOrders,
//   }
// }

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     changePage: (targetPage: string) => {
//       dispatch(changePage(targetPage));
//     },
//   }
// }

// const UserMenu = connect(mapStateToProps, mapDispatchToProps)(PureUserMenu);

export default withRouter(AdminSideMenu as any);
