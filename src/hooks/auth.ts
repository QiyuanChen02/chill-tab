import { useEffect, useState } from "react";

//Fetches the login and signup modals when 'login' and 'signup' button clicked
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
