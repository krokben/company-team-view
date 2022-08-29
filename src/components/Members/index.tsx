import React from "react";
import Member from "../Member";
import { Member as MemberType } from "../../App";

const Members = ({ members }: { members: MemberType[] }) => (
  <ul>
    {members.map((member) => (
      <Member key={member.id} member={member} />
    ))}
  </ul>
);

export default Members;
