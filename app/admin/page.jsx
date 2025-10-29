"use client";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import {
  Check,
  X,
  Eye,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";
import { db1 } from "@/lib/firebaseConfig";

export default function LawyerApprovalAdmin() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // pending, approved, rejected, all
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchLawyers();
  }, [filter]);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      let q;

      if (filter === "all") {
        // If no 'createdAt' field exists, remove orderBy
        q = query(collection(db1, "lawyer_registrations"));
      } else {
        q = query(
          collection(db1, "lawyer_registrations"),
          where("status", "==", filter)
        );
      }

      const querySnapshot = await getDocs(q);
      const lawyersData = [];

      querySnapshot.forEach((doc) => {
        lawyersData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // Sort by createdAt in JavaScript if it exists
      lawyersData.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setLawyers(lawyersData);
    } catch (error) {
      console.error("❌ Detailed Error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      alert(
        `Error loading lawyers: ${error.message}\n\nCheck browser console for details.`
      );
    } finally {
      setLoading(false);
    }
  };

  const approveLawyer = async (lawyerId, lawyerName) => {
    if (!confirm(`Are you sure you want to APPROVE ${lawyerName}?`)) return;

    try {
      setActionLoading(true);
      const lawyerRef = doc(db1, "lawyer_registrations", lawyerId);
      await updateDoc(lawyerRef, {
        status: "approved",
        approvedAt: new Date().toISOString(),
      });
      alert(`✅ ${lawyerName} has been approved!`);
      fetchLawyers();
    } catch (error) {
      console.error("Error approving lawyer:", error);
      alert("Error approving lawyer. Check console.");
    } finally {
      setActionLoading(false);
    }
  };

  const rejectLawyer = async (lawyerId, lawyerName) => {
    const reason = prompt(`Why are you rejecting ${lawyerName}? (Optional)`);
    if (reason === null) return; // User cancelled

    try {
      setActionLoading(true);
      const lawyerRef = doc(db1, "lawyer_registrations", lawyerId);
      await updateDoc(lawyerRef, {
        status: "rejected",
        rejectedAt: new Date().toISOString(),
        rejectionReason: reason || "Not specified",
      });
      alert(`❌ ${lawyerName} has been rejected.`);
      fetchLawyers();
    } catch (error) {
      console.error("Error rejecting lawyer:", error);
      alert("Error rejecting lawyer. Check console.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };
    return badges[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const stats = {
    pending: lawyers.filter((l) => l.status === "pending").length,
    approved: lawyers.filter((l) => l.status === "approved").length,
    rejected: lawyers.filter((l) => l.status === "rejected").length,
    total: lawyers.length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 lg:mt-50 mt-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lawyer Approvals
          </h1>
          <p className="text-gray-600">
            Review and approve lawyer registration applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">Total Applications</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-gray-600 text-sm">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.approved}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <p className="text-gray-600 text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "approved"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "rejected"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Rejected ({stats.rejected})
              </button>
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={fetchLawyers}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Lawyers List */}
        {!loading && (
          <div className="space-y-4">
            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      {lawyer.profileImageURL ? (
                        <img
                          src={lawyer.profileImageURL}
                          alt={lawyer.fullName}
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-4 border-gray-100">
                          <span className="text-3xl font-bold text-blue-600">
                            {lawyer.fullName?.charAt(0) || "?"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Lawyer Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {lawyer.fullName}
                          </h3>
                          <p className="text-blue-600 font-semibold">
                            {lawyer.specialty}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(
                            lawyer.status
                          )}`}
                        >
                          {lawyer.status?.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                        <div className="space-y-1">
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {lawyer.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {lawyer.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {lawyer.city}, {lawyer.state}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            {lawyer.lawSchool}
                          </p>
                          <p className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {lawyer.experience} experience
                          </p>
                          <p className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Bar #{lawyer.barNumber}
                          </p>
                        </div>
                      </div>

                      {lawyer.bio && (
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                          {lawyer.bio}
                        </p>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {lawyer.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                approveLawyer(lawyer.id, lawyer.fullName)
                              }
                              disabled={actionLoading}
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                rejectLawyer(lawyer.id, lawyer.fullName)
                              }
                              disabled={actionLoading}
                              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() =>
                            setSelectedLawyer(
                              selectedLawyer?.id === lawyer.id ? null : lawyer
                            )
                          }
                          className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-semibold transition"
                        >
                          <Eye className="w-4 h-4" />
                          {selectedLawyer?.id === lawyer.id
                            ? "Hide"
                            : "View"}{" "}
                          Details
                        </button>
                      </div>

                      {/* Expanded Details */}
                      {selectedLawyer?.id === lawyer.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">
                                Full Bio:
                              </p>
                              <p className="text-gray-700">
                                {lawyer.bio || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">
                                Languages:
                              </p>
                              <p className="text-gray-700">
                                {lawyer.languages
                                  ?.filter((l) => l.trim())
                                  .join(", ") || "Not specified"}
                              </p>

                              <p className="font-semibold text-gray-900 mb-1 mt-2">
                                Achievements:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {lawyer.achievements
                                  ?.filter((a) => a.trim())
                                  .map((achievement, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                    >
                                      {achievement}
                                    </span>
                                  )) || (
                                  <span className="text-gray-500">
                                    None listed
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-gray-500">
                            <p>
                              Registered:{" "}
                              {new Date(lawyer.createdAt).toLocaleString()}
                            </p>
                            {lawyer.approvedAt && (
                              <p>
                                Approved:{" "}
                                {new Date(lawyer.approvedAt).toLocaleString()}
                              </p>
                            )}
                            {lawyer.rejectedAt && (
                              <p>
                                Rejected:{" "}
                                {new Date(lawyer.rejectedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredLawyers.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  No lawyers found matching your criteria
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
