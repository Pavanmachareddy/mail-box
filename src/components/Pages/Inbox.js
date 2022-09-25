import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mailreducer";
import SingleMail from "./SingleMail";

const Inbox = () => {
  const [emails, setEmails] = useState({});
  const [singleMail,setSingleMail] = useState('');
  const [isread,setIsread] = useState(false);
//   const dispatch = useDispatch();
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mail-box-121cf-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails.json`,
    {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
        console.log(data,'......inboxdata')
        // dispatch(mailActions.setInbox(data))
      });
  }, [cleanUserEmail]);


  const openEmailClickHandler=(e)=>{
    setSingleMail({email:emails[e.currentTarget.id],ID:e.currentTarget.id});
    setIsread(true);
  }
  const emailList = emails ? (
    <ul>
      {Object.keys(emails).map((item) => (
        <li 
        id={item}
        onClick={openEmailClickHandler}
        style={{
            border:"2px solid black",
            textAlign:"left",
            // listStyle: isread?'none' : emails[item].isRead?'none':'',
            listStyle:emails[item].isRead?'none':'',
        }}
        key={item}>
        {/* console.log(item,'item') */}
        <span style={{ paddingRight: "10px", textAlign: "left" }}>
            From: {emails[item].from}
          </span>
          <span>Heading: {emails[item].heading}</span>
          {/* <p dangerouslySetInnerHTML={{ __html: emails[item].body }}></p> */}
        </li>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  const onSingleMailCloseHandler = () =>{
    setSingleMail('');
  }


const onSingleMailDeleteHandler = (data) =>{
    setEmails(data);
    // setSingleMail('');

// dispatch(mailActions.setInbox(data));
// setSingleMail("");
}

  return (
    <Fragment>
      <h3>This is Inbox</h3>
      {/* {emailList} */}
      {!singleMail && emailList}
      {singleMail && <SingleMail onClose={onSingleMailCloseHandler} data={singleMail} />} 
      {singleMail && <SingleMail onDelete={onSingleMailDeleteHandler} 
        onClose={onSingleMailCloseHandler}
        data={singleMail}
      />} 
      
    </Fragment>
  );
};

export default Inbox;
