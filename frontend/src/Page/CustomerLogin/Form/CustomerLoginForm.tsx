// Importing modules from library
import * as React from "react";

// Importing styling and static assets
import "./CustomerLoginForm.scss";
// Importing presentation components
// Importing assisting utility functions
// Importing interfaces from module

// States and Props
interface ICustomerLoginFormProps {
  username: string;
  password: string;
  usernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// interface ITemplateState {}

// Component
export default class CustomerLoginForm extends React.Component<
  ICustomerLoginFormProps
> {
  constructor(props: ICustomerLoginFormProps) {
    super(props);
  }

  public render() {
    return (
      <form className="form" action="">
        <input
          className="form-input rd-corner"
          name="username"
          type="text"
          placeholder="Username"
          value={this.props.username}
          onChange={this.props.usernameChange}
        />
        <input
          className="form-input rd-corner"
          placeholder="Passwords"
          name="password"
          type="password"
          value={this.props.password}
          onChange={this.props.passwordChange}
        />
      </form>
    );
  }
}
