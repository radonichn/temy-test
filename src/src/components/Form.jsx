import React, { Component } from "react";
import User from "./User";
class Form extends Component {
  state = {
    users: [],
    countries: [],
    states: [],
    cities: [],
    country_id: false,
    state_id: false,
    city_id: false,
    showStates: false,
    showCities: false,
    name: "",
    nameValid: false,
    email: "",
    emailValid: false,
    phone_number: "",
    phoneValid: false,
    address: "",
    about_me: "",
    aboutValid: true,
    formValid: false,
    fieldErrors: {},
    requestSent: false
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
    const { fieldErrors } = this.state;
    if (id !== "") {
      fieldErrors.country = "";
      this.queryByName(`countries/${id}/states`).then(states =>
        this.setState({
          states,
          country_id: id,
          showStates: true,
          showCities: false,
          fieldErrors
        })
      );
    } else {
      fieldErrors.country = "Please select the country";
      this.setState({
        showStates: false,
        fieldErrors
      });
    }
  };
  handleState = e => {
    const id = e.target.value;
    const { fieldErrors } = this.state;
    if (id !== "") {
      fieldErrors.state = "";
      this.queryByName(`cities?state_id=${id}`).then(cities =>
        this.setState({
          cities,
          state_id: id,
          showCities: true,
          fieldErrors
        })
      );
    } else {
      fieldErrors.state = "Please select the state";
      this.setState({
        showCities: false,
        fieldErrors
      });
    }
  };
  validateField = (name, value) => {
    let {
      nameValid,
      emailValid,
      phoneValid,
      aboutValid,
      fieldErrors
    } = this.state;
    switch (name) {
      case "name":
        nameValid = /^[a-z][a-z\s]*$/i.test(value);
        fieldErrors.name = nameValid
          ? ""
          : "Name should contain only latin letters";
        break;
      case "email":
        emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
        fieldErrors.email = emailValid ? "" : "Email is invalid.";
        break;
      case "phone_number":
        phoneValid = value.match(/[0-9]/);
        fieldErrors.phone = phoneValid
          ? ""
          : "Phone should contain only numbers";
        break;
      case "about_me":
        aboutValid = value.length < 500;
        fieldErrors.about = aboutValid
          ? ""
          : "This field should contain maximum 500 letters";
        break;
      default:
        break;
    }
    this.setState({
      nameValid,
      emailValid,
      phoneValid,
      aboutValid,
      fieldErrors
    });
  };
  validateForm = () => {
    const {
      nameValid,
      emailValid,
      phoneValid,
      country_id,
      aboutValid,
      state_id,
      city_id
    } = this.state;
    return (
      nameValid &&
      emailValid &&
      phoneValid &&
      country_id &&
      state_id &&
      city_id &&
      aboutValid
    );
    // this.setState({
    //   formValid:
    //     nameValid &&
    //     emailValid &&
    //     phoneValid &&
    //     country_id &&
    //     state_id &&
    //     city_id
    // });
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.validateForm()) {
      let {
        name,
        email,
        phone_number,
        address,
        about_me,
        country_id,
        state_id,
        city_id
      } = this.state;
      address = address === "" ? null : address;
      about_me = about_me === "" ? null : about_me;
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
          city_id
        })
      });
      this.getUsers();
      this.setState({
        requestSent: true,
        name: "",
        email: "",
        phone_number: "",
        country_id: null,
        state_id: null,
        city_id: null,
        address: "",
        about_me: ""
      });
    } else {
      alert("An error occured!");
    }
  };

  componentDidMount = () => {
    this.getUsers();
    this.queryByName("countries").then(countries =>
      this.setState({ countries })
    );
  };
  componentDidUpdate = () => {
    if (this.state.requestSent) {
      setTimeout(() => {
        this.setState({ requestSent: false });
      }, 1000);
    }
  };
  render() {
    return (
      <div className="wrapper">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="required">
              Enter name
            </label>
            <input
              type="text"
              className="form-control required"
              id="name"
              placeholder="John doe"
              name="name"
              value={this.state.name}
              onChange={this.handleUserInput}
              required
            />
            <small className="form-text danger">
              {this.state.fieldErrors.name}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="required">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="johndoe@gmail.com"
              name="email"
              value={this.state.email}
              onChange={this.handleUserInput}
              required
            />
            <small className="form-text danger">
              {this.state.fieldErrors.email}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="country" className="required">
              Select the country
            </label>
            <select
              className="form-control"
              id="country"
              onChange={this.handleCountry}
              required
            >
              <option value="">Choose country</option>
              {this.state.countries.map(country => (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            <small className="form-text danger">
              {this.state.fieldErrors.country}
            </small>
          </div>
          {this.state.showStates && (
            <div className="form-group">
              <label htmlFor="state" className="required">
                Select the state
              </label>
              <select
                className="form-control"
                id="state"
                onChange={this.handleState}
                required
              >
                <option value="">Choose state</option>
                {this.state.states.map(state => (
                  <option value={state.id} key={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
              <small className="form-text danger">
                {this.state.fieldErrors.state}
              </small>
            </div>
          )}
          {this.state.showStates && this.state.showCities && (
            <div className="form-group">
              <label htmlFor="city" className="required">
                Select the city
              </label>
              <select
                className="form-control"
                id="city"
                onChange={e => {
                  const { fieldErrors } = this.state;
                  fieldErrors.city =
                    e.target.value !== "" ? "" : "Please chose the city";

                  this.setState({
                    city_id: e.target.value,
                    fieldErrors
                  });
                }}
                required
              >
                <option value="">Choose city</option>
                {this.state.cities.map(city => (
                  <option value={city.id} key={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <small className="form-text danger">
                {this.state.fieldErrors.city}
              </small>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="phone" className="required">
              Phone number
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="0506427852"
              name="phone_number"
              value={this.state.phone_number}
              onChange={this.handleUserInput}
              required
            />
            <small className="form-text danger">
              {this.state.fieldErrors.phone}
            </small>
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
            <small className="form-text danger">
              {this.state.fieldErrors.about}
            </small>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!this.validateForm()}
          >
            Submit
          </button>
          {this.state.requestSent && (
            <small className="form-text success">
              Message was successfully sent
            </small>
          )}
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
