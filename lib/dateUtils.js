/**
 * Format Firestore dates to readable strings
 * Handles Firestore Timestamp objects, ISO strings, and Date objects
 * 
 * @param {any} dateValue - The date value to format (Timestamp, string, or Date)
 * @param {string} format - Format type: "date", "time", or "datetime"
 * @returns {string} Formatted date string
 */
export const formatFirestoreDate = (dateValue, format = "date") => {
  if (!dateValue) return "Date not available";
  
  try {
    let date;
    
    // Handle Firestore Timestamp object with .toDate() method
    if (dateValue && typeof dateValue.toDate === 'function') {
      date = dateValue.toDate();
    } 
    // Handle plain object with seconds property {seconds: ..., nanoseconds: ...}
    else if (dateValue && typeof dateValue === 'object' && dateValue.seconds) {
      date = new Date(dateValue.seconds * 1000);
    }
    // Handle ISO string
    else if (typeof dateValue === 'string') {
      date = new Date(dateValue);
    }
    // Handle Date object
    else if (dateValue instanceof Date) {
      date = dateValue;
    }
    // Handle numeric timestamp (milliseconds)
    else if (typeof dateValue === 'number') {
      date = new Date(dateValue);
    }
    
    // Validate the date
    if (!date || isNaN(date.getTime())) {
      console.warn("Invalid date value:", dateValue);
      return "Date not available";
    }
    
    // Format based on the requested format
    if (format === "time") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } else if (format === "datetime") {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) + " at " + date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      // Default to "date" format
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  } catch (err) {
    console.error("Date formatting error:", err, dateValue);
    return "Date not available";
  }
};

/**
 * Calculate days since a date
 * Useful for showing how long someone has been a member
 * 
 * @param {any} dateValue - The date value (Timestamp, string, or Date)
 * @returns {number} Number of days since the date
 */
export const getDaysSince = (dateValue) => {
  if (!dateValue) return 0;
  
  try {
    let date;
    
    if (dateValue?.toDate && typeof dateValue.toDate === 'function') {
      date = dateValue.toDate();
    } else if (dateValue?.seconds) {
      date = new Date(dateValue.seconds * 1000);
    } else if (typeof dateValue === 'string') {
      date = new Date(dateValue);
    } else if (dateValue instanceof Date) {
      date = dateValue;
    }
    
    if (!date || isNaN(date.getTime())) {
      return 0;
    }
    
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  } catch (err) {
    console.error("Error calculating days since:", err);
    return 0;
  }
};

/**
 * 
 * @param {array} items - Array of objects with createdAt field
 * @param {string} order - "asc" or "desc" (default: "desc")
 * @returns {array} Sorted array
 */
export const sortByDate = (items, order = "desc") => {
  return [...items].sort((a, b) => {
    let dateA, dateB;
    
    if (a.createdAt?.toDate) {
      dateA = a.createdAt.toDate();
    } else if (a.createdAt?.seconds) {
      dateA = new Date(a.createdAt.seconds * 1000);
    } else {
      dateA = new Date(a.createdAt);
    }
    
    if (b.createdAt?.toDate) {
      dateB = b.createdAt.toDate();
    } else if (b.createdAt?.seconds) {
      dateB = new Date(b.createdAt.seconds * 1000);
    } else {
      dateB = new Date(b.createdAt);
    }
    
    if (order === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
};