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
    
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      console.log("Файл принят")
      reader.onload = function (e) {
          $('#im-pr').attr('src', e.target.result)
      };
      reader.readAsDataURL(e.target.files[0]);
      console.log("Что то не так")
    };
};

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('phone', this.state.phone);
    formData.append('bio', this.state.bio);
    if (this.state.image.keys) formData.append('image', this.state.image);
    fetch(`/users/${this.props.user.id}`, {
      method: 'PATCH',
      body: formData
    })
    .then((data) => {
      window.location.replace(`/users/${this.props.user.id}`);
    })
    .catch(error=>console.log(error));
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="edit-form">
          <div className="row form-edit">
            <label className="col-3 form-label">Имя:</label>
            <input
              className="col-9 form-field"
              type="text"
              name="user[name]"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="row form-edit">
            <label className="col-3 form-label">Никнейм:</label>
            <input
              className="col-9 form-field"
              type="text"
              name="user[username]"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="row form-edit">
            <label className="col-3 form-label">Почта:</label>
            <input
              className="col-9 form-field email-input"
              type="text"
              name="user[email]"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="row form-edit">
            <label className="col-3 form-label">Телефон:</label>
            <input
              className="col-9 form-field"
              type="text"
              name="user[phone]"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
            />
          </div>
          <div className="row form-edit">
            <label className="col-3 form-label">Био:</label>
            <textarea
            className="col-9 form-field bio-field"
              name="user[bio]"
              value={this.state.bio}
              onChange={this.handleBioChange}
            ></textarea>
          </div>
          <img id="im-pr" src=""/>
          <div className="row form-edit">
            <label className="col-3 form-label">Фото:</label>
            <input
              className="col-9 image-field"
              type="file"
              accept="image/*"
              name="user[image]"
              onChange={this.handleImageChange}
            />
          </div>
          <div className="row form-edit">
            <div className="col-3">
            </div> 
            <div className="col-9">
              <input type="submit" value="Редактировать" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditUser