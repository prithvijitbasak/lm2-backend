import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "../index.css";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log(`Users ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // deleting the user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      console.log("Deleted User", data);

      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((currUser, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{currUser.username}</td>
                      <td>{currUser.email}</td>
                      <td>{currUser.phone}</td>
                      <td style={{ cursor: "pointer", color: "yellow" }}>
                        <Link to={`/admin/users/${currUser._id}/edit`}>
                          <button>Edit</button>
                        </Link>
                      </td>
                      <td style={{ cursor: "pointer", color: "red" }}>
                        <button onClick={() => deleteUser(currUser._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
