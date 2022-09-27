import React, { useState } from "react";
import Compose from "./Compose";
import Inbox from "./Inbox";
import Outbox from "./Outbox";
import classes from "./Wellcome.module.css";

const Wellcome = () => {
  const [composeMailOpen, setComposeMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [outboxOpen, setOutboxOpen] = useState(false);
  const [count, setCount] = useState(0);

  const composeMailClickHandler = () => {
    setInboxOpen(false);
    setOutboxOpen(false);
    setComposeMailOpen(true);
  };
  const inboxClickHandler = () => {
    setOutboxOpen(false);
    setComposeMailOpen(false);
    setInboxOpen(true);
  };
  const outboxClickHandler = () => {
    setComposeMailOpen(false);
    setInboxOpen(false);
    setOutboxOpen(true);
  };
  return (
    <div>
      <h1 style={{ fontFamily: "sans-serif", marginLeft: "20px" }}>
        Wellcome To Mail Box
      </h1>
      <div className={classes.sideNav}>
        <button onClick={composeMailClickHandler}>Compose Email</button>
        <br />

        <button onClick={inboxClickHandler}>
          Inbox <span>unread:{count}</span>
        </button>

        <br />
        <button onClick={outboxClickHandler}>Outbox</button>
      </div>
      <div className={classes.mailBox}>
        {composeMailOpen && <Compose />}
        {inboxOpen && <Inbox setIsCount={setCount} />}
        {outboxOpen && <Outbox />}
      </div>
    </div>
  );
};

export default Wellcome;
