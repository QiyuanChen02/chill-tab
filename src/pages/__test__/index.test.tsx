import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Index from "..";

//Spent all evening trying to write tests and got horribly confused so there will be no tests in here for now :(

it("Login/Signup button showing", async () => {
	render(<Index />);
	const loginButton = await screen.findByRole("button", { name: /log in/i });
	expect(loginButton).toBeVisible();
	const signupButton = await screen.findByRole("button", { name: /log in/i });
	expect(signupButton).toBeVisible();

});

