import { signOut, auth } from "../firebase/firebase.init";

export const handleLogout = (navigate) => {
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((err) => console.error(err));
};
