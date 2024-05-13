import React from "react";

const Notification = ({ notification }) => {
	const { type, message } = notification;

	return message === null ? null : (
		<div
			className={`notification ${
				type === "success"
					? "notification-success"
					: type === "warning"
					? "notification-warning"
					: ""
			}`}
		>
			{message}
		</div>
	);
};

export default Notification;
