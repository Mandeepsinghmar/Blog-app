import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db, timestamp, storage } from "../firebase";
import TextareaAutosize from "react-autosize-textarea";
import useFirestore from "../hooks/useFirestore";
import Loader from "react-loader-spinner";

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
      const types = ["image/png", "image/jpeg"];

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
      const userPicture = user.photoURL;
      const author = user.displayName;
      const userId = user.uid;
      db.collection("blogs").doc(id).update({
        postedBy: userId,

        blogName,
        author,
        blogContent,
        updatedAt,
        userPicture,
        bannerUrl,
      });
      history.push("/");
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
    <div className="create" style={{ marginLeft: "200px" }}>
      <h1 style={{ marginBottom: "20px" }}>Edit your Blog</h1>
      <form onSubmit={handleSubmit} className="form">
        <div style={{ display: "flex", gap: "20px" }}>
          <label>
            <input type="file" name="blog-banner" onChange={changeHandler} />
            <span>Edit banner</span>
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

        <TextareaAutosize
          style={{
            backgroundColor: "#eef0f1",
            borderRadius: "10px",
            border: "1px solid #e2e2e2",
          }}
          className="blog-name"
          type="text"
          placeholder="Edit Blog name."
          required
          value={blogName}
          onChange={(e) => setBlogName(e.target.value)}
        />

        <TextareaAutosize
          style={{
            backgroundColor: "#eef0f1",
            borderRadius: "10px",
            border: "1px solid #e2e2e2",
          }}
          placeholder="Edit your blog content "
          required
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        ></TextareaAutosize>
        {/* <label>Article Author:</label> */}
        {/* <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        /> */}
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

export default EditBlog;
