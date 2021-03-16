import { auth, provider } from "../firebase";

export const logInWithGoogle = async () => {
  let user;
  await auth
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res.user);
      user = res.user;
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
      logout_success = true;
    })
    .catch((err) => {
      console.log(err.message);
    });
  return logout_success;
};
