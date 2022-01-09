import React, { useEffect, useState } from "react";
import "../../assets/css/bootstrap.min.css";
import "bootstrap";
import logo from "../../assets/logo/jababeka_report_white.png";
import profile from "../../assets/logo/account.png";
import image from "../../assets/image/image.png";
import "../../assets/css/home.css";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faMapMarkerAlt,
  faPencilAlt,
  faSearch,
  faUserCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Home = () => {
  const initSession = JSON.parse(localStorage.getItem("data")) || 0;
  const backLogin = "http://localhost:3000/login";
  const urlBackend = "http://localhost:4000";
  const [loading, setLoading] = useState(false);
  const [dataComment, setDataComment] = useState([]);
  const [dataReport, setDataReport] = useState([]);
  const [selectDataReport, setSelectDataReport] = useState({
    post_id: 0,
    post_author: "",
    post_date: "",
    post_text_report: "",
    post_location: "",
  });

  useEffect(async () => {
    console.log(initSession);

    if (initSession) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      window.location.href = backLogin;
    }

    await axios
      .get(urlBackend + "/api/post/list")
      .then((res) => {
        console.log("post", res);
        setDataReport(res.data.data);
      })
      .catch((err) => console.log(err));

    await axios
      .get(urlBackend + "/api/comment/list")
      .then((res) => {
        console.log("post", res);
        setDataComment(res.data.data || 0);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("SelectDataReport", selectDataReport);
  console.log("dataReport", dataReport);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("data");
    window.location.href = backLogin;
  };

  const enterInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      alert("input");
    }
  };

  const selectReport = (item) => {
    setSelectDataReport({
      post_id: item.post_id,
      post_author: item.post_author,
      post_date: item.post_date,
      post_text_report: item.post_text_report,
      post_location: item.post_location,
    });
  };

  const convertTimeToJs = (date) => {
    let a = date + "";
    let b = a.slice(0, 10).replace("T", " ");

    let splt = b.split("");

    let d = splt.slice(0, 4);
    let e = splt.slice(5, 7);
    let f = splt.slice(8, 10);

    let month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ];
    let combine = d.join("") + "/" + e.join("") + "/" + f.join("");
    let lastResult = new Date(combine);

    let result =
      f.join("") + " " + month[lastResult.getMonth()] + ", " + d.join("");
    return result;
  };

  const ListComment = ({ name, text, itemAll }) => {
    let findIndexReport =
      dataComment.findIndex((item) => item.comment_id === itemAll.comment_id) ||
      0;

    const [show, setShow] = useState(false);
    const [commentText, setCommentText] = useState("");

    console.log("selectDataComment", itemAll);
    console.log("dataComment", dataComment);

    const selectComment = (item) => {
      setCommentText(item.comment_text);

      if (!show) setShow(true);
      else setShow(false);
    };

    const enterUpdate = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        axios
          .put(urlBackend + "/api/comment/update/" + itemAll.comment_id, {
            comment_text: commentText,
          })
          .then((res) => {
            console.log("success", res);
            dataComment[findIndexReport].comment_text = commentText;

            setShow(false);
          })
          .catch((err) => console.log(err));
      }
    };

    console.log("show", show);

    return (
      <>
        <hr />
        <div className="row">
          <div className="top_commentar">
            <div className="account_commentar">
              <FontAwesomeIcon className="icon-comment" icon={faUserCircle} />

              <p className="name_comment mt-3">{name}</p>

              {initSession.user_name === "admin" ? (
                show ? (
                  <FontAwesomeIcon
                    className="mt-1 mr-2"
                    icon={faWindowClose}
                    onClick={() => setShow(false)}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="mt-1 mr-2"
                    icon={faPencilAlt}
                    onClick={() => selectComment(itemAll)}
                  />
                )
              ) : (
                false
              )}
            </div>

            {/* <p>Star</p> */}
          </div>

          {show === true ? (
            <input
              className="form-control"
              value={commentText}
              onKeyDown={enterUpdate}
              onChange={(e) => setCommentText(e.target.value)}
            />
          ) : (
            <p className="text_commentar">{text}</p>
          )}
        </div>
        <hr />
      </>
    );
  };

  const ListReport = ({ id, author, text, location, date, submit }) => {
    const [messageInput, setMessageInput] = useState("");

    const sendMessage = (e) => {
      e.preventDefault();

      axios
        .post(urlBackend + "/api/comment/add", {
          comment_name: "Admin",
          comment_text: messageInput,
          post_id: id,
        })
        .then((res) => {
          console.log("succes", res);
          setDataComment([
            ...dataComment,
            {
              comment_name: "Admin",
              comment_text: messageInput,
              post_id: id,
            },
          ]);
          setMessageInput("");
        })
        .catch((err) => console.log(err));
    };

    return (
      <div className="wrap_item">
        <div className="row main_report">
          <div className="col-lg-6">
            <img className="image_report" src={image} />
          </div>
          <div className="col-lg-6 mt-5">
            <div className="top_report">
              <h2>{author}</h2>
              <h2>{convertTimeToJs(date)}</h2>

              {initSession.user_name === author ? (
                <FontAwesomeIcon
                  onClick={submit}
                  className="mt-1 mr-2"
                  icon={faPencilAlt}
                />
              ) : (
                false
              )}
            </div>
            <p className="text_report mt-2">{text}</p>
            <div className="location_report">
              <FontAwesomeIcon
                className="icon_location"
                icon={faMapMarkerAlt}
                onClick={submit}
              />
              <p className="ml-5 text_location">{location}</p>
            </div>
          </div>
        </div>

        {(dataComment || []).map((item) => {
          if (item.post_id === id) {
            return (
              <ListComment
                key={item.comment_id}
                name={item.comment_name}
                text={item.comment_text}
                itemAll={item}
              />
            );
          }
        })}

        <div class="input-group">
          <span class="input-group-text bg-icon">
            <FontAwesomeIcon className="icon-left" icon={faUserCircle} />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Send your message"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            class="btn btn-send"
            type="button"
            id="button-addon2"
            onClick={(e) => sendMessage(e)}
          >
            <FontAwesomeIcon className="icon-btn" icon={faLocationArrow} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container_home">
      {loading ? (
        <>
          <ClipLoader color={"#fa2626"} loading={"#F37A24"} size={50} />
        </>
      ) : (
        <div className="column">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <a className="mt-3">
                <img className="img_logo_home" src={logo} />
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mt-3">
                  <li className="nav-item input_li">
                    <form className="d-flex">
                      <input
                        className="form-control input_search"
                        type="search"
                        placeholder="You can search report on here"
                        aria-label="Search"
                        aria-describedby="basic-search"
                        onKeyDown={(e) => enterInput(e)}
                      />
                      <span
                        class="input-group-text icon-search icon-font"
                        id="basic-search"
                      >
                        <FontAwesomeIcon
                          className="text-white"
                          icon={faSearch}
                        />
                      </span>
                    </form>
                  </li>

                  <li className="nav-item account">
                    <div className="wrap_account">
                      <p className="name_profile mt-2 text-white">
                        {initSession.user_name}
                      </p>

                      <img className="img_profile " src={profile} />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="main">
            <section id="category">
              <p className="header_text">List Category</p>
              <div className="parents_category">
                <button className="item_category btn">Accident</button>
                <button className="item_category btn">Criminal</button>
                <button className="item_category btn">Envinronment</button>
                <button className="item_category btn">Infrastructure</button>
              </div>
            </section>

            <section id="list_report">
              <div className="container_report">
                <p className="header_text">List Report</p>
                {(dataReport || []).map((item) => {
                  if (initSession.user_name === item.post_author) {
                    return (
                      <ListReport
                        key={item.post_id}
                        id={item.post_id}
                        author={item.post_author}
                        text={item.post_text_report}
                        location={item.post_location}
                        date={item.post_date}
                        submit={() => selectReport(item)}
                      />
                    );
                  } else if (initSession.user_name === "admin") {
                    return (
                      <ListReport
                        key={item.post_id}
                        id={item.post_id}
                        author={item.post_author}
                        text={item.post_text_report}
                        location={item.post_location}
                        date={item.post_date}
                        submit={() => selectReport(item)}
                      />
                    );
                  }
                })}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
