import React from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Room.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { getRoom } from "../../http";

export default function Room() {
  // get parameter from url
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isMute, setMute] = useState(true);

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      console.log(data);
      setRoom((prev) => {
        return data;
      });
    };
    fetchRoom();
  }, [roomId]);

  const handleMuteClick = (clientId, client) => {
    if (clientId !== user.id) return;
    setMute((prev) => !prev);
  };

  return (
    <div>
      {/* container is global class */}
      <div className="container">
        <button className={styles.goBack} onClick={handleManualLeave}>
          <img src="/images/arrow-left.png" alt="arrow-left" />
          <span>All Voice rooms</span>
        </button>
      </div>

      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src="/images/palm.png" alt="palm-icon" />
            </button>
            <button className={styles.actionBtn} onClick={handleManualLeave}>
              <img src="/images/win.png" alt="win-icon" />
              <span>Leave Quitely</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead}>
                  <audio
                    ref={(instance) => provideRef(instance, client.id)}
                    autoPlay
                  ></audio>
                  <img
                    className={styles.userAvatar}
                    src={client.avatar}
                    alt="avatar"
                  />
                  <button
                    onClick={() => handleMuteClick(client.id, client)}
                    className={styles.micBtn}
                  >
                    {client.muted ? (
                      <img src="/images/mic-mute.png" alt="mic-mute-icon" />
                    ) : (
                      <img src="/images/mic.png" alt="mic-icon" />
                    )}
                  </button>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
