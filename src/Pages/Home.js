import React, { useEffect, useState } from "react";
import PostInputBox from "../components/PostInputBox";
import SignUpBox from "../components/SignUpBox";
import AuthPopup from "../components/AuthPopup";
import Header from "../components/Header";
import { Container } from "../components/styled/Container.styled";
import PostCard from "../components/PostCard";
import { db } from "../utils/firebase";
import { doc } from "firebase/firestore";

const Home = (props) => {
  useEffect(async () => {
    props.setPosts(await props.getMessages());
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
          setPosts={props.setPosts}
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
      {props.posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            profilePicURL={post.profilePicURL}
            user={post.user}
            displayName={post.displayName}
            timestamp={post.timestamp}
            message={post.message}
            likeCount={post.likeCount}
            liked={props.checkLiked(post.id)}
            retweeted={props.checkRetweeted(post.id)}
            handleLike={props.handleLike}
            handleReply={props.handleReply}
          />
        );
      })}
    </Container>
  );
};

export default Home;
