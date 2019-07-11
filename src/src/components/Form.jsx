import React, { Component } from "react";
import User from "./User";
class Form extends Component {
  state = {
    users: [],
    countries: [],
    states: [],
    cities: [],
    country_id: null,
    state_id: null,
    city_id: null,
    showStates: false,
    showCities: false,
    name: "",
    email: "",
    phone_number: "",
    address: "",
    about_me: ""
  };
  getUsers = async () => {
    const users = await fetch("http://localhost:3000/users").then(res =>
      res.json()
    );
    this.setState({ users });
  };
  queryByName = async name => {
    return await fetch(`http://localhost:3000/${name}`).then(res => res.json());
  };
  handleCountry = e => {
    const id = e.target.value;
    if (id !== "") {
      this.queryByName(`countries/${id}/states`).then(states =>
        this.setState({
          states,
          country_id: id,
          showStates: true,
          showCities: false
        })
      );
    } else {
      this.setState({ showStates: false });
    }
  };
  handleState = e => {
    const id = e.target.value;
    if (id !== "") {
      this.queryByName(`cities?state_id=${id}`).then(cities =>
        this.setState({
          cities,
          state_id: id,
          showCities: true
        })
      );
    } else {
      this.setState({ showCities: false });
    }
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      email,
      phone_number,
      address,
      about_me,
      country_id,
      state_id,
      city_id
    } = this.state;
    const createdAt = new Date().getTime();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone_number,
        address,
        about_me,
        country_id,
        state_id,
        city_id,
        createdAt
      })
    });
    this.getUsers();
  };

  componentDidMount = () => {
    this.getUsers();
    this.queryByName("countries").then(countries =>
      this.setState({ countries })
    );
  };
  render() {
    return (
      <div className="wrapper">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Enter name</label>
            <input
              type="text"
              className="form-control required"
              id="name"
              placeholder="John doe"
              name="name"
              value={this.state.name}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="johndoe@gmail.com"
              name="email"
              value={this.state.email}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Select the country</label>
            <select
              className="form-control"
              id="country"
              onChange={this.handleCountry}
            >
              <option value="">Choose country</option>
              {this.state.countries.map(country => (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          {this.state.showStates && (
            <div className="form-group">
              <label htmlFor="state">Select the state</label>
              <select
                className="form-control"
                id="state"
                onChange={this.handleState}
              >
                <option value="">Choose state</option>
                {this.state.states.map(state => (
                  <option value={state.id} key={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {this.state.showStates && this.state.showCities && (
            <div className="form-group">
              <label htmlFor="city">Select the city</label>
              <select
                className="form-control"
                id="city"
                onChange={e => this.setState({ city_id: e.target.value })}
              >
                <option value="">Choose city</option>
                {this.state.cities.map(city => (
                  <option value={city.id} key={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="0506427852"
              name="phone_number"
              value={this.state.phone_number}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Some street 3"
              name="address"
              value={this.state.address}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="about">About me</label>
            <textarea
              id="about"
              name="about_me"
              placeholder="About me..."
              value={this.state.about_me}
              onChange={this.handleUserInput}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="users">
          {this.state.users.map(user => (
            <User user={user} key={user.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Form;
