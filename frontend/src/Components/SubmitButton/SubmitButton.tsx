// Importing modules from library
import * as React from "react";

// Importing styling and static assets
import "./SubmitButton.scss";

// States and Props
interface ISubmitButtonProps {
  displayText: string;
  onClick: () => void;
}

// Component
export default class SubmitButton extends React.Component<ISubmitButtonProps> {
  constructor(props: ISubmitButtonProps) {
    super(props);
  }

  public render() {
    return (
      <div className="login-button">
        <button
          className="submit rd-corner"
          type="button"
          onClick={this.props.onClick}
        >
          <span className="submit-text">{this.props.displayText}</span>
        </button>
      </div>
    );
  }
}
