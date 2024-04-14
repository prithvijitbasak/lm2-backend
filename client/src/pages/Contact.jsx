import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        const data = response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("There is a error! Cannot send the message...", error);
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
                <h1 className="main-heading mb-3">Contact Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="username"
                      name="username"
                      placeholder="username"
                      id="username"
                      autoComplete="off"
                      value={contact.username}
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
                      value={contact.email}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message">Message</label>
                    <input
                      type="message"
                      name="message"
                      placeholder="message"
                      id="message"
                      autoComplete="off"
                      value={contact.message}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d650.8138396696352!2d88.43340553917338!3d22.670224067191707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89efb10bf76f1%3A0x91678dddba3e5df3!2s405%2C%2022%2C%20Nilachal%20N%20Rd%2C%20Nilachal%2C%20Birati%2C%20North%20Dumdum%2C%20West%20Bengal%20700134!5e0!3m2!1sen!2sin!4v1707565602648!5m2!1sen!2sin"
          width="800"
          height="600"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}
      </section>
    </>
  );
};
