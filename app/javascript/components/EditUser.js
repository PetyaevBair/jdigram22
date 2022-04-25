import React from "react"
import PropTypes from "prop-types"
class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      username: this.props.user.username,
      email: this.props.user.email,
      phone: this.props.user.phone,
      bio: this.props.user.bio,
      image: {}
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleBioChange(e) {
    this.setState({ bio: e.target.value });
  }

  handleImageChange(e) {
    // this.setState({ image: e.target.files[0] });\
    this.setState({ image: e.target.files[0] });
  }

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('phone', this.state.phone);
    formData.append('bio', this.state.bio);
    formData.append('image', this.state.image);
    
    fetch(`/users/${this.props.user.id}`, {
      method: 'PATCH',
      body: formData
    })   
    .catch(error=>console.log(error));
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Имя:</label>
            <input
              type="text"
              name="user[name]"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <label>Никнейм:</label>
            <input
              type="text"
              name="user[username]"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <label>Почта:</label>
            <input
              type="text"
              name="user[email]"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div>
            <label>Телефон:</label>
            <input
              type="text"
              name="user[phone]"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
            />
          </div>
          <div>
            <label>Био:</label>
            <textarea
              name="user[bio]"
              value={this.state.bio}
              onChange={this.handleBioChange}
            ></textarea>
          </div>
          <div>
            <label>Фото:</label>
            <input
              type="file"
              accept="image/*"
              name="user[image]"
              onChange={this.handleImageChange}
            />
          </div>
          <div>
            <input type="submit" value="Редактировать" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditUser