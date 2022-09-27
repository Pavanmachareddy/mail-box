import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import SingleMail from "./SingleMail";

const Inbox = (props) => {
  const [emails, setEmails] = useState({});
  const [singleMail, setSingleMail] = useState("");
  const [isread, setIsread] = useState(false);
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(
      `https://mail-box-121cf-default-rtdb.firebaseio.com/sentemails.json`,
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
  useEffect(() => {
    let arr = [];
    for (let key in emails) {
      if (emails[key].isRead === true) {
        arr.push(emails[key].isRead);
      }
    }
    props.setIsCount(arr.length);
  }, [emails, show]);

  console.log(show);
  const openEmailClickHandler = (e) => {
    setSingleMail({
      email: emails[e.currentTarget.id],
      ID: e.currentTarget.id,
    });
    setIsread(true);
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
                From:
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
                <div
                  style={{
                    backgroundColor: emails
                      ? emails[item]
                        ? emails[item].isRead
                          ? "blue"
                          : "white"
                        : ""
                      : "",
                    height: "10px",
                    width: "10px",
                    marginTop: "7px",
                    border: "1px solid black",
                  }}
                ></div>
              </div>
            </div>
            <br />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  const onSingleMailCloseHandler = () => {
    setShow(true);
    setSingleMail("");
  };

  console.log(singleMail);
  return (
    <Fragment>
      {!singleMail && emailList}
      {singleMail && (
        <>
          <SingleMail
            onClose={onSingleMailCloseHandler}
            data={singleMail}
            setShow={setShow}
          />
        </>
      )}
    </Fragment>
  );
};

export default Inbox;
