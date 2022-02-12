import React, { useEffect, useState } from "react";
import PostInputBox from "../components/PostInputBox";
import SignUpBox from "../components/SignUpBox";
import AuthPopup from "../components/AuthPopup";
import Header from "../components/Header";
import { Container } from "../components/styled/Container.styled";
import PostCard from "../components/PostCard";

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    setPosts(await props.getMessages());
  }, []);

  return (
    <Container>
      <Header
        pageTitle="Home"
        setShowPopup={props.setShowPopup}
        setShowRegisterForm={props.setShowRegisterForm}
        handleLogout={props.handleLogout}
        user={props.user}
      />
      {props.user ? (
        <PostInputBox
          user={props.user}
          postMessage={props.postMessage}
          getMessages={props.getMessages}
          setPosts={setPosts}
        />
      ) : (
        ""
      )}
      {props.showPopup ? (
        <AuthPopup
          showRegisterForm={props.showRegisterForm}
          setShowRegisterForm={props.setShowRegisterForm}
          handleLogin={props.handleLogin}
          handleRegister={props.handleRegister}
          setShowPopup={props.setShowPopup}
        />
      ) : (
        ""
      )}
      {posts.map((post) => {
        return <PostCard message={post.message} />;
      })}
    </Container>
  );
};

export default Home;
