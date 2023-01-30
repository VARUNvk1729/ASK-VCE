import styled from "styled-components";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../actions";
const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setshareImage] = useState("");
  const [videoLink, setvideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert("Not an image,the images files is a  ${typeof{image}");
      return;
    }
    setshareImage(image);
  };

  const switchAssetArea = (area) => {
    setshareImage("");
    setvideoLink("");
    setAssetArea(area);
  };
  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      description: editorText,
      user: props.user,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e);
  };
  const reset = (event) => {
    setEditorText("");
    setshareImage("");
    setvideoLink("");
    setAssetArea("");
    props.handleClick(event);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif,image/jpeg,/images/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="" />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Input a video link"
                        value={videoLink}
                        onChange={(e) => setvideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreations>
              <AttatchAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image.svg" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/share-video.svg" />
                </AssetButton>
              </AttatchAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/share-comment.svg" />
                  Anyone
                </AssetButton>
              </ShareComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </SharedCreations>
          </Content>
        </Container>
      )}
    </>
  );
};

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const PostButton = styled.button`
  min-width: 40px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 20px;
  background: ${(props) => (props.disabled ? "#b8b8b8" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "#5a5a5a" : "#fff")};
  font-size: 16px;
  letter-spacing: 1.1px;
  border: none;
  outline: none;
  &:hover {
    background: ${(props) => (props.disabled ? "#b8b8b8" : "#004182")};
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  ${AssetButton} {
    border-radius: 50px;
    padding: 5px 10px;
    span {
      font-size: 16px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
      padding: 0 5px;
    }
  }
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  margin-right: 8px;
  border-radius: 50%;
  border: none;
  outline: none;
  justify-content: center;
  background: transparent;
  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const AttatchAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
`;
const SharedCreations = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img,
  svg {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border-radius: 50%;
    border: 2px solid transparent;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* h2 {
    font-weight: 400;
  } */
  button {
    width: 40px;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);

    svg,
    img {
      pointer-events: none;
    }
  }
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  max-height: 90%;
  background-color: #fff;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s ease;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
