import React, { Component } from 'react';
import './index.css'; 
import { BiArrowBack } from 'react-icons/bi'; 
import { IoWalletOutline, IoCartOutline } from 'react-icons/io5'; 
import { CiLocationOn, CiSearch } from 'react-icons/ci'; 

class MainComponent extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-left">

            <BiArrowBack className="icon back-arrow" />

            <span className="location">
              <strong><p className='strong_item'>Billekahali</p> <CiLocationOn className="icon location-icon" /></strong> 
              <span className="sub-location">Sarvabhomanagar Billekahal...</span>
            </span>
          </div>

          <div className="navbar-center">
            <input type="text" className="search-bar" placeholder="Find Labs and Diagnostics centers" />
            <CiSearch className="icon search-icon" />
          </div>
    
          <div className="navbar-right">
            <div className="icon-container">
              <IoWalletOutline className="icon wallet-icon" />
              <span className="notification wallet-notification">4529</span>
            </div>
            <div className="icon-container">
              <IoCartOutline className="icon cart-icon" />
              <span className="notification cart-notification">1</span>
            </div>
          </div>
        </nav>

   
      </div>
    );
  }
}

export default MainComponent;
