import React from "react";
import { Member as MemberType } from "../../App";
import "./member.css";

const getMaxCharName = (name: string) =>
  `${name.length > 13 ? name.substr(0, 9) : name}…`;

const Member = ({
  member,
  isGrid,
}: {
  member: MemberType;
  isGrid: boolean;
}) => (
  <li className="member">
    <img
      className="member__picture"
      src={member.picture}
      alt={`Photo of ${member.firstName} ${member.lastName}`}
    />
    <h2 className="member__name">
      {isGrid
        ? getMaxCharName(`${member.firstName} ${member.lastName}`)
        : `${member.firstName} ${member.lastName}`}
    </h2>
    <div className="member__profile">
      <p className="member__city">{member.city}</p>
      <div className="member__contact">
        <i className="member__icon member__icon--email" />
        <i className="member__icon member__icon--phone" />
      </div>
    </div>
  </li>
);

export default Member;
