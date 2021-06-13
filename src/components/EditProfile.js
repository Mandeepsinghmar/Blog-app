import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db, timestamp, storage, auth } from "../firebase";

import Loader from "react-loader-spinner";

import useFetchUserBlogs from "../hooks/useFetchUserBlogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfile({ user }) {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [work, setWork] = useState("");
  const [available, setAvailable] = useState("");
  const [currentlyLearning, setCurrentlyLearning] = useState("");
  const [skills, setSkills] = useState("");
  const [employerTitle, setEmployerTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [UploadErr, setUploadErr] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const changeHandler = (e) => {
    if (user) {
      let selectedFile = e.target.files[0];
      const types = ["image/png", "image/jpeg", "image/jpg"];

      if (selectedFile && types.includes(selectedFile.type)) {
        setFile(selectedFile);
        setFileErr("");
      } else {
        setFile(null);
        setFileErr("Please select an image file (png or jpeg or jpg)");
      }
    } else {
    }
  };

  useEffect(() => {
    // reference on storage bucket
    if (file) {
      const storageRef = storage.ref(file.name);
      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setUploadErr(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setPhotoURL(url);
          setProgress(null);
        }
      );
    }
  }, [file]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => {
          const user = doc.data();
          setDisplayName(user.displayName ? user.displayName : "");
          setBio(user.bio ? user.bio : "");
          setWebsite(user.website ? user.website : "");
          setPhotoURL(user.photoURL ? user.photoURL : "");
          setLocation(user.location ? user.location : "");
          setWork(user.work ? user.work : "");
          setAvailable(user.available ? user.available : "");
          setCurrentlyLearning(
            user.currentlyLearning ? user.currentlyLearning : ""
          );
          setEmployerTitle(user.employerTitle ? user.employerTitle : "");
          setSkills(user.skills ? user.skills : "");
        });
    }
  }, []);

  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();
      const updatedAt = timestamp();

      if (displayName !== "") {
        db.collection("users").doc(user.uid).update({
          displayName,
          bio,
          website,
          location,
          work,
          currentlyLearning,
          skills,
          available,
          employerTitle,
          photoURL,
        });
        setLoader(true);
        window.location.reload();
        history.goBack();
      } else {
        toast("Please add your Username!!", {
          className: "toast",
        });
      }
    } else {
      e.preventDefault();
    }
  };
  const deleteBanner = () => {
    const url = storage.refFromURL(photoURL);
    url
      .delete()
      .then(() => {
        setPhotoURL(null);
        console.log("image deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
      <div
        className="create"
        style={{ overflow: "hidden", marginTop: "20px", marginLeft: "200px" }}
      >
        {" "}
        {loader && (
          <div>
            <Loader type="Oval" color="blue" height={370} width={30} />
          </div>
        )}
        <h1 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
          Edit Profile
        </h1>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "800",
            marginBottom: "20px",
          }}
        >
          User
        </h2>
        <form onSubmit={handleSubmit} className="form">
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            {progress ? (
              <div>
                <Loader type="Oval" color="#f1356d" height={20} width={20} />
              </div>
            ) : (
              photoURL && (
                <div style={{ display: "flex", gap: "1px" }}>
                  <img
                    src={photoURL}
                    style={{
                      width: "80px",

                      height: "80px",
                      borderRadius: "50%",
                      marginTop: "-10px",
                      border: "2px solid white",
                    }}
                    alt=""
                  />
                </div>
              )
            )}
            <label>
              <input type="file" name="blog-banner" onChange={changeHandler} />
              <span style={{ backgroundColor: "#f9f871" }}>Change picture</span>
            </label>
            {fileErr && <div>{fileErr}</div>}
            {/* {file && <div>{file.name}</div>} */}
          </div>
          <div
            className="editor"
            style={{
              width: "700px",
              overflow: "hidden",
              margin: "5px auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // width: "100%",
                marginTop: "10px",
                gap: "5px",
              }}
            >
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="username"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <label
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  // marginRight: "250px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                Basic
              </label>
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <label
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  // marginRight: "220px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                Coding
              </label>
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="Available for"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              />
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="Currently learning"
                value={currentlyLearning}
                onChange={(e) => setCurrentlyLearning(e.target.value)}
              />
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="Skills/Languages"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <label
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  // marginRight: "220px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  // marginLeft: "-10px",
                }}
              >
                Work
              </label>
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="Work"
                value={work}
                onChange={(e) => setWork(e.target.value)}
              />
              <input
                className="userprofile-input"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  width: "350px",
                  outline: "none",
                }}
                type="text"
                placeholder="Frontend Engineer"
                value={employerTitle}
                onChange={(e) => setEmployerTitle(e.target.value)}
              />
              <div
                className="create-blog-btn"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={handleSubmit}
                  style={{ backgroundColor: "black" }}
                >
                  Save profile info
                </button>
              </div>
            </div>
          </div>{" "}
        </form>
      </div>
    </>
  );
}

export default EditProfile;
