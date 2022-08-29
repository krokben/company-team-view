import React from "react";
import { Member as MemberType } from "../../App";
import "./member.css";

const Member = ({ member }: { member: MemberType }) => (
  <li className="member">
    <img
      className="member__picture"
      src={member.picture}
      alt={`Photo of ${member.firstName} ${member.lastName}`}
    />
    <div className="member__profile">
      <h2 className="member__name">{`${member.firstName} ${member.lastName}`}</h2>
      <p className="member__city">{member.city}</p>
      <div className="member__contact">
        <i className="member__icon member__icon--email" />
        <i className="member__icon member__icon--phone" />
      </div>
    </div>
  </li>
);

export default Member;
