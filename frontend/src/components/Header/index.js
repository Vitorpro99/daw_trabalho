import React from "react";
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import styles from "@/styles/header.module.css";



export default function Header(){
  return (
    <Navbar className={styles.navbar} expand="lg">
      <Container className={styles.container}>
          {/* professora me ajuda ._. */}
        <Navbar.Brand><Image style={{width:"50%"}} src="iconvrumvrum.png"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className={styles.navcollapse}>
          <Nav className={styles.nav1}>
            <NavDropdown className={styles.navdrop} title="Usuários" id="dropdown-usuarios">
              <NavDropdown.Item  className={styles.dropdownitem} href="/listar-usuarios"><a className={styles.a} href="/cadastrar-usuarios">Listar Usuarios</a></NavDropdown.Item >
              <NavDropdown.Item  className={styles.dropdownitem} href="/cadastrar-usuarios"><a className={styles.a} href="/listar-usuarios">Cadastrar Usuário</a></NavDropdown.Item >
            </NavDropdown>
          </Nav>
          <Nav>
          <NavDropdown className={styles.navdrop} title="Veículos" id="dropdown-veiculos">
              <NavDropdown.Item  className={styles.dropdownitem} href="/listar-veiculos"><a className={styles.a} href="/listar-veiculos">Listar veiculos</a></NavDropdown.Item >
              <NavDropdown.Item className={styles.dropdownitem} href="/cadastro-veiculos"><a className={styles.a} href="/cadastro-veiculos">Cadastrar veiculos</a></NavDropdown.Item >
              {/* <NavDropdown.Item className={styles.dropdownitem} href="/editar-veiculos" ><a className={styles.a} href="/editar-veiculos">Editar veiculos</a></NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
          <NavDropdown className={styles.navdrop} title="Concessionárias" id="dropdown-concessionarias">
              <NavDropdown.Item className={styles.dropdownitem} href="/listar-concessionarias"><a className={styles.a} href="listar-concessionarias">Listar concessionárias</a></NavDropdown.Item >
              <NavDropdown.Item className={styles.dropdownitem} href="/cadastro-concessionarias"><a className={styles.a} href="cadastro-concessionarias">Cadastrar concessionárias</a></NavDropdown.Item >
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

