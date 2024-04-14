import { useState } from "react";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:5000/api/auth/register";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log(res_data);
      console.log("Response from server", res_data.extraDetails);
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });

        navigate("/");
        console.log("Registration successful");
        toast.success("Registration successful");
      } else {
        console.error(
          "Registration failed: ",
          "It has error",
          response.statusText
        );
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/reg1.png"
                  alt="Trying to fill the registration form"
                  width={500}
                  height={500}
                />
              </div>
              {}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      id="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="phone"
                      id="phone"
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-submit">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
