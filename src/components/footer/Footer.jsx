import axios from "axios";
import React from "react";
import { useState } from "react";
import {useForm} from 'react-hook-form'
import arrowR from "../../assets/arrow-right.svg";
import arrowD from "../../assets/arrow-down.svg";

import Popup from "../popup/Popup";


import style from "./Footer.module.scss";

import { Link, animateScroll as scroll } from "react-scroll";

const Footer = () => {
  const [activePopup,setActivePopup]=useState(false);


  const {
    register,
    formState:{
      errors,
      isValid
    },
    handleSubmit,
    reset,
  } =useForm({
    mode: 'onChange'
  });
  const onSubmit = async (data) => {
    try {
      const email = {
        email: JSON.stringify(data.email).split('').filter(item => item !== '"').join('')
      };
  
      const response = await fetch('https://662bda8ade35f91de159afbe.mockapi.io/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      });
  
      if (response.ok) {
        setActivePopup(true);
        reset();
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const [changeArrow,setChangeArrow]  = React.useState(false)

  const activeAnimation =()=>{
    setChangeArrow(true)
  
    
  }

  return(
  <footer className={style.conteiner}>
    <form  onSubmit={handleSubmit(onSubmit)} className={style.conteiner_form}>
      <input type="email"  className={style.conteiner_form_email} 
      {...register('email', {
        required: 'Email is required',
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: `Email must have format: 8LZsK@example.com`,
        },
      })}
      placeholder='Enter your Email and get notified'
      />
       {errors.email && <h3>{errors.email.message}</h3>}
       <button type="submit" className={style.btn} disabled={!isValid}>
        <img src={arrowR} alt="" />
      </button>
    </form>
    <div className={changeArrow?style.conteiner_btn_events_change :style.conteiner_btn_events}>

    <Link
      activeClass="active"
      to="eventPage"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      href="#eventPage" 
    >
      <div className={style.block} onClick={() => activeAnimation()}>
        Other Events
        <img src={arrowD} alt="" className={changeArrow ? style.changed_arrow : style.basic_arrow} />
      </div>
      {changeArrow && <div className={style.border}></div>}
    </Link>

    </div>
    {
      activePopup && <Popup active={activePopup} setActive={setActivePopup}/>
    }
  </footer>)
};

export default Footer;
