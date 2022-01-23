import { useEffect, useState } from "react";

export function useAuthModals() {
	const [signupModal, setSignupModal] = useState(false);
	const updateSignupModal = () => {
		setSignupModal((signupModal) => !signupModal);
	};

	const [loginModal, setLoginModal] = useState(false);
	const updateLoginModal = () => {
		setLoginModal((loginModal) => !loginModal);
	};

	return {
		updateLoginModal,
		updateSignupModal,
		loginModal,
		signupModal,
	} as const;
}
