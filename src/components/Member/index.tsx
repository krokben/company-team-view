import React from "react";
import { Member as MemberType } from "../../App";

const Member = ({ member }: { member: MemberType }) => (
  <li>{`${member.firstName} ${member.lastName}`}</li>
);

export default Member;
