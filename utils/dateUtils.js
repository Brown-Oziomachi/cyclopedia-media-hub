// utils/dateUtils.js

export const formatFirestoreDate = (dateValue, format = "date") => {
    if (!dateValue) return "N/A";

    let dateObj;

    if (dateValue?.seconds) {
        dateObj = new Date(dateValue.seconds * 1000);
    } else if (typeof dateValue === "string" || dateValue instanceof Date) {
        dateObj = new Date(dateValue);
    } else {
        return "Invalid date";
    }

    const options =
        format === "date"
            ? { year: "numeric", month: "short", day: "numeric" }
            : { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };

    return dateObj.toLocaleDateString("en-US", options);
};

export const getDaysSince = (dateValue) => {
    if (!dateValue) return "N/A";

    let dateObj;
    if (dateValue?.seconds) {
        dateObj = new Date(dateValue.seconds * 1000);
    } else {
        dateObj = new Date(dateValue);
    }

    const diffTime = Math.abs(Date.now() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

export const sortByDate = (items, order = "desc", key = "createdAt") => {
    if (!Array.isArray(items)) return [];

    return [...items].sort((a, b) => {
        const dateA = a[key]?.seconds ? new Date(a[key].seconds * 1000) : new Date(a[key]);
        const dateB = b[key]?.seconds ? new Date(b[key].seconds * 1000) : new Date(b[key]);

        return order === "asc" ? dateA - dateB : dateB - dateA;
    });
};
