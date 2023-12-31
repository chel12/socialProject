import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import classes from "./Dialogs.module.css";
import { Navigate } from "react-router";
import AddMessageFormRedux from "./../Dialogs/AddMessageForm/AddMessageForm";

const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogsData.map((el) => (
    <DialogItem name={el.name} key={el.id} id={el.id} />
  ));
  let messagesElements = state.messagesData.map((el) => (
    <Message message={el.message} key={el.id} id={el.id} />
  ));
  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };
  let newMessageBody = state.newMessageBody;

  if (!props.isAuth) return <Navigate to="/login" />;
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
