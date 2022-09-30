import Link from "next/link";
import React from "react";

export default function CardPost() {
  return (
    <div className="wrapper">
      <div className="card-header">
        <Link href="/">
          <a className="left">
            <p>image</p>
            <div className="profile">
              <p>username</p>
              <p>date</p>
            </div>
          </a>
        </Link>
        <p>more</p>
      </div>

      <div className="card-body"></div>
    </div>
  );
}
