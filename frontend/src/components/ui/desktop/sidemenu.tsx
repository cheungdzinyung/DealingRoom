// Importing modules from library
import * as History from "history";
import * as React from "react";
import { withRouter } from "react-router";

// Importing static assets
import logo from "../../assets/icons/all/logo.svg"
// Importing menu icons
import glass from "../../assets/icons/desktop/sidemenu/glass.svg"
import info from "../../assets/icons/desktop/sidemenu/info.svg"
import bell from "../../assets/icons/desktop/sidemenu/bell.svg"
import users from "../../assets/icons/desktop/sidemenu/users.svg"

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
                <div className="corner">
                    <img className="corner-logo" src={logo} alt="" />
                    <span className="corner-name">Dealing Room</span>
                </div>
                <div className="menu">
                    <div className="menu-section">
                        <span className="section-header">Management</span>
                        <div className="section-pages">
                            <div className="section-page-line">
                                <img src={glass} alt="" className="page-line-icon" />
                                <span className="page-line-text">
                                    Stock Management</span>
                            </div>
                            <div className="section-page-line">
                                <img src={users} alt="" className="page-line-icon" />
                                <span className="page-line-text">
                                    Staff Management</span>
                            </div>
                        </div>
                    </div>
                    <div className="menu-section">
                        <span className="section-header">Service</span>
                        <div className="section-pages">
                            <div className="section-page-line">
                                <img src={info} alt="" className="page-line-icon" />
                                <span className="page-line-text">
                                    Current Orders</span>
                            </div>
                        </div>
                    </div>
                    <div className="menu-section">
                        <span className="section-header">Bar/Kitchen</span>
                        <div className="section-pages">
                            <div className="section-page-line">
                                <img src={bell} alt="" className="page-line-icon" />
                                <span className="page-line-text">
                                    Pending Orders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
