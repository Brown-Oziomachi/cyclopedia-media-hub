/**
 * Converts Firestore date values to formatted strings
 * Handles multiple date formats from Firestore
 * @param {*} dateValue - The date value from Firestore (can be Timestamp, seconds object, Date, or string)
 * @param {string} format - "date" for date only, "datetime" for date and time
 * @returns {string} Formatted date string
 */
export const formatFirestoreDate = (dateValue, format = "date") => {
    if (!dateValue) return "N/A";

    let dateObj;

    // Handle Firestore Timestamp object with .seconds property
    if (dateValue?.seconds) {
        dateObj = new Date(dateValue.seconds * 1000);
    }
    // Handle Date objects or ISO strings
    else if (typeof dateValue === "string" || dateValue instanceof Date) {
        dateObj = new Date(dateValue);
    }
    // Handle .toDate() method (Firestore Timestamp has this)
    else if (typeof dateValue.toDate === "function") {
        dateObj = dateValue.toDate();
    }
    // Invalid date format
    else {
        return "Invalid date";
    }

    // Validate the date object
    if (isNaN(dateObj.getTime())) {
        return "Invalid date";
    }

    // Format options
    const options =
        format === "date"
            ? { year: "numeric", month: "short", day: "numeric" }
            : {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            };

    return dateObj.toLocaleDateString("en-US", options);
};

/**
 * Calculates the number of days since a given date
 * @param {*} dateValue - The date value from Firestore
 * @returns {number} Number of days since the date
 */
export const getDaysSince = (dateValue) => {
    if (!dateValue) return 0;

    let dateObj;

    // Handle Firestore Timestamp object with .seconds property
    if (dateValue?.seconds) {
        dateObj = new Date(dateValue.seconds * 1000);
    }
    // Handle .toDate() method
    else if (typeof dateValue.toDate === "function") {
        dateObj = dateValue.toDate();
    }
    // Handle Date objects or ISO strings
    else if (typeof dateValue === "string" || dateValue instanceof Date) {
        dateObj = new Date(dateValue);
    }
    // Invalid format
    else {
        return 0;
    }

    // Validate the date
    if (isNaN(dateObj.getTime())) {
        return 0;
    }

    const diffTime = Math.abs(Date.now() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

/**
 * Sorts an array of items by date
 * @param {Array} items - Array of items to sort
 * @param {string} order - "asc" for ascending, "desc" for descending
 * @param {string} key - The property name containing the date value
 * @returns {Array} Sorted array
 */
export const sortByDate = (items, order = "desc", key = "createdAt") => {
    if (!Array.isArray(items)) return [];

    return [...items].sort((a, b) => {
        let dateA, dateB;

        // Convert date A
        if (a[key]?.seconds) {
            dateA = new Date(a[key].seconds * 1000);
        } else if (typeof a[key]?.toDate === "function") {
            dateA = a[key].toDate();
        } else {
            dateA = new Date(a[key]);
        }

        // Convert date B
        if (b[key]?.seconds) {
            dateB = new Date(b[key].seconds * 1000);
        } else if (typeof b[key]?.toDate === "function") {
            dateB = b[key].toDate();
        } else {
            dateB = new Date(b[key]);
        }

        // Handle invalid dates
        if (isNaN(dateA.getTime())) dateA = new Date(0);
        if (isNaN(dateB.getTime())) dateB = new Date(0);

        return order === "asc" ? dateA - dateB : dateB - dateA;
    });
};

/**
 * Formats a date as a relative time string (e.g., "2 hours ago")
 * @param {*} dateValue - The date value from Firestore
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (dateValue) => {
    if (!dateValue) return "N/A";

    let dateObj;

    if (dateValue?.seconds) {
        dateObj = new Date(dateValue.seconds * 1000);
    } else if (typeof dateValue?.toDate === "function") {
        dateObj = dateValue.toDate();
    } else if (typeof dateValue === "string" || dateValue instanceof Date) {
        dateObj = new Date(dateValue);
    } else {
        return "Invalid date";
    }

    if (isNaN(dateObj.getTime())) {
        return "Invalid date";
    }

    const now = new Date();
    const seconds = Math.floor((now - dateObj) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
};