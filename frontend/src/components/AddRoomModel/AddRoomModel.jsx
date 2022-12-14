import React from 'react'
import { useState } from 'react';
import TextInput from '../shared/TextInput/TextInput';
import styles from "./AddRoomModel.module.css";
import { createRoom as create } from '../../http';
import { useNavigate } from 'react-router';

export const AddRoomModel = ({onClose}) => {

    const [roomType, setRoomType] = useState('open');
    const [topic, setTopic] = useState('');

    const navigate = useNavigate();

    function selectType(type){
        setRoomType(type);
        var audio = new Audio('/images/click-sound.wav');
        audio.volume = 0.1;
        audio.currentTime = 0.2;
        audio.play();
    }

    async function createRoom(){
        // server call 
        try{
            if(!topic) return;
            const {data} = await create({topic, roomType});
            navigate(`/room/${data.id}`);
            console.log(data);
        } catch(err){
            console.log(err.message);
        }
        
    }

  return (
    <div className={styles.modelMask}>
        <div className={styles.modelBody}>
            <button onClick={onClose} className={styles.closeBtn}>
                <img src="/images/close.png" alt="close" />
            </button>
            <div className={styles.modelHeader}>
                <h3 className={styles.heading}>Enter the topic to be disscused</h3>
                <TextInput fullwidth="true" value={topic} onChange={(e)=>{setTopic(e.target.value)}} />
                <h2 className={styles.subHeading}>Select Room Type</h2>
                <div className={styles.roomType}>
                    <div onClick={()=>{selectType("open")}} className={`${styles.typeBox} ${(roomType === "open")? styles.active : ""}`}>
                        <img src="/images/globe.png" alt="globe-img" />
                        <span>Open</span>
                    </div>
                    <div onClick={()=>selectType("social")} className={`${styles.typeBox} ${(roomType === "social")? styles.active : ""}`}>
                        <img src="/images/social.png" alt="social-img" />
                        <span>Social</span>
                    </div>
                    <div onClick={()=>selectType("private")} className={`${styles.typeBox} ${(roomType === "private")? styles.active : ""}`}>
                        <img src="/images/lock.png" alt="lock-img" />
                        <span>Private</span>
                    </div>
                </div>
            </div>
            <div className={styles.modelFooter}>
                <h2>Start a room, open to everyone</h2>
                <button className={styles.footerButton} onClick={createRoom}>
                    <img src="/images/celebration.png" alt="celebration" />
                    <span>Let's go</span>
                </button>
            </div>
        </div>
    </div>
  )
}
