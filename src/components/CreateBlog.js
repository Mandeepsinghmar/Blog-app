import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db, storage, timestamp } from "../firebase";
import TextareaAutosize from "react-autosize-textarea";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

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
  const [addData, setAddData] = useState("");

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

  const handleChange = (e, editor) => {
    const data = editor.getData();
    // const parsedData = ReactHtmlParser(data);
    setBlogContent(data);
    console.log(data);
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
  // const content = ReactHtmlParser(blogContent);
  // console.log(content);
  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();
      const createdAt = timestamp();
      const userPicture = user.photoURL;
      const author = user.displayName;
      const userId = user.uid;

      if (blogName != "" && blogContent != "") {
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
        toast("Please add something to blog!", {
          className: "toast",
        });
      }
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
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label>
              <input type="file" name="blog-banner" onChange={changeHandler} />
              <span style={{ backgroundColor: "#f9f871" }}>Upload banner</span>
            </label>

            {fileErr && <div>{fileErr}</div>}

            {progress && (
              <div>
                <Loader type="Oval" color="#f1356d" height={20} width={20} />
              </div>
            )}
            {bannerUrl && (
              <div style={{ display: "flex", gap: "5px" }}>
                <img
                  src={bannerUrl}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "10px",
                  }}
                  alt=""
                />
                <span
                  onClick={deleteBanner}
                  style={{
                    fontWeight: "bold",

                    color: "red",
                    cursor: "pointer",
                    marginTop: "-10px",
                    marginLeft: "-10px",
                  }}
                >
                  x
                </span>
              </div>
            )}
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
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <TextareaAutosize
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e2e2",
                  backgroundColor: "white",
                }}
                className="blog-name"
                type="text"
                placeholder="Blog name"
                required
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
            </div>

            <CKEditor
              editor={ClassicEditor}
              data={blogContent}
              onChange={handleChange}
            />

            <div
              className="create-blog-btn"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
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
