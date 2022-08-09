import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DefaultUserPic from "../../img/team-male.jpg";
import tw from "twin.macro";
import "./UserProfile.css";
import { PickerOverlay } from "filestack-react";

const axios = require("axios");

const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.id,
      username: this.props.username,
      email: this.props.email,
      adress: this.props.adress,
      tel: this.props.tel,
      password: this.props.password,
      profileImage: false,
      src: false,
      show:false
    };
  }

  fetchUserDetails = () => {
    axios
      .get(
        "http://localhost:5000/responsables/profile/" + localStorage.getItem("user")
      )
      .then((res) => {
        console.log(res);
        this.setState({ email: res.data.email });
        this.setState({ username: res.data.username });
        this.setState({ adress: res.data.adress });
        this.setState({ tel: res.data.tel });
        this.setState({ domaine: res.data.domaine });
        this.setState({ _id: res.data._id });
        this.setState({ password: res.data.password });
        this.setState({ src: res.data.profileImage });
      })
      .catch((err) => console.log(err));
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ ...this.state, [input.name]: input.value });
  };

  UpdateProfileHandler = async (e) => {
    e.preventDefault();
    //create object of form data
    try {
      //update-profile
      localStorage.setItem("user", this.state.email);
      window.location = "/Connect";
      await axios.put(
        "http://localhost:5000/responsables/" + this.state._id,
        {
          username: this.state.username,
          email: this.state.email,
          adress: this.state.adress,
          tel: this.state.tel,
          password: this.state.password,
          profileImage : this.state.src,
          etat:true
        }
      );
      
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    }

    
    
  };

  componentDidMount() {
    this.fetchUserDetails();
  }

  render() {
    if (this.state.src) {
      var profilePic = this.state.src;
    } else {
      profilePic = DefaultUserPic;
    }
    const PickerOptions = {
      maxFiles: 1,
      accept: ["image/*"],
      onClose: () => this.setState({ show : false }),
    };

    return (
      <Container className="profileContainer">
        {this.state.show ? (
        <PickerOverlay
          apikey={"AypHsZmPQ9CX29N3QySPaz"}
          onSuccess={(res) => (this.setState({src : res.filesUploaded[0].url})) }
          pickerOptions={PickerOptions}
          preload={true}
          onUploadDone={() =>this.setState({profileImage: true})}
        />
      ) : null}
        <Row>
          <Col>
            <img className="profilepic" src={profilePic} alt="profile pic" />
          </Col>
          <Col>
            <form
              className="userProfile"
              onSubmit={this.UpdateProfileHandler.bind(this)}
            >
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  required
                  placeholder="username"
                  name="username"
                  defaultValue={this.state.username}
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  name="email"
                  defaultValue={this.state.email}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-address-card"></i>
                <input
                  type="text"
                  required
                  placeholder="Adresse"
                  name="adress"
                  defaultValue={this.state.adress}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-mobile"></i>
                <input
                  type="tel"
                  required
                  placeholder="Telephone"
                  name="tel"
                  defaultValue={this.state.tel}
                  maxLength="8"
                  minLength="8"
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  defaultValue={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <button type="button" className="button-papier"  onClick={() => this.setState({show : true})}>
                Modifider Photo de profile {" "}
              </button>{" "}
              <PrimaryAction type="submit" value="updateProfile">
                Modifider Profile
              </PrimaryAction>
              <PrimaryAction type='button' onClick={()=>window.location = "/home"} style={{padding:15,margin:2,width:180}}>
          Annuler
        </PrimaryAction>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserProfile;
