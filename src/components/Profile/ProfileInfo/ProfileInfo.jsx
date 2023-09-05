import React from 'react';
import classes from './ProfileInfo.module.css';
const ProfileInfo = () => {
	return (
		<div>
			<img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"></img>
			<div className={classes.descriptionBlock}>ava+desc</div>
		</div>
	);
};

export default ProfileInfo;
