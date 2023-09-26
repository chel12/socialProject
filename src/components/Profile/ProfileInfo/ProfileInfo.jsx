import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"></img>
      <div className={classes.descriptionBlock}>
        <img src={props.profile.photos.large}></img>
        <h1>{props.profile.lookingForAJobDescription}</h1>
      </div>
    </div>
  );
};

export default ProfileInfo;
