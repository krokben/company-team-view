import React from "react";
import classnames from "classnames";
import Member from "../Member";
import { Member as MemberType } from "../../App";
import "./members.css";

const Members = ({
  members,
  isGrid,
}: {
  members: MemberType[];
  isGrid: boolean;
}) => (
  <ul
    className={classnames("members", {
      "members--grid": isGrid,
    })}
  >
    {members.map((member) => (
      <Member key={member.id} member={member} isGrid={isGrid} />
    ))}
  </ul>
);

export default Members;
