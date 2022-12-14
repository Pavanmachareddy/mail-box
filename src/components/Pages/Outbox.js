import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleMail from "./SingleMail";

const Outbox = (props) => {
  const [emails, setEmails] = useState({});
  const [singleMail, setSingleMail] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(
      `https://mailbox-client-4e6aa-default-rtdb.firebaseio.com/sentemails.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
        console.log(data, "......inboxdata");
      });
  }, [show]);
  const openEmailClickHandler = (e) => {
    setSingleMail({
      email: emails[e.currentTarget.id],
      ID: e.currentTarget.id,
    });
  };

  console.log(emails);
  const emailList = emails ? (
    <ul style={{ marginTop: "20px" }}>
      {Object.keys(emails).map((item) => {
        console.log(emails[item].isRead);

        return (
          <li
            id={item}
            onClick={openEmailClickHandler}
            style={{
              border: "1px solid black",
              textAlign: "left",
              marginTop: "14px",
              height: "30px",
              overflow: "hidden",
              borderRadius: "5px",
            }}
            key={item}
          >
            <div
              style={{
                paddingRight: "10px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                To:
              </span>
              <span>{emails[item].to}</span>
            </div>
            <br />
            <div>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Subject:
              </span>
              <span> {emails[item].heading}</span>
            </div>
            <br />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "1000px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Msg:
                  </span>
                  <span style={{}}>
                    {" "}
                    {emails[item].body.replace(/<[^>]*>/g, "")}
                  </span>
                </div>
              </div>
            </div>
            <br />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>
      No Emails Found
      {/* <button onClick={() => onSingleMailBackHandler()}>Back</button> */}
    </p>
  );

  const onSingleMailBackHandler = () => {
    // setShow(true);
    setSingleMail("");
  };

  const onSingleMailDeleteHandler = (data) => {
    setEmails(data);
    setSingleMail("");
  };

  console.log(singleMail);
  return (
    <Fragment>
      <h4>This is Outbox</h4>
      {!singleMail && emailList}
      {singleMail && (
        <>
          <SingleMail
            onClose={onSingleMailBackHandler}
            onDelete={onSingleMailDeleteHandler}
            data={singleMail}
            // setShow={setShow}
          />
        </>
      )}
    </Fragment>
  );
};

export default Outbox;
