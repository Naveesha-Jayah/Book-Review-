import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav style={styles.navBar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/create" style={styles.navLink}>
            ADD REVIEW
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/reviewDetails" style={styles.navLink}>
            VIEW REVIEW DETAILS
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navBar: {
    backgroundColor: "#333",
    padding: "10px 20px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 10px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default Nav;
