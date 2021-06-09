import { auth, provider, db } from "../firebase";

export const logInWithGoogle = async () => {
  let user;

  const data = await auth
    .signInWithPopup(provider)
    .then((data) => {
      console.log(data.user);
      user = data.user;
    })

    .catch((err) => {
      console.log(err.message);
    });

  return user;
};

export const logout = async () => {
  let logout_success;
  await auth
    .signOut()
    .then(() => {
      console.log("logout successful");
      logout_success = true;
    })
    .catch((err) => console.log(err.message));

  return logout_success;
};
