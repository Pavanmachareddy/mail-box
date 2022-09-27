import React, { useRef, useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import './Compose.css';
import { useSelector } from "react-redux";
import { v4 } from "uuid";

const Compose = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toEmailRef = useRef();
  const emailHeadingRef = useRef();
  const userEmail = useSelector((state)=>state.auth.email);
  const CleanUserEmail = useSelector((state)=>state.auth.cleanEmail);

  console.log(editorState,'editorState.................')

  const onEditorStateChange = (currEditorState) => {
    setEditorState(currEditorState);
  };

  const sendMailHandler = () => {
    const emailData = {
      from: userEmail,
      to: toEmailRef.current.value,
      heading: emailHeadingRef.current.value,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      isRead:true,
      id:v4()
    };
    console.log(emailData,"emailData........................")
    fetch(
      `https://mail-box-121cf-default-rtdb.firebaseio.com/${CleanUserEmail}sentemails.json`,
      {
        method: "POST",
        body: JSON.stringify(emailData),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res,'....res')
        res.json()
    } )

    toEmailRef.current.value = "";
    emailHeadingRef.current.value = "";
    setEditorState(EditorState.createEmpty());
  };
  return (
    <div>
      <label>To: </label>
      <input type="email" required ref={toEmailRef} />
      <br />
      <label>Heading: </label>
      <input type="text" ref={emailHeadingRef} />
      <div
        style={{
          overflow: "scroll",
          backgroundColor: "#abbeb",
          height: "40vw",
        }}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div>

      <button className="btn" onClick={sendMailHandler}>Send</button>
    </div>
  );
};

export default Compose;
