import { styled, keyframes } from "styled-components";
import React, { useCallback, useState, useRef, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import enlargeIcon from "../images/enlarge_102020.svg";
import Modal from "react-bootstrap/Modal";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import downloadIcon from "../images/download-347.svg";
import { Link, useLocation } from "react-router-dom";

const ImgDiv = styled.div`
  img:first-child {
    width: 100%;
  }

  img:last-child {
    opacity: 0;
    position: absolute;
    width: 60px;
  }

  &:hover {
    img:first-child {
      opacity: 0.5;
    }

    img:last-child {
      opacity: 1;
      cursor: pointer;
      position: absolute;
      width: 60px;
    }
  }

  height: 280px;
  width: 210px;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.175);
  border-radius: 0.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  .spinner-grow {
    color: gray;
    width: 50px;
    height: 50px;
  }
`;

export default function ImageComponent({ id, type, object, className }) {
  const location = useLocation();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLarge, setIsLarge] = useState(false);

  const handleEnlarge = (e) => {
    setIsLarge(true);
  };

  const handleImageFetch = useCallback(() => {
    const imageURL = `http://185.206.93.9:8000/register/download/${type}/${id}/${object}/${location.state.username}/${location.state.password}/`;
    axios
      .get(imageURL, { responseType: "arraybuffer" })
      .then((response) => {
        const base64Data = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const imageUrl = `data:image/jpeg;base64,${base64Data}`;
        setImageData(imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [imageData]);

  useEffect(handleImageFetch, []);

  return (
    <>
      {!loading && (
        <ImgDiv className={className}>
          {imageData && <img src={imageData} alt="Fetched Image" />}
          <img src={enlargeIcon} onClick={handleEnlarge} />
        </ImgDiv>
      )}
      {loading && (
        <ImgDiv className={className}>
          <Spinner animation="grow" />
        </ImgDiv>
      )}
      {
        <Modal
          show={isLarge}
          onHide={() => setIsLarge(false)}
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            با استفاده از چرخانک موس می توانید بزرگنمایی کنید
          </Modal.Header>
          <Modal.Body className="p-2">
            <TransformWrapper>
              <TransformComponent>
                {imageData && <img src={imageData} style={{ width: "100%" }} />}
              </TransformComponent>
            </TransformWrapper>
          </Modal.Body>

          <Link
            to={imageData}
            download={`${type}`}
            target="_blank"
            rel="noreferrer"
          >
            <Modal.Footer
              style={{
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
              }}
              className="btn btn-success bg-success m-1 rounded-3 mt-0"
            >
              <img src={downloadIcon} style={{ width: "30px" }} />
            </Modal.Footer>
          </Link>
        </Modal>
      }
    </>
  );
}
