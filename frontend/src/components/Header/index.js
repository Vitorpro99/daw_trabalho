import React from "react";
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import styles from "@/styles/header.module.css";



export default function Header(){
  return (
    <Navbar className={styles.navbar} expand="lg">
      <Container className={styles.container}>
        
        <Navbar.Brand><Image src="./iconvrumvrum.png"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className={styles.navcollapse}>
          <Nav className={styles.nav1}>
            <NavDropdown title="Usuários" id="dropdown-usuarios">
              <NavDropdown.Item href="/listar-usuarios">Listar Usuários</NavDropdown.Item>
              <NavDropdown.Item href="/cadastrar-usuarios">Cadastrar Usuário</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <NavDropdown title="Veículos" id="dropdown-veiculos">
              <NavDropdown.Item href="/listar-veiculos">Listar Veículos</NavDropdown.Item>
              <NavDropdown.Item href="/cadastrar-veiculos">Cadastrar Veículo</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <NavDropdown title="Concessionárias" id="dropdown-concessionarias">
              <NavDropdown.Item href="/listar-concessionarias">Listar Concessionárias</NavDropdown.Item>
              <NavDropdown.Item href="/cadastrar-concessionarias">Cadastrar Concessionária</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

