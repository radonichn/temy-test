import React, { Component } from "react";
class User extends Component {
  state = {
    user: this.props.user,
    countryName: "",
    stateName: "",
    cityName: ""
  };
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  getNameById = (id, parameter) => {
    const result = fetch(`http://localhost:3000/${parameter}?id=${id}`)
      .then(res => res.json())
      .then(data => data[0].name);
    return result;
  };
  getDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getDate()} ${
      this.months[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  componentDidMount = () => {
    const { country_id, state_id, city_id } = this.state.user;
    this.getNameById(country_id, "countries").then(res =>
      this.setState({ countryName: res })
    );
    this.getNameById(state_id, "states").then(res =>
      this.setState({ stateName: res })
    );
    this.getNameById(city_id, "cities").then(res =>
      this.setState({ cityName: res })
    );
  };
  render() {
    const { name, email, phone_number, createdAt } = this.state.user;
    const { countryName, stateName, cityName } = this.state;
    return (
      <div className="user">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone_number}</p>
        <p>Country: {countryName}</p>
        <p>State: {stateName}</p>
        <p>City: {cityName}</p>
        <p>Creation date: {this.getDate(createdAt)}</p>
      </div>
    );
  }
}

export default User;
