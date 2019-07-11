import React, { Component } from 'react';
class Form extends Component {
    state = {  }
    handleSubmit = e => {
        e.preventDefault();
    }
    render() { 
        return (
<form className="form" onSubmit={this.handleSubmit}>
  <div class="form-group">
    <label htmlFor="name">Email name</label>
    <input type="text" className="form-control" id="name"placeholder="Enter name"/>
  </div>
  <div class="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email"placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="country">Select the country</label>
  <select class="form-control" id="country">
      <option value>Choose country</option>
      <option value="Ukraine">Ukraine</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="state">Select the state</label>
  <select class="form-control" id="state">
      <option value>Choose state</option>
      <option value="Ukraine">Ukraine</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="city">Select the city</label>
  <select class="form-control" id="city">
      <option value>Choose city</option>
      <option value="Ukraine">Ukraine</option>
    </select>
  </div>
  <div class="form-group">
    <label htmlFor="phone">Phone number</label>
    <input type="number" className="form-control" id="phone"placeholder="Enter phone"/>
  </div>
  <div class="form-group">
    <label htmlFor="address">Address</label>
    <input type="text" className="form-control" id="address"placeholder="Enter address"/>
  </div>
  <div class="form-group">
    <label htmlFor="about">About me</label>
    <textarea id="about" ></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        );
    }
}
 
export default Form;