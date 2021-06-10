import { auth, provider, db } from "../firebase";

export const logInWithGoogle = async () => {
  let user;
  let err;

  const data = await auth
    .signInWithPopup(provider)
    .then((data) => {
      console.log(data.user);
      user = data.user;
    })

    .catch((err) => {
      err = err.message;
      console.log(err.message);
    });

  return user;
};

export const logout = async (user) => {
  let logout_success;
  await db
    .collection("users")
    .doc(user.uid)
    .update({ isOnline: false })
    .then(() => {
      auth
        .signOut()
        .then(() => {
          console.log("logout successful");
          logout_success = true;
        })
        .catch((err) => console.log(err.message));
    });

  return logout_success;
};
