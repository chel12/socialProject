import React from 'react';
import classes from './Dialogs.module.css';
const Dialogs = () => {
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogsItems}>
				<div className={classes.dialog + '' + classes.active}>
					1 man
				</div>
				<div className={classes.dialog}>2 man</div>
				<div className={classes.dialog}>3 man</div>
				<div className={classes.dialog}>3 man</div>
				<div className={classes.dialog}>4 man</div>
				<div className={classes.dialog}>5 man</div>
				<div className={classes.dialog}>6 man</div>
			</div>
			<div className={classes.messages}>
				<div className={classes.message}>Hello</div>
				<div className={classes.message}>Whats you name?</div>
				<div className={classes.message}>How are you ?</div>
				<div className={classes.message}>haha</div>
			</div>
		</div>
	);
};

export default Dialogs;
