import React from "react";
import classnames from "classnames";
import LoadingSpinner from "../LoadingSpinner";
import { Member as MemberType } from "../../App";
import "./members.css";

const LazyMember = React.lazy(() => import("../Member"));

const Members = ({
  members,
  isGrid,
}: {
  members: MemberType[];
  isGrid: boolean;
}) => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <ul
      className={classnames("members", {
        "members--grid": isGrid,
      })}
      data-testid={isGrid && "members-grid"}
    >
      {members.map((member) => (
        <LazyMember key={member.id} member={member} isGrid={isGrid} />
      ))}
    </ul>
  </React.Suspense>
);

export default Members;
