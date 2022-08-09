import React, { useState } from "react";
import axios from "axios";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";


import notifications from "../../../assests/JsonData/notification.json";

import user_image from "../../../assests/images/1579037809678.jpg";

import user_menu from "../../../assests/JsonData/user_menus.json";



const curr_user = {
  display_name: localStorage.getItem("user"),
  image: user_image,
};

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user,props) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={props} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <div>
    <Link to={item.link} key={index}>
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  </div>
  
);



const Topnav = (props) => {
  const [profileImage, setprofileImage] = useState();

  function fetchUserDetails ()  {
    axios.get("http://localhost:5000/responsables/profile/" + localStorage.getItem("user")
      )
      .then((res) => {
        setprofileImage(res.data.profileImage);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="topnav">
       {fetchUserDetails()}
      <div className="topnav__search" style={{display:props.show}}>
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user,profileImage)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            className="bx-bell"
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          />
          {/* dropdown here */}
        </div>
      </div>
    </div>
  );
};

export default Topnav;
