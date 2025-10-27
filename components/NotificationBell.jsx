"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, X } from "lucide-react";
import { db1 } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

export default function NotificationBell({ setShowNav }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Fetch latest posts as notifications
  useEffect(() => {
    const q = query(
      collection(db1, "blogs"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(docs);

        // Count unread (posts from last 24 hours)
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const unread = docs.filter(
          (doc) => doc.createdAt?.toDate() > oneDayAgo
        ).length;
        setUnreadCount(unread);
      }
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const createFullSlug = (title, id) => {
    return `${createSlug(title)}--${id}`;
  };

  const getTimeAgo = (date) => {
    if (!date) return "Just now";

    const now = new Date();
    const postDate = date.toDate();
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString();
  };

  const isNew = (date) => {
    if (!date) return false;
    const now = new Date();
    const postDate = date.toDate();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return postDate > oneDayAgo;
  };

  const handleNotificationClick = () => {
    setIsOpen(false);
    setUnreadCount(0); // Mark all as read when opening
    if (setShowNav) {
      setShowNav(false); // Close the mobile navbar immediately
    }
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    // If opening the dropdown, close the navbar
    if (!isOpen && setShowNav) {
      setShowNav(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:bg-white/10 rounded-full transition-all duration-200"
        aria-label="Notifications"
      >
        <Bell size={24} />

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute -right-12 mt-3 w-96  max-w-[calc(100vw-2rem)] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 z-[100] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg">Notifications</h3>
              <p className="text-white/80 text-xs">
                {notifications.length} new posts
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-[500px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Bell size={48} className="mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={`/news/${createFullSlug(
                      notification.title,
                      notification.id
                    )}`}
                    onClick={handleNotificationClick}
                    className="block hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="p-4 flex gap-3">
                      {/* Image */}
                      {notification.imageUrl && (
                        <div className="flex-shrink-0">
                          <img
                            src={notification.imageUrl}
                            alt={notification.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-white font-semibold text-sm line-clamp-2">
                            {notification.title}
                          </h4>
                          {isNew(notification.createdAt) && (
                            <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1"></span>
                          )}
                        </div>

                        {notification.subtitle && (
                          <p className="text-gray-400 text-xs line-clamp-1 mb-2">
                            {notification.subtitle}
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-xs">
                          <span
                            className={`px-2 py-1 rounded-md font-semibold ${
                              notification.category
                                ? "bg-red-600 text-white"
                                : "bg-gray-700 text-gray-300"
                            }`}
                          >
                            {notification.category || "Other"}
                          </span>
                          <span className="text-gray-500">
                            {getTimeAgo(notification.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="bg-gray-800/50 px-6 py-3 text-center border-t border-gray-700">
              <Link
                href="/global"
                onClick={() => {
                  setIsOpen(false);
                  if (setShowNav) {
                    setShowNav(false);
                  }
                }}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
              >
                View All Posts →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
