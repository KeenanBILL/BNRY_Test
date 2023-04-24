import React from "react";

export default function Catalogue(link) {
  return (
    <button
      className="btn-categories"
      onClick={link.changeURL}
      value={link.link.id}
    >
      {link.link.name}
    </button>
    );
  }