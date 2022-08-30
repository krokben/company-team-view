import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import { Member as MemberType } from "../../App";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
  <li className="member" tabIndex={1}>
    <LazyLoadImage
      className="member__picture"
      src={member.picture}
      alt={`Photo of ${member.firstName} ${member.lastName}`}
      placeholder={<LoadingSpinner />}
    />
    <h2 className="member__name">
      {isGrid
        ? getMaxCharName(`${member.firstName} ${member.lastName}`)
        : `${member.firstName} ${member.lastName}`}
    </h2>
    <div className="member__profile">
      <p className="member__city">{member.city}</p>
      <div className="member__contact">
        <a
          className="member__icon member__icon--email"
          href={`mailto:${member.email}`}
          target="_blank"
        />
        <a
          className="member__icon member__icon--phone"
          href={`tel:${member.phone}`}
        />
      </div>
    </div>
  </li>
);

export default Member;
