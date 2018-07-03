import * as React from "react";

// Importing styling and static assets
import "./AdminPageHeader.scss";

interface IPageHeaderProps {
    header: string;
    subHeader: string;
}

export default class PageHeader extends React.Component<IPageHeaderProps>{
    constructor(props: IPageHeaderProps) {
        super(props);
    }
    public render() {
        return (
            <div className="pageHeader">
                <h1 className="header">{this.props.header}</h1>
                <h3 className="subHeader">{this.props.subHeader}</h3>
            </div>
        );
    }
}
