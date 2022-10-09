import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AddRoomModel } from "../../components/AddRoomModel/AddRoomModel";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getAllRooms } from "../../http";
import styles from "./Rooms.module.css"

const Rooms = ()=>{

    // const rooms = [
    //     {
    //         id:1,
    //         topic: "Which framework best for frontend ?",
    //         speakers: [
    //             {
    //                 id: 1,
    //                 name: "jhon Doe",
    //                 avatar: "/images/monkey-avatar.png",
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Jane Doe',
    //                 avatar: '/images/monkey-avatar.png',
    //             }
    //         ],
    //         totalPeople: 40,
    //     },
    //     {
    //         id:2,
    //         topic: "Which framework best for backend ?",
    //         speakers: [
    //             {
    //                 id: 1,
    //                 name: "jhon Doe",
    //                 avatar: "/images/monkey-avatar.png",
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Jane Doe',
    //                 avatar: '/images/monkey-avatar.png',
    //             }
    //         ],
    //         totalPeople: 40,
    //     },
    // ]

    const [showModel, setShowModel] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        const fetchRooms = async ()=>{
            const {data} = await getAllRooms();
            setRooms(data);
        }
        fetchRooms();
    }, [])

    function openModel(){
        setShowModel(true);
    }

    function closeModel(){
        setShowModel(false);
    }

    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>
                        <div className={styles.searchBox}>
                            <label htmlFor="searchInput" className={styles.searchLabel}><img src="/images/search-icon.png" alt="search" /></label>
                            <input type="text" id="searchInput" className={styles.searchInput} placeholder="Search rooms"/>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button onClick={openModel} className={styles.startRoomBtn}>
                            <img src="/images/add-room-icon.png" alt="add-room" />
                            <span>start a room</span>
                        </button>
                    </div>
                </div>

                <div className={styles.roomList}>
                    {
                        rooms.map(room => <RoomCard key={room.id} room={room}/>)
                    }
                </div>
            </div>
            {showModel && <AddRoomModel onClose={closeModel}/>}
        </>
    )
}

export default Rooms;