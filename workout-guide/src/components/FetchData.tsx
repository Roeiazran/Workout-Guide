import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface User {
  id: string;
  Name: string;
  Age: number;
}


const FetchData: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        const usersData: User[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<User, "id">)
        }));
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Users from Firestore:</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.Name} - {user.Age}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchData;
