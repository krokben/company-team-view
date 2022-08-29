import React, { useState, useEffect } from "react";

type Member = {
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
  picture: { thumbnail: string };
  location: { city: string };
};

enum Status {
  Idle,
  Fetching,
  Success,
  Error,
}

const App = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [status, setStatus] = useState<Status>(Status.Idle);

  useEffect(() => {
    setStatus(Status.Fetching);

    fetch("https://randomuser.me/api/?results=50")
      .then((response) => response.json())
      .then(({ results }: { results: ApiMember[] }) => {
        setMembers(
          results.map(({ login, name, phone, email, picture, location }) => ({
            id: login.uuid,
            firstName: name.first,
            lastName: name.last,
            phone,
            email,
            picture: picture.thumbnail,
            city: location.city,
          }))
        );
        setStatus(Status.Success);
      })
      .catch((error) => {
        console.error(error);
        setStatus(Status.Error);
      });
  }, []);

  return (
    <div>
      {
        <ul>
          {status === Status.Success ? (
            members.map(({ id, firstName, lastName }) => (
              <li key={id}>{`${firstName} ${lastName}`}</li>
            ))
          ) : (
            <li>idle/fetching/error</li>
          )}
        </ul>
      }
    </div>
  );
};

export default App;