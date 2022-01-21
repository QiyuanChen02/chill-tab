const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
	return admin.firestore().collection("users").doc(user.uid).set({
		email: user.email,
		selectedProject: null,
		projects: [],
	});
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
	const doc = admin.firestore().collection("users").doc(user.uid);
	return doc.delete();
	//Also delete all projects related to user...
});
