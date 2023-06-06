'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

const CustomNavbar = () => {
  
  // Added the below block of code when was having some errors I didn't 
  // understand, but now doesn't seem to be necessary. Don't want to delete in
  // case the errors come back in.

  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return <></>;

  return (
    <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className='navbar-title' href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="https://www.linkedin.com/in/mark-thompson-a1005184/" target="_blank">
            LinkedIn
          </Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
};

export default CustomNavbar;
