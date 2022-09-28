import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Outbox = () => {
  const [emails, setEmails] = useState({});
  const UserEmails = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mail-box-121cf-default-rtdb.firebaseio.com/${UserEmails}/sentemails.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
        console.log(data, "................data");
      });
  }, [UserEmails]);

  console.log(emails, "emailsssssssssss");
  const emailList = emails ? (
    <ul>
      {Object.keys(emails).map((item) => (
        <p style={{ border: "2px solid black", textAlign: "left" }} key={item}>
          <label style={{ textAlign: "left" }}>To: {emails[item].to}</label>
          <hr />
          <label>Heading: {emails[item].heading}</label>
          <hr />
          <p>{emails[item].body.replace(/<[^>]*>/g, "")}</p>
        </p>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  return (
    <div>
      <h4>This is outbox</h4>
      {emailList}
    </div>
  );
};

export default Outbox;
