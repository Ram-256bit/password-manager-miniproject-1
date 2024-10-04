// PasswordManager.js
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './index.css';
import PasswordItem from './PasswordItem';

class PasswordManager extends Component {
  state = {
    passwordRecords: [],
    inputUrl: '',
    inputName: '',
    inputPassword: '',
    searchInput: '',
  };

  deletePasswordRecord = (id) => {
    const filteredRecords = this.state.passwordRecords.filter(record => record.id !== id);
    this.setState({ passwordRecords: filteredRecords });
  };

  toggleShowPassword = (id) => {
    this.setState(prevState => ({
      passwordRecords: prevState.passwordRecords.map(record =>
        record.id === id ? { ...record, showPassword: !record.showPassword } : record
      )
    }));
  };

  getSearchRecords = () => {
    const { passwordRecords, searchInput } = this.state;
    return passwordRecords.filter(record =>
      record.url.toLowerCase().includes(searchInput.toLowerCase()),
    );
  };

  onInputUrlChange = (e) => {
    this.setState({ inputUrl: e.target.value });
  };

  onInputNameChange = (e) => {
    this.setState({ inputName: e.target.value });
  };

  onInputPasswordChange = (e) => {
    this.setState({ inputPassword: e.target.value });
  };

  onSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  addPasswordRecord = async (e) => {
    e.preventDefault();
    const { inputUrl, inputName, inputPassword } = this.state;

    const newRecord = { url: inputUrl, name: inputName, password: inputPassword };

    // Send POST request to backend API to add new password record
    await axios.post('http://localhost:5000/api/passwords', newRecord);

    this.setState(prevState => ({
      passwordRecords: [...prevState.passwordRecords, { id: uuidv4(), ...newRecord, showPassword: false }],
      inputUrl: '',
      inputName: '',
      inputPassword: '',
    }));
  };

  render() {
    const searchResults = this.getSearchRecords();

    return (
      <div className="app-container">
        <h1>Password Manager</h1>
        <form onSubmit={this.addPasswordRecord}>
          <input type="text" placeholder="Website" value={this.state.inputUrl} onChange={this.onInputUrlChange} />
          <input type="text" placeholder="Username" value={this.state.inputName} onChange={this.onInputNameChange} />
          <input type="password" placeholder="Password" value={this.state.inputPassword} onChange={this.onInputPasswordChange} />
          <button type="submit">Add</button>
        </form>
        <ul>
          {searchResults.map(record => (
            <PasswordItem
              key={record.id}
              record={{ ...record }}
              deletePasswordRecord={this.deletePasswordRecord}
              toggleShowPassword={() => this.toggleShowPassword(record.id)} // Pass down toggle function
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default PasswordManager;
