import { actions } from '../../redux/dialogsReducer.ts';
import Dialogs from './Dialogs.tsx';
import { connect } from 'react-redux';
import { AppStateType } from './../../redux/redux-store.ts';

import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state: AppStateType) => {
	return {
		dialogsPage: state.dialogsPage,
	};
};

export default compose(
	connect(mapStateToProps, { ...actions }),
	withAuthRedirect
)(Dialogs);
