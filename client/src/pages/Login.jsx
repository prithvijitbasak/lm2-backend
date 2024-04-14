import { useState } from "react";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:5000/api/auth/login";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
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

      console.log("Login form", response);

      const res_data = await response.json();
      if (response.ok) {
        console.log("Response from server", res_data);
        storeTokenInLS(res_data.token);
        toast.success("Login successful");
        console.log("Login successful");
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("Invalid credentials");
        setUser({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login failed", error);
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
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
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
                    Login
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
