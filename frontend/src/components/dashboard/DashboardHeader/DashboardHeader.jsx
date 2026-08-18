


import "./DashboardHeader.css";

import { useEffect, useRef, useState } from "react";

import { FaBell, FaCheck } from "react-icons/fa";

import { useAuth } from "../../../context/AuthContext";

import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
} from "../../../services/notificationService";



function getRelativeTime(dateString) {

    const date = new Date(dateString);

    const now = new Date();

    const seconds = Math.floor(
        (now - date) / 1000
    );

    if (seconds < 60) {
        return "just now";
    }

    const minutes = Math.floor(
        seconds / 60
    );

    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(
        minutes / 60
    );

    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(
        hours / 24
    );

    if (days < 7) {
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    return date.toLocaleDateString();

}



function DashboardHeader({

    title,

    subtitle

}) {

    const { user } = useAuth();


    const [notifications, setNotifications] =
        useState([]);

    const [unreadCount, setUnreadCount] =
        useState(0);

    const [showNotifications, setShowNotifications] =
        useState(false);

    const notificationRef =
        useRef(null);


    /*
     * Load notification count.
     *
     * We do this when the header loads and
     * periodically so a newly created notification
     * appears without refreshing the page.
     */
    useEffect(() => {

        if (!user) {
            return;
        }

        loadUnreadCount();

        const interval = setInterval(
            loadUnreadCount,
            30000
        );

        return () => {
            clearInterval(interval);
        };

    }, [user]);


    /*
     * Close dropdown when clicking outside.
     */
    useEffect(() => {

        function handleOutsideClick(event) {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target
                )
            ) {

                setShowNotifications(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);


    async function loadUnreadCount() {

        try {

            const count =
                await getUnreadNotificationCount();

            setUnreadCount(count);

        }
        catch (error) {

            console.error(
                "NOTIFICATION COUNT ERROR:",
                error
            );

        }

    }


    async function loadNotifications() {

        try {

            const data =
                await getNotifications();

            setNotifications(data);

            const unread =
                data.filter(
                    notification =>
                        !notification.is_read
                ).length;

            setUnreadCount(unread);

        }
        catch (error) {

            console.error(
                "NOTIFICATION LOAD ERROR:",
                error
            );

        }

    }


    async function handleNotificationToggle() {

        const nextState =
            !showNotifications;

        setShowNotifications(nextState);

        if (nextState) {

            await loadNotifications();

        }

    }


    async function handleNotificationClick(
        notification
    ) {

        /*
         * If already read, nothing needs to happen.
         */
        if (notification.is_read) {
            return;
        }

        try {

            await markNotificationRead(
                notification.id
            );

            setNotifications(
                previous =>
                    previous.map(item =>
                        item.id === notification.id
                            ? {
                                ...item,
                                is_read: true
                            }
                            : item
                    )
            );

            setUnreadCount(
                previous =>
                    Math.max(previous - 1, 0)
            );

        }
        catch (error) {

            console.error(
                "MARK NOTIFICATION ERROR:",
                error
            );

        }

    }


    async function handleMarkAllRead() {

        if (unreadCount === 0) {
            return;
        }

        try {

            await markAllNotificationsRead();

            setNotifications(
                previous =>
                    previous.map(notification => ({
                        ...notification,
                        is_read: true
                    }))
            );

            setUnreadCount(0);

        }
        catch (error) {

            console.error(
                "MARK ALL NOTIFICATIONS ERROR:",
                error
            );

        }

    }
// profile phot

    const rawProfileImage =
        user?.profile_image ||
        user?.profileImage ||
        null;

    const profileImage =
        rawProfileImage
            ? rawProfileImage.startsWith("http")
                ? rawProfileImage
                : `http://127.0.0.1:8000${rawProfileImage}`
            : null;


    return (

        <header className="dashboard-header">

            <div className="dashboard-header-content">

                <h1>{title}</h1>

                <p>
                    {subtitle}
                    {user && ` • Welcome, ${user.username}`}
                </p>

            </div>

            <div className="dashboard-user">

                {/* notifications */}

                <div
                    className="notification-wrapper"
                    ref={notificationRef}
                >

                    <button
                        type="button"
                        className={`notification-btn ${
                            showNotifications
                                ? "notification-btn-active"
                                : ""
                        }`}
                        onClick={
                            handleNotificationToggle
                        }
                        aria-label="Notifications"
                    >

                        <FaBell />

                        {unreadCount > 0 && (

                            <span className="notification-badge">

                                {unreadCount > 99
                                    ? "99+"
                                    : unreadCount}

                            </span>

                        )}

                    </button>


                    {showNotifications && (

                        <div className="notification-dropdown">


                            <div className="notification-header">

                                <div>

                                    <h3>
                                        Notifications
                                    </h3>

                                    {unreadCount > 0 && (

                                        <span>
                                            {unreadCount} unread
                                        </span>

                                    )}

                                </div>

                                <div className="notification-header-actions">

                                    {unreadCount > 0 && (
                                        <button
                                            type="button"
                                            className="mark-all-btn"
                                            onClick={handleMarkAllRead}
                                        >
                                            <FaCheck />
                                            <span>Mark all read</span>
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="notification-close"
                                        onClick={() => setShowNotifications(false)}
                                        aria-label="Close notifications"
                                    >
                                        ×
                                    </button>

                                </div>

                            </div>


                            <div className="notification-list">


                                {notifications.length === 0 ? (

                                    <div className="notification-empty">

                                        <FaBell />

                                        <p>
                                            No notifications yet
                                        </p>

                                    </div>

                                ) : (

                                    notifications.map(
                                        notification => (

                                            <button
                                                type="button"
                                                key={
                                                    notification.id
                                                }
                                                className={`notification-item ${
                                                    !notification.is_read
                                                        ? "notification-unread"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleNotificationClick(
                                                        notification
                                                    )
                                                }
                                            >

                                                <div className="notification-icon">

                                                    <FaBell />

                                                </div>


                                                <div className="notification-content">

                                                    <strong>
                                                        {
                                                            notification.title
                                                        }
                                                    </strong>

                                                    <p>
                                                        {
                                                            notification.message
                                                        }
                                                    </p>

                                                    <small>
                                                        {getRelativeTime(
                                                            notification.created_at
                                                        )}
                                                    </small>

                                                </div>


                                                {!notification.is_read && (

                                                    <span className="unread-dot" />

                                                )}

                                            </button>

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    )}

                </div>

                {/* <button className="notification-btn">

                    <FaBell />

                </button> */}

                {/* user avatar */}

                <div className="dash-user-avatar">

                    {/* {user?.username?.charAt(0).toUpperCase()} */}
                    {profileImage ? (

                        <img
                            src={profileImage}
                            alt={
                                user?.username ||
                                "Profile"
                            }
                        />

                    ) : (

                        user?.username
                            ?.charAt(0)
                            .toUpperCase()

                    )}

                </div>

            </div>

        </header>

    );

}

export default DashboardHeader;



