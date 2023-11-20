import React from 'react';
import { actions } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state: AppStateType) => {
	return {
		dialogsPage: state.dialogsPage,
	};
};

export default compose<React.ComponentType>( 
	connect(mapStateToProps, { ...actions }),
	withAuthRedirect
)(Dialogs);
