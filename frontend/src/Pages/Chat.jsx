import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import profilePic from "../Assets/profilePic.png";
import { ImAttachment } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";

import { RingLoader } from "react-spinners"; // Import the RingLoader component

import "./CSS/Chat.css";

const Chat = () => {
  const { recipientId, senderId, recipientName } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [chatList, setChatList] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image file
  const [imagePreview, setImagePreview] = useState(""); // State to store image preview URL

  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const fileInputRef = useRef(null);

  const loggedInUserId = localStorage.getItem("userID");

  // Initialize Socket.IO connection
  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Generate a unique room name based on senderId and recipientId
    const room = [senderId, recipientId].sort().join("_");

    // Join the private room for the current conversation
    socket.emit("join_room", room);

    // Handle incoming messages
    socket.on("private_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data); // Check if the message is received correctly
    });

    return () => {
      socket.close();
    };
  }, [senderId, recipientId]);

  // Function to send a message
  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedImage) {
      // Don't send empty messages
      return;
    }

    // Set loading state to true when sending message
    setIsLoading(true);

    const socket = io("http://localhost:5000");

    const room = [senderId, recipientId].sort().join("_");

    // Check if message or image is selected
    if (selectedImage) {
      // Send the image to the server for upload
      axios
        .post("http://localhost:5000/upload-image", { imageUrl: imagePreview })
        .then((response) => {
          // Once image is uploaded, send the image URL to the recipient
          socket.emit("private_message", {
            sender: loggedInUserId,
            recipient: recipientId,
            imageUrl: response.data.imageUrl,
            room: room,
          });
          // Clear selected image
          setSelectedImage(null);
          setImagePreview("");
          setNewMessage("");
          setIsLoading(false); // Set loading state to false after sending message
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setIsLoading(false); // Set loading state to false in case of error
        });
    } else {
      // Send text message
      socket.emit("private_message", {
        sender: loggedInUserId,
        recipient: recipientId,
        content: newMessage,
        room: room, // Room for private conversation
      });
      setNewMessage("");
      setIsLoading(false); // Set loading state to false after sending message
    }
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Convert the image to base64 format
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        // console.log("Base64 image:", base64Image); // Log the base64 image value
        setImagePreview(base64Image);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    //Fetch chat list data for the logged-in user
    axios
      .get(`http://localhost:5000/api/chat-list/${loggedInUserId}`)
      .then((response) => {
        console.log("Chat list data:", response.data); //Log the retrieved data
        setChatList(response.data); //Update chatList state with the retrieved data
      })
      .catch((error) => console.error("Error fetching chat list:", error));
  }, []);

  // Fetch chat history when the component mounts
  useEffect(() => {
    if (!recipientId && !senderId && !recipientName) {
      return;
    }
    // Fetch chat history for the current conversation
    axios
      .get(
        `http://localhost:5000/api/messages/${loggedInUserId}/${recipientId}`
      )
      .then((response) => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching chat history:", error));
  }, [loggedInUserId, recipientId]);

  const handleChatParticipantClick = (participantId) => {
    // Fetch messages between the current user and the selected chat partner
    axios
      .get(
        `http://localhost:5000/api/messages/${loggedInUserId}/${participantId}`
      )
      .then((response) => {
        // Update the messages state with the retrieved messages
        console.log(response.data);
        setMessages(response.data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  return (
    <>
      <main className="content ">
        <div className="container p-0">
          {/* <h1 className="h3 mb-3">Messages</h1> */}
          <div className="card ms-5">
            <div className="row g-0">
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                {/* Mobile and Tablet View  */}

                <div className="d-lg-none ">
                  <button
                    className="btn btn-primary btn-block mt-3 mb-5"
                    onClick={() =>
                      setIsMobileDropdownOpen(!isMobileDropdownOpen)
                    }
                  >
                    {isMobileDropdownOpen ? "Hide Chats" : "Show Chats"}
                  </button>

                  {isMobileDropdownOpen && (
                    <div id="listItems" className="mt-3 mb-5">
                      {chatList.length === 0 ? (
                        <h5 className="text-muted text-center mt-5">
                          No chats
                        </h5>
                      ) : (
                        chatList.map((item, index) => (
                          <Link
                            key={index}
                            to={`/chat/${item.id}/${loggedInUserId}/${item.name}`}
                            className="list-group-item list-group-item-action border-0"
                            onClick={() => handleChatParticipantClick(item.id)}
                          >
                            {/* <div className="badge bg-success float-right">10</div> */}
                            <div className="d-flex align-items-start">
                              <img
                                src={profilePic}
                                className="rounded-circle mr-1"
                                alt="William Harris"
                                width="40"
                                height="40"
                              />
                              <div className="flex-grow-1 ml-3">
                                {item.name}
                                {/* <div className="small">
                                      <span className="fas fa-circle chat-online"></span>{" "}
                                      Online
                                    </div> */}
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Laptop and Larger View  */}
                <div className="d-none d-lg-block">
                  <div id="listItems" className="mt-3">
                    {chatList.length === 0 ? (
                      <h5 className="text-muted text-center mt-5">No chats</h5>
                    ) : (
                      chatList.map((item, index) => (
                        <Link
                          key={index}
                          to={`/chat/${item.id}/${loggedInUserId}/${item.name}`}
                          className="list-group-item list-group-item-action border-0"
                          onClick={() => handleChatParticipantClick(item.id)}
                        >
                          {/* <div className="badge bg-success float-right">10</div> */}
                          <div className="d-flex align-items-start">
                            <img
                              src={profilePic}
                              className="rounded-circle mr-1"
                              alt="William Harris"
                              width="40"
                              height="40"
                            />

                            <div className="flex-grow-1 ml-3">
                              {item.name}

                              {/* <div className="small">
                              <span className="fas fa-circle chat-online"></span>{" "}
                              Online
                            </div> */}
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                    <hr className="mt-1 mb-0" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom ">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      {/* <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width="40"
                        height="40"
                      /> */}
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong> {recipientName} </strong>
                    </div>
                  </div>
                </div>

                <div className="position-relative">
                  <div className="chat-messages p-4">
                    {messages.length === 0 ? (
                      <h5 className="text-muted text-center mt-5">
                        Select a chat to see messages
                      </h5>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          // id={`message-${index}`}
                          key={index}
                          className={`chat-message-${
                            message.sender === loggedInUserId ? "right" : "left"
                          } mb-4`}
                        >
                          <div>
                            {/* <img src={profilePic} className="rounded-circle mr-1" alt={message.sender} width="40" height="40" /> */}
                            {/* <div className="text-muted small text-nowrap mt-2">{message.timestamp}</div> */}
                          </div>
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                            {/* <div className="font-weight-bold mb-1">{message.sender.name}</div> */}
                            {message.imageUrl ? (
                              // If the message contains an image URL, render the image
                              <img
                                src={message.imageUrl}
                                alt=""
                                style={{ maxWidth: "100%", maxHeight: "200px" }} // Adjust styles as needed
                              />
                            ) : (
                              // If the message is plain text, render the text content
                              <div>{message.content}</div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex-grow-0 py-3 px-4 border-top">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent form submission from refreshing the page
                      handleSendMessage();
                    }}
                  >
                    <div className="input-group">
                      {/* Conditionally render input text field or image preview */}
                      {!imagePreview && (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type your message"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                      )}

                      {imagePreview && (
                        <div>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                            // className="me-auto"
                          />

                          <button
                            type="button"
                            className="btn btn-light "
                            onClick={() => {
                              setImagePreview(null);
                              setNewMessage(""); // Clear message when image is removed
                            }}
                          >
                            <MdOutlineCancel />
                          </button>
                        </div>
                      )}

                      {/* Conditionally render input file button or send button */}
                      {!imagePreview && (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            ref={fileInputRef}
                            style={{ display: "none" }} // Hide the file input
                            onChange={handleImageChange}
                          />
                          <button
                            type="button"
                            className="btn btn-light ms-3 me-3" // Style the button as you like
                            onClick={() => fileInputRef.current.click()} // Trigger file input click event
                          >
                            <ImAttachment /> {/* Icon for uploading image */}
                          </button>
                        </>
                      )}

                      {/* Show loading spinner when sending message */}
                      {isLoading ? (
                        <div className="d-flex align-items-end">
                          <RingLoader
                            color="#000033"
                            loading={isLoading}
                            size={30} // Adjust spinner size as needed
                          />
                          <span className="ms-auto">Sending...</span>
                        </div>
                      ) : (
                        // Show send button when not loading
                        <button
                          type="button"
                          className="btn btn-primary ms-auto"
                          onClick={handleSendMessage}
                        >
                          Send
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Chat;
