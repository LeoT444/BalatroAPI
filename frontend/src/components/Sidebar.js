import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="balatro-sidebar">
    <div className="balatro-sidebar-header">
      <span role="img" aria-label="cards">🃏</span> Balatro
    </div>
    <nav className="balatro-sidebar-nav">
      <NavLink
        to="/carta"
        className={({ isActive }) =>
          "balatro-sidebar-link" + (isActive ? " active" : "")
        }
      >
        Cartas
      </NavLink>
      <NavLink
        to="/naipe"
        className={({ isActive }) =>
          "balatro-sidebar-link" + (isActive ? " active" : "")
        }
      >
        Naipes
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
