import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import banner from "../../img/banner.png";

export const VistaProfile = () => {
  const { store, actions } = useContext(Context);


  

  return (
    <div className="container-fluid color-back">
        <div>
            avatar
        </div>
        <div>
        <img className="banner" src={banner} />
        </div>
      <ul className="list-group flex-row justify-content-evenly">
        {store.vistaProfile.map((item, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between select`}
          >
            <Link to={"/myProfile/" + index} onClick={() => handleLinkClick(index)}>
              <span className="select">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};

