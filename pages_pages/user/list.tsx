import { useEffect, useState } from "react";

const DisplayUsers = () => {
  const [users, setUsers] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);

  useEffect(() => {
    (async () => {
      const usersData = await fetch("/api/user/list").then(res => res.json());
      setUsers(usersData);
    })();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>DisplayUsers</h1>
      <div>
        {users.map(user => {
          return <div key={user.id}>{user.name}</div>;
        })}
      </div>
    </div>
  );
};

export default DisplayUsers;
