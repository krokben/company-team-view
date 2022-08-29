import React from "react";
import Member from "../Member";
import { Member as MemberType } from "../../App";
import "./members.css";

const Members = ({ members }: { members: MemberType[] }) => (
  <ul className="members">
    {members.map((member) => (
      <Member key={member.id} member={member} />
    ))}
  </ul>
);

export default Members;
