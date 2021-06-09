import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db, timestamp, storage } from "../firebase";
import TextareaAutosize from "react-autosize-textarea";
import useFirestore from "../hooks/useFirestore";
import Loader from "react-loader-spinner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditBlog({ user }) {
  const { id } = useParams();
  console.log(id);

  const [blogName, setBlogName] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [pleaseLogin, setPleaseLogin] = useState(false);

  const [loading, setLoading] = useState(false);
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
  const handleChange = (e, editor) => {
    const data = editor.getData();
    // const parsedData = ReactHtmlParser(data);
    setBlogContent(data);
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

  useEffect(() => {
    db.collection("blogs").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          // setLoading(false);
          // setBlog(doc.data());
          const data = doc.data();
          let blogName = data.blogName;
          let blogContent = data.blogContent;
          let bannerUrl = data.bannerUrl;
          // console.log(blogName);
          setBlogName(blogName);
          setBlogContent(blogContent);
          setBannerUrl(bannerUrl);
        } else {
          // setLoading(false);
        }
      });
    });
    // console.log(blog);
  }, []);
  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();
      const updatedAt = timestamp();

      const userId = user.uid;

      if (blogName !== "" && blogContent !== "") {
        db.collection("blogs").add({
          postedBy: userId,

          blogName,

          blogContent,
          updatedAt,
          bannerUrl,
        });
        window.location.reload();
        history.goBack();
      } else {
        toast("Please add something to blog!", {
          className: "toast",
        });
      }
    } else {
      e.preventDefault();
      setPleaseLogin(true);
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
    <div
      className="create"
      style={{ overflow: "hidden", marginTop: "20px", marginLeft: "200px" }}
    >
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
      <h1 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
        Edit your Blog
      </h1>
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
            <span style={{ backgroundColor: "#f9f871" }}>Edit banner</span>
          </label>

          {fileErr && <div>{fileErr}</div>}
          {/* {file && <div>{file.name}</div>} */}
          {progress && (
            <div
            // style={{
            //   width: progress + "%",
            //   marginTop: "10px",
            //   backgroundColor: "pink",
            //   height: "5px",
            // }}
            >
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
                style={{
                  marginTop: "-20px",
                  fontWeight: "bold",
                  marginLeft: "-6px",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={deleteBanner}
              >
                x
              </div>
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

          {/* <div>
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
            </div> */}

          <CKEditor
            editor={ClassicEditor}
            data={blogContent}
            onChange={handleChange}
          />
          <div
            className="create-blog-btn"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={handleSubmit} style={{ backgroundColor: "black" }}>
              Save changes
            </button>
          </div>
        </div>{" "}
      </form>
    </div>
  );
}

export default EditBlog;
