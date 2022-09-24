import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Outbox = () => {
  const [email, setEmails] = useState({});
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mail-box-121cf-default-rtdb.firebaseio.com/${cleanUserEmail}sentemail.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
      });
  }, [cleanUserEmail]);

  const emailList = email ? (
    <ul>
      {Object.keys(email).map((item) => (
        <p style={{ border: "2px solid black", textAlign: "left" }} key={item}>
          <label style={{ textAlign: "left" }}>To: {email[item].to}</label>
          <label>Heading: {email[item].heading}</label>
          <p dangerouslySetInnerHTML={{ _html: email[item].body }}></p>
        </p>
      ))}
    </ul>
  ) : (
    <p>No Email Found</p>
  );
  return (
    <div>
      <h4>This is outbox</h4>
      {emailList}
    </div>
  );
};

export default Outbox;
