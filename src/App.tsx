import React, { useState, useEffect } from "react";
import Members from "./components/Members";

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  picture: string;
  city: string;
};

type ApiMember = {
  login: { uuid: string };
  name: {
    first: string;
    last: string;
  };
  phone: string;
  email: string;
  picture: { large: string };
  location: { city: string };
};

enum Status {
  Idle,
  Fetching,
  Success,
  Error,
}

const App = ({ url }: { url: string }) => {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [members, setMembers] = useState<Member[]>([]);
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const [sortDescending, setSortDescending] = useState<boolean>(false);

  useEffect(() => {
    setStatus(Status.Fetching);

    fetch(url)
      .then((response) => response.json())
      .then(({ results }: { results: ApiMember[] }) => {
        setMembers(
          results
            .map(({ login, name, phone, email, picture, location }) => ({
              id: login.uuid,
              firstName: name.first,
              lastName: name.last,
              phone,
              email,
              picture: picture.large,
              city: location.city,
            }))
            .sort((a: Member, b: Member) =>
              a.lastName.localeCompare(b.lastName)
            )
        );
        setStatus(Status.Success);
      })
      .catch((error) => {
        console.error(error);
        setStatus(Status.Error);
      });
  }, []);

  return (
    <main>
      <h1>Meet the Team</h1>
      <nav>
        <button
          className="sort-toggle"
          onClick={() => setSortDescending(!sortDescending)}
        />
        <button className="grid-toggle" onClick={() => setIsGrid(!isGrid)} />
      </nav>
      {status === Status.Success ? (
        <Members
          members={members.sort((a: Member, b: Member) =>
            sortDescending
              ? b.lastName.localeCompare(a.lastName)
              : a.lastName.localeCompare(b.lastName)
          )}
          isGrid={isGrid}
        />
      ) : (
        <ul>
          <li>idle/fetching/error</li>
        </ul>
      )}
    </main>
  );
};

export default App;
