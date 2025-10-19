"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, updateDoc, collection, query, where, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import { LogOut, Edit2, Save, X, Upload, Settings, Bell, HelpCircle, Trash2 } from "lucide-react";
import { formatFirestoreDate } from "@/lib/dateUtils";

export default function UserProfile() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewingUserId = searchParams.get("id");
    const isOwnProfile = !viewingUserId || viewingUserId === user?.uid;

    const [activeTab, setActiveTab] = useState("feedback");
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editBio, setEditBio] = useState("");
    const [editBusinessLink, setEditBusinessLink] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [saving, setSaving] = useState(false);
    const [userFeedback, setUserFeedback] = useState([]);
    const [loadingFeedback, setLoadingFeedback] = useState(true);
    const [feedbackStats, setFeedbackStats] = useState({ total: 0, types: {} });
    const [notifications, setNotifications] = useState(true);
    const [newsletter, setNewsletter] = useState(true);
    const [viewingUser, setViewingUser] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [editingFeedbackId, setEditingFeedbackId] = useState(null);
    const [editingFeedback, setEditingFeedback] = useState({ title: "", message: "" });
    const [savingFeedback, setSavingFeedback] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user && isOwnProfile) {
            router.push("/login");
        }
    }, [user, isOwnProfile, router]);

    useEffect(() => {
        if (isOwnProfile && user) {
            setEditName(user?.name || "");
            setEditEmail(user?.email || "");
            setEditBio(user?.bio || "");
            setEditBusinessLink(user?.businessLink || "");
            setNotifications(user?.notificationsEnabled !== false);
            setNewsletter(user?.newsletterSubscribed !== false);
            fetchUserFeedback(user?.email);
            setLoadingProfile(false);
        } else if (viewingUserId && viewingUserId !== user?.uid) {
            fetchPublicProfile(viewingUserId);
        }
    }, [user, viewingUserId, isOwnProfile]);

    const fetchPublicProfile = async (userId) => {
        try {
            const userDoc = await getDoc(doc(db1, "users", userId));
            if (userDoc.exists()) {
                setViewingUser({ id: userId, ...userDoc.data() });
                fetchUserFeedback(userDoc.data().email);
            } else {
                router.push("/404");
            }
        } catch (error) {
            console.error("Error fetching public profile:", error);
            router.push("/");
        } finally {
            setLoadingProfile(false);
        }
    };

    const fetchUserFeedback = async (email) => {
        try {
            const feedbackQuery = query(
                collection(db1, "feedback"),
                where("email", "==", email)
            );
            const querySnapshot = await getDocs(feedbackQuery);
            const feedbackList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserFeedback(feedbackList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

            const stats = { total: feedbackList.length, types: {} };
            feedbackList.forEach((item) => {
                stats.types[item.feedbackType] = (stats.types[item.feedbackType] || 0) + 1;
            });
            setFeedbackStats(stats);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoadingFeedback(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            const updateData = {
                name: editName,
                email: editEmail,
                bio: editBio,
                businessLink: editBusinessLink,
                notificationsEnabled: notifications,
                newsletterSubscribed: newsletter,
            };
            if (profileImage) {
                updateData.profileImage = profileImage;
            }

            await updateDoc(doc(db1, "users", user?.uid), updateData);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEditFeedback = (feedback) => {
        setEditingFeedbackId(feedback.id);
        setEditingFeedback({ title: feedback.title, message: feedback.message });
    };

    const handleSaveFeedback = async () => {
        setSavingFeedback(true);
        try {
            await updateDoc(doc(db1, "feedback", editingFeedbackId), {
                title: editingFeedback.title,
                message: editingFeedback.message,
                updatedAt: new Date().toISOString(),
            });

            setUserFeedback(userFeedback.map(f =>
                f.id === editingFeedbackId
                    ? { ...f, ...editingFeedback, updatedAt: new Date().toISOString() }
                    : f
            ));

            setEditingFeedbackId(null);
            setEditingFeedback({ title: "", message: "" });
            alert("Feedback updated successfully!");
        } catch (error) {
            console.error("Error updating feedback:", error);
            alert("Failed to update feedback: " + error.message);
        } finally {
            setSavingFeedback(false);
        }
    };

    const handleDeleteFeedback = async (feedbackId) => {
        if (!confirm("Are you sure you want to delete this feedback?")) return;

        try {
            await deleteDoc(doc(db1, "feedback", feedbackId));
            setUserFeedback(userFeedback.filter(f => f.id !== feedbackId));

            const stats = { total: feedbackStats.total - 1, types: {} };
            userFeedback.forEach((item) => {
                if (item.id !== feedbackId) {
                    stats.types[item.feedbackType] = (stats.types[item.feedbackType] || 0) + 1;
                }
            });
            setFeedbackStats(stats);

            alert("Feedback deleted successfully!");
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("Failed to delete feedback: " + error.message);
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    if (loadingProfile) {
        return <div className="text-center py-20 min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const profileData = isOwnProfile ? user : viewingUser;
    const userInitial = profileData?.email?.charAt(0).toUpperCase() || "U";
    const displayImage = isOwnProfile ? (profileImage || user?.profileImage) : viewingUser?.profileImage;
    const joinedDate = formatFirestoreDate(profileData?.createdAt);
    const memberDays = profileData?.createdAt
        ? (() => {
            let date;
            if (profileData.createdAt?.toDate) {
                date = profileData.createdAt.toDate();
            } else if (profileData.createdAt?.seconds) {
                date = new Date(profileData.createdAt.seconds * 1000);
            } else {
                date = new Date(profileData.createdAt);
            }
            return isNaN(date.getTime()) ? 0 : Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        })()
        : 0;

    return (
        <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="rounded-2xl p-6 sm:p-8 mb-8 shadow-lg border mt-20 lg:mt-40">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-8">
                        {/* Profile Image and Info */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 flex-1 min-w-0">
                            <div className="relative flex-shrink-0">
                                {displayImage ? (
                                    <img
                                        src={displayImage}
                                        alt="Profile"
                                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-purple-500"
                                    />
                                ) : (
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
                                        {userInitial}
                                    </div>
                                )}
                                {isOwnProfile && isEditing && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg"
                                    >
                                        <Upload size={16} />
                                    </button>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>

                            {!isEditing ? (
                                <div className="text-center sm:text-left flex-1 min-w-0">
                                    <h1 className="text-2xl sm:text-3xl font-bold truncate">{profileData?.name || "User"}</h1>
                                    <p className="break-all">{profileData?.email}</p>
                                    {profileData?.bio && (
                                        <p className="mt-2 text-sm">{profileData.bio}</p>
                                    )}
                                    {profileData?.businessLink && (
                                        <a
                                            href={profileData.businessLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-sm block mt-2 text-blue-500 underline"
                                        >
                                            {profileData.businessLink}
                                        </a>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-4 mt-3 text-sm">
                                        <span>Joined {joinedDate}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span>{memberDays} days member</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full sm:flex-1 space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={editEmail}
                                            onChange={(e) => setEditEmail(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Bio</label>
                                        <textarea
                                            value={editBio}
                                            onChange={(e) => setEditBio(e.target.value)}
                                            placeholder="Tell us about yourself..."
                                            maxLength={200}
                                            rows={3}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                        />
                                        <p className="text-xs mt-1">{editBio.length}/200</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Business Link</label>
                                        <input
                                            type="url"
                                            value={editBusinessLink}
                                            onChange={(e) => setEditBusinessLink(e.target.value)}
                                            placeholder="https://yourwebsite.com"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        {isOwnProfile && (
                            <div className="flex flex-wrap gap-2 sm:flex-col justify-center sm:justify-start w-full sm:w-auto">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex-1 sm:flex-none"
                                    >
                                        <Edit2 size={18} />
                                        <span className="hidden sm:inline">Edit Profile</span>
                                        <span className="sm:hidden">Edit</span>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={saving}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50 flex-1"
                                        >
                                            <Save size={18} />
                                            {saving ? "Saving..." : "Save"}
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition flex-1"
                                        >
                                            <X size={18} />
                                            Cancel
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex-1"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Section */}
                {feedbackStats.total > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-purple-500">
                            <p className="text-gray-600 text-sm">Total Feedback</p>
                            <p className="text-2xl font-bold text-purple-600">{feedbackStats.total}</p>
                        </div>
                        {Object.entries(feedbackStats.types).map(([type, count]) => (
                            <div key={type} className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
                                <p className="text-gray-600 text-sm capitalize">{type}</p>
                                <p className="text-2xl font-bold text-blue-600">{count}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tabs Navigation */}
                <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto bg-white rounded-t-lg">
                    <button
                        onClick={() => setActiveTab("feedback")}
                        className={`px-4 py-3 font-semibold whitespace-nowrap transition ${activeTab === "feedback"
                            ? "border-b-2 border-purple-600 text-purple-600"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Feedback
                    </button>
                    {isOwnProfile && (
                        <>
                            <button
                                onClick={() => setActiveTab("preferences")}
                                className={`px-4 py-3 font-semibold whitespace-nowrap transition flex items-center gap-2 ${activeTab === "preferences"
                                    ? "border-b-2 border-purple-600 text-purple-600"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                <Settings size={18} />
                                Preferences
                            </button>
                            <button
                                onClick={() => setActiveTab("help")}
                                className={`px-4 py-3 font-semibold whitespace-nowrap transition flex items-center gap-2 ${activeTab === "help"
                                    ? "border-b-2 border-purple-600 text-purple-600"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                <HelpCircle size={18} />
                                Help
                            </button>
                        </>
                    )}
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-b-lg p-6">
                    {/* Feedback Tab */}
                    {activeTab === "feedback" && (
                        <div className="space-y-4">
                            {loadingFeedback ? (
                                <div className="text-center py-8">Loading feedback...</div>
                            ) : userFeedback.length === 0 ? (
                                <div className="rounded-lg p-6 sm:p-8 text-center border-2 border-dashed border-gray-300">
                                    <p className="text-gray-600 mb-4">No feedback submitted yet.</p>
                                    {isOwnProfile && (
                                        <a
                                            href="/feedback"
                                            className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                                        >
                                            Submit Feedback
                                        </a>
                                    )}
                                </div>
                            ) : (
                                userFeedback.map((item) => (
                                    <div key={item.id} className="rounded-lg p-4 sm:p-6 border shadow-sm hover:shadow-md transition">
                                        {editingFeedbackId === item.id ? (
                                            // Edit Mode
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-semibold mb-2 text-black">Title</label>
                                                    <input
                                                        type="text"
                                                        value={editingFeedback.title}
                                                        onChange={(e) => setEditingFeedback({ ...editingFeedback, title: e.target.value })}
                                                        className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-purple-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold mb-2 text-black">Message</label>
                                                    <textarea
                                                        value={editingFeedback.message}
                                                        onChange={(e) => setEditingFeedback({ ...editingFeedback, message: e.target.value })}
                                                        rows={4}
                                                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveFeedback}
                                                        disabled={savingFeedback}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50 flex-1"
                                                    >
                                                        <Save size={16} />
                                                        {savingFeedback ? "Saving..." : "Save"}
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingFeedbackId(null)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition flex-1"
                                                    >
                                                        <X size={16} />
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View Mode
                                            <>
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold break-words flex-1 text-black">{item.title}</h3>
                                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-700 rounded-full text-sm capitalize font-medium whitespace-nowrap flex-shrink-0">
                                                        {item.feedbackType}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-3">{item.message}</p>
                                                <p className="text-sm text-gray-500 mb-3">
                                                    {formatFirestoreDate(item.createdAt, "datetime")}
                                                </p>
                                                {isOwnProfile && (
                                                    <div className="flex gap-2 pt-3 border-t">
                                                        <button
                                                            onClick={() => handleEditFeedback(item)}
                                                            className="flex items-center gap-2 px-4 py-2 text-black border border-purple-500 rounded-lg hover:border-purple-700 transition text-sm flex-1"
                                                        >
                                                            <Edit2 size={16} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteFeedback(item.id)}
                                                            className="flex items-center text-black gap-2 px-4 py-2 border border-red-500 rounded-lg hover:border-red-700 transition text-sm flex-1"
                                                        >
                                                            <Trash2 size={16} />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Preferences Tab - Only for own profile */}
                    {activeTab === "preferences" && isOwnProfile && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg text-black">
                                <div className="flex items-center gap-3">
                                    <Bell size={20} />
                                    <div>
                                        <p className="font-semibold">Notifications</p>
                                        <p className="text-sm text-gray-600">Receive updates about your feedback</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${notifications
                                        ? "bg-purple-600 text-white hover:bg-purple-700"
                                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                        }`}
                                >
                                    {notifications ? "On" : "Off"}
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg text-black">
                                <div className="flex items-center gap-3">
                                    <Bell size={20} />
                                    <div>
                                        <p className="font-semibold">Newsletter</p>
                                        <p className="text-sm text-gray-600">Subscribe to our weekly newsletter</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setNewsletter(!newsletter)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${newsletter
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                        }`}
                                >
                                    {newsletter ? "On" : "Off"}
                                </button>
                            </div>

                            <div className="border-t pt-6 text-black">
                                <h3 className="text-lg font-semibold mb-3">Account Info</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>Account ID: {user?.uid}</p>
                                    <p>Member since: {joinedDate}</p>
                                    <p>Member for: {memberDays} days</p>
                                    <p>Total feedback submitted: {feedbackStats.total}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Help Tab - Only for own profile */}
                    {activeTab === "help" && isOwnProfile && (
                        <div className="space-y-6">
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h3 className="font-semibold text-purple-900 mb-2">Help & Support</h3>
                                <p className="text-sm text-purple-800">Find answers and support resources.</p>
                            </div>

                            <div className="space-y-3">
                                <a href="/about" className="block border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
                                    <p className="font-semibold text-purple-600">About Us</p>
                                    <p className="text-sm text-gray-600 mt-1">Learn more about The Cyclopedia.</p>
                                </a>

                                <a href="/contact" className="block border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
                                    <p className="font-semibold text-purple-600">Contact Support</p>
                                    <p className="text-sm text-gray-600 mt-1">Get in touch with our support team.</p>
                                </a>

                                <a href="/newsletter" className="block border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
                                    <p className="font-semibold text-purple-600">Newsletter</p>
                                    <p className="text-sm text-gray-600 mt-1">Subscribe to our weekly updates.</p>
                                </a>

                                <a href="/feedback" className="block border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
                                    <p className="font-semibold text-purple-600">Submit Feedback</p>
                                    <p className="text-sm text-gray-600 mt-1">Help us improve by sharing your feedback.</p>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}