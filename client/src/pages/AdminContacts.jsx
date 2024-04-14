import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log("Here is the data from admin contacts", data);
      if (response.ok) {
        setContactData(data);
      } else {
        console.log("There is error is response from contacts admin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      console.log("Deleted Contact", data);

      if (response.ok) {
        getContactsData();
        toast.success("Deleted Successfully");
      } else {
        toast.error("unable to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <h1>Admin Contacts</h1>
      {contactData.map((currContactData, index) => {
        return (
          <>
            <div key={index}>
              <p>{currContactData.username}</p>
              <p>{currContactData.email}</p>
              <p>{currContactData.message}</p>
              <button onClick={() => deleteContactById(currContactData._id)}>
                Delete
              </button>
            </div>
            <hr />
          </>
        );
      })}
    </>
  );
};
