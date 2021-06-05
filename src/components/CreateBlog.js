import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db, storage, timestamp } from "../firebase";
import TextareaAutosize from "react-autosize-textarea";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateBlog({ user }) {
  console.log(user);
  const [blogName, setBlogName] = useState("");
  const [blogContent, setBlogContent] = useState("");
  // const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [pleaseLogin, setPleaseLogin] = useState(false);
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [UploadErr, setUploadErr] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loader, setLoader] = useState(null);

  const changeHandler = (e) => {
    if (user) {
      let selectedFile = e.target.files[0];
      const types = ["image/png", "image/jpeg", "image/jpg"];

      if (selectedFile && types.includes(selectedFile.type)) {
        setFile(selectedFile);
        setFileErr("");
      } else {
        setFile(null);
        setFileErr("Please select an image file (png or jpeg)");
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
          setBannerUrl(url);
          setProgress(null);
        }
      );
    }
  }, [file]);

  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();
      const createdAt = timestamp();
      const userPicture = user.photoURL;
      const author = user.displayName;
      const userId = user.uid;

      db.collection("blogs").add({
        postedBy: userId,
        // user,
        blogName,
        author,
        blogContent,
        createdAt,
        bannerUrl,
        userPicture,
      });
      history.push("/");
    } else {
      e.preventDefault();
      toast("You must be logged in to write!", {
        className: "toast",
      });
    }
  };

  const deleteBanner = () => {
    const url = storage.refFromURL(bannerUrl);
    url
      .delete()
      .then(() => {
        setBannerUrl(null);
        console.log("image deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
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
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Create a new Blog</h1>
        <form onSubmit={handleSubmit} className="form">
          <div style={{ display: "flex", gap: "20px" }}>
            <label>
              <input type="file" name="blog-banner" onChange={changeHandler} />
              <span>Upload banner</span>
            </label>

            {fileErr && <div>{fileErr}</div>}

            {progress && (
              <div>
                <Loader type="Oval" color="#f1356d" height={20} width={20} />
              </div>
            )}
            {bannerUrl && (
              <div style={{ display: "flex", gap: "1px" }}>
                <img
                  src={bannerUrl}
                  style={{
                    width: "50px",

                    height: "50px",
                    borderRadius: "10px",
                    marginTop: "-10px",
                  }}
                  alt=""
                />
                <div
                  onClick={deleteBanner}
                  style={{
                    marginTop: "-20px",
                    fontWeight: "bold",
                    marginLeft: "-6px",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  x
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              width: "600px",
              overflow: "hidden",
              margin: "5px auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <TextareaAutosize
                style={{
                  backgroundColor: "#eef0f1",
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                }}
                className="blog-name"
                type="text"
                placeholder="Blog name"
                required
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
            </div>

            <div>
              <TextareaAutosize
                style={{
                  backgroundColor: "#eef0f1",
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  padding: "12px",
                }}
                placeholder="write something"
                required
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
              />
            </div>
            <div
              className="create-blog-btn"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                onClick={handleSubmit}
                style={{ backgroundColor: "black" }}
              >
                Add a blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
