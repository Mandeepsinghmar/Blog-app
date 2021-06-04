import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db, timestamp, auth } from "../firebase";
import TextareaAutosize from "react-autosize-textarea";
import useFirestore from "../hooks/useFirestore";

function EditUserProfile({ user, setUser }) {
  const { id } = useParams();
  console.log(id);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [pleaseLogin, setPleaseLogin] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
      setBio(user.bio);
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();
      const updatedAt = timestamp();
      let currentUser = auth.currentUser;
      const newUserData = {
        bio,
        username,
        website,
        displayName,
        photoURL,
        userId: user.userId,
      };
      db.collection("users").doc(currentUser.uid).set(newUserData);

      history.push("/");
    }
  };

  return (
    <div className="create">
      <h1 style={{ marginBottom: "20px" }}>Edit your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="form editProfile"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          width: "350px",
          margin: "auto",
        }}
      >
        <input
          type="link"
          placeholder="Add website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        {/* <input
          placeholder="msingh8328@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>{" "} */}

        <input
          placeholder="Add bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></input>
        {/* <label>Article Author:</label> */}
        <input
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {user ? (
          <button style={{ backgroundColor: "black" }}>Save changes</button>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                borderRadius: "2px",
                border: "1px solid #333",
                width: "fit-content",
                padding: "6px 12px",
              }}
            >
              Please login to write a blog.
            </p>
          </div>
        )}
        {/* {!isLoading && <button>Add a article</button>}
        {pleaseLogin && <p>Please login to create a blog.</p>}
        {isLoading && <button disabled>Adding article...</button>} */}
      </form>
    </div>
  );
}

export default EditUserProfile;
