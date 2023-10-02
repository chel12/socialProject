import React from "react";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import withAuthRedirect from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
  };
};
let AuthRedirectComponent = withAuthRedirect(Dialogs);
const DialogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirectComponent);
//коннект возвращает новую контейнерную компоненту
//две функции это прокидываем пропсы и колбеки
//и вторым вызовом это передается в компоненту презентационную
export default DialogsContainer;
