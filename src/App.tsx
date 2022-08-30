import React, { useState, useEffect, useRef, useCallback } from "react";
import Members from "./components/Members";
import LoadingSpinner from "./components/LoadingSpinner";

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
  const [maxMembers, setMaxMembers] = useState<number>(10);
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const [sortDescending, setSortDescending] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useCallback((node: HTMLDivElement): HTMLDivElement => {
    if (observer) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setMaxMembers((prevAmount) => prevAmount + 10);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    }
    return node;
  }, []);

  return (
    <main>
      <h1>Meet the Team</h1>
      <nav>
        <button
          className="sort-toggle"
          onClick={() => setSortDescending(!sortDescending)}
        />
        <div className="search">
          <i className="search__icon" />
          <input
            className="search__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="grid-toggle" onClick={() => setIsGrid(!isGrid)} />
      </nav>
      {status === Status.Success ? (
        <Members
          members={members
            .filter(
              ({ firstName, lastName }) =>
                firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                lastName.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
            .sort((a: Member, b: Member) =>
              sortDescending
                ? b.lastName.localeCompare(a.lastName)
                : a.lastName.localeCompare(b.lastName)
            )
            .slice(0, maxMembers)}
          isGrid={isGrid}
        />
      ) : (
        <ul>
          <li>
            <LoadingSpinner />
          </li>
        </ul>
      )}
      <div ref={loadingRef} />
    </main>
  );
};

export default App;
