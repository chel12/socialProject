import { Flex, Spin, Alert } from 'antd';
import React from 'react';

const Page404 = () => {
	return (
		<div>
			<Flex gap="small" vertical>
				<Spin tip="Loading..." size="50px">
					<Alert
						message="Ops, sorry, error 404"
						description="Page not found"
						type="info"
					/>
				</Spin>
			</Flex>
		</div>
	);
};

export default Page404;
