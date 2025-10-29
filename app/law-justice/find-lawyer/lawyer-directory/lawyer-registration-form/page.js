"use client";

import { useState } from "react";
import { Scale, Upload, Award, Briefcase, GraduationCap, MapPin, Phone, Mail, Globe, Plus, X, LoaderCircle, CheckCircle2, User, FileText, Languages, Star } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db1 } from "@/lib/firebaseConfig";

export default function LawyerRegistrationPage() {
    const [processing, setProcessing] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);

    const [formValues, setFormValues] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        city: "",
        state: "",
        specialty: "",
        experience: "",
        barNumber: "",
        lawSchool: "",
        degree: "",
        graduationYear: "",
        firmName: "",
        firmWebsite: "",
        languages: ["English"],
        achievements: [""],
        bio: "",
        practiceAreas: [],
        agreedToTerms: false,
    });

    const [errors, setErrors] = useState({});

    const practiceAreaOptions = [
        'Criminal Defense',
        'Family Law',
        'Personal Injury',
        'Business Law',
        'Real Estate Law',
        'Immigration Law',
        'Employment Law',
        'Tax Law',
        'Estate Planning',
        'Intellectual Property',
        'Civil Litigation',
        'Corporate Law'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size should be less than 5MB");
                return;
            }
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert("Please upload an image file");
                return;
            }
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addLanguage = () => {
        setFormValues({
            ...formValues,
            languages: [...formValues.languages, ""]
        });
    };

    const removeLanguage = (index) => {
        const newLanguages = formValues.languages.filter((_, i) => i !== index);
        setFormValues({ ...formValues, languages: newLanguages });
    };

    const updateLanguage = (index, value) => {
        const newLanguages = [...formValues.languages];
        newLanguages[index] = value;
        setFormValues({ ...formValues, languages: newLanguages });
    };

    const addAchievement = () => {
        setFormValues({
            ...formValues,
            achievements: [...formValues.achievements, ""]
        });
    };

    const removeAchievement = (index) => {
        const newAchievements = formValues.achievements.filter((_, i) => i !== index);
        setFormValues({ ...formValues, achievements: newAchievements });
    };

    const updateAchievement = (index, value) => {
        const newAchievements = [...formValues.achievements];
        newAchievements[index] = value;
        setFormValues({ ...formValues, achievements: newAchievements });
    };

    const togglePracticeArea = (area) => {
        const current = formValues.practiceAreas;
        if (current.includes(area)) {
            setFormValues({
                ...formValues,
                practiceAreas: current.filter(a => a !== area)
            });
        } else {
            setFormValues({
                ...formValues,
                practiceAreas: [...current, area]
            });
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formValues.fullName.trim()) newErrors.fullName = "Full name is required";
            if (!formValues.email.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = "Invalid email format";
            if (!formValues.phone.trim()) newErrors.phone = "Phone number is required";
            if (!formValues.location.trim()) newErrors.location = "Location is required";
            if (!formValues.city.trim()) newErrors.city = "City is required";
            if (!formValues.state.trim()) newErrors.state = "State is required";
        }

        if (step === 2) {
            if (!formValues.specialty.trim()) newErrors.specialty = "Specialty is required";
            if (!formValues.experience.trim()) newErrors.experience = "Experience is required";
            if (!formValues.barNumber.trim()) newErrors.barNumber = "Bar number is required";
            if (!formValues.lawSchool.trim()) newErrors.lawSchool = "Law school is required";
            if (!formValues.degree.trim()) newErrors.degree = "Degree is required";
            if (!formValues.graduationYear.trim()) newErrors.graduationYear = "Graduation year is required";
        }

        if (step === 3) {
            if (!formValues.bio.trim()) newErrors.bio = "Bio is required";
            if (formValues.bio.length < 100) newErrors.bio = "Bio must be at least 100 characters";
            if (formValues.practiceAreas.length === 0) newErrors.practiceAreas = "Select at least one practice area";
            if (!formValues.agreedToTerms) newErrors.agreedToTerms = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const uploadProfileImage = async (file) => {
        if (!file) return null;

        try {
            // Create a unique filename using timestamp
            const timestamp = Date.now();
            const filename = `lawyer-profiles/${timestamp}_${file.name}`;
            const storageRef = ref(storage, filename);

            // Upload the file
            await uploadBytes(storageRef, file);

            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error("Failed to upload profile image");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) return;

        try {
            setProcessing(true);

            // Upload profile image if exists
            let profileImageURL = null;
            if (profileImage) {
                profileImageURL = await uploadProfileImage(profileImage);
            }

            // Filter out empty values from languages and achievements
            const filteredLanguages = formValues.languages.filter(lang => lang.trim() !== "");
            const filteredAchievements = formValues.achievements.filter(ach => ach.trim() !== "");

            // Prepare data for Firestore
            const registrationData = {
                // Personal Information
                fullName: formValues.fullName,
                email: formValues.email,
                phone: formValues.phone,
                location: formValues.location,
                city: formValues.city,
                state: formValues.state,

                // Professional Information
                specialty: formValues.specialty,
                experience: formValues.experience,
                barNumber: formValues.barNumber,
                lawSchool: formValues.lawSchool,
                degree: formValues.degree,
                graduationYear: formValues.graduationYear,

                // Practice Details
                firmName: formValues.firmName || null,
                firmWebsite: formValues.firmWebsite || null,
                languages: filteredLanguages,
                achievements: filteredAchievements,

                // Additional Information
                bio: formValues.bio,
                practiceAreas: formValues.practiceAreas,

                // Profile Image
                profileImageURL: profileImageURL,

                // Metadata
                agreedToTerms: formValues.agreedToTerms,
                status: "pending", // pending, approved, rejected
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            // Add document to Firestore
            const docRef = await addDoc(collection(db1, "lawyer_registrations"), registrationData);

            console.log("Document written with ID: ", docRef.id);

            // Show success modal
            setModalVisibility(true);

            // Reset form
            setFormValues({
                fullName: "",
                email: "",
                phone: "",
                location: "",
                city: "",
                state: "",
                specialty: "",
                experience: "",
                barNumber: "",
                lawSchool: "",
                degree: "",
                graduationYear: "",
                firmName: "",
                firmWebsite: "",
                languages: ["English"],
                achievements: [""],
                bio: "",
                practiceAreas: [],
                agreedToTerms: false,
            });
            setProfileImage(null);
            setProfileImagePreview(null);
            setCurrentStep(1);

        } catch (err) {
            console.error("Submission Error:", err);
            alert(`Error: ${err.message}`);
        } finally {
            setProcessing(false);
        }
    };

    const steps = [
        { number: 1, title: "Personal Info", icon: User },
        { number: 2, title: "Professional", icon: Briefcase },
        { number: 3, title: "Final Details", icon: FileText }
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-[#0c0b2bfa] text-white py-30 px-4">
                <div className="container mx-auto text-center max-w-4xl lg:mt-40 ">
                    <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
                        <Scale size={18} className="text-blue-600" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                            Join Our Network
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                        Register Your Legal Practice
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mx-auto leading-relaxed">
                        Connect with clients seeking expert legal representation. <br />
                        Build your presence and grow your practice with our trusted platform.
                    </p>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between relative">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex-1 flex flex-col items-center relative">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step.number
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {currentStep > step.number ? (
                                            <CheckCircle2 size={20} />
                                        ) : (
                                            <step.icon size={20} />
                                        )}
                                    </div>
                                    <span className={`text-sm font-semibold mt-2 ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                                        }`}>
                                        {step.title}
                                    </span>
                                    {index < steps.length - 1 && (
                                        <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                                            }`} style={{ transform: 'translateY(-50%)' }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Form */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                            {/* Step 1: Personal Information */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
                                        <p className="text-gray-600">Let's start with your basic details</p>
                                    </div>

                                    {/* Profile Image Upload */}
                                    <div className="flex flex-col items-center mb-8">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                                                {profileImagePreview ? (
                                                    <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={48} className="text-blue-600" />
                                                )}
                                            </div>
                                            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-lg">
                                                <Upload size={18} />
                                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                            </label>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Upload your professional photo (Max 5MB)</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="fullName"
                                                type="text"
                                                value={formValues.fullName}
                                                onChange={handleChange}
                                                placeholder="Barrister YourName..."
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            />
                                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    name="email"
                                                    type="email"
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                    placeholder="thecyclopedialawyer@lawfirm.com"
                                                    className="w-full pl-10 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    name="phone"
                                                    type="tel"
                                                    value={formValues.phone}
                                                    onChange={handleChange}
                                                    placeholder="+234 800 000 0000"
                                                    className="w-full pl-10 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Address <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    name="location"
                                                    type="text"
                                                    value={formValues.location}
                                                    onChange={handleChange}
                                                    placeholder="123 Legal Street"
                                                    className="w-full pl-10 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                                />
                                            </div>
                                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                City <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="city"
                                                type="text"
                                                value={formValues.city}
                                                onChange={handleChange}
                                                placeholder="Lagos"
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            />
                                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                State <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="state"
                                                type="text"
                                                value={formValues.state}
                                                onChange={handleChange}
                                                placeholder="Lagos State"
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            />
                                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Professional Information */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Details</h2>
                                        <p className="text-gray-600">Tell us about your legal expertise</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Primary Specialty <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="specialty"
                                                type="text"
                                                value={formValues.specialty}
                                                onChange={handleChange}
                                                placeholder="e.g., Criminal Defense & Litigation"
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            />
                                            {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Years of Experience <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="experience"
                                                value={formValues.experience}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            >
                                                <option value="">Select experience</option>
                                                <option value="1-3">1-3 years</option>
                                                <option value="4-6">4-6 years</option>
                                                <option value="7-10">7-10 years</option>
                                                <option value="11-15">11-15 years</option>
                                                <option value="16-20">16-20 years</option>
                                                <option value="20+">20+ years</option>
                                            </select>
                                            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Bar Enrollment Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="barNumber"
                                                type="text"
                                                value={formValues.barNumber}
                                                onChange={handleChange}
                                                placeholder="SCN/123456"
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            />
                                            {errors.barNumber && <p className="text-red-500 text-sm mt-1">{errors.barNumber}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Law School <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    name="lawSchool"
                                                    type="text"
                                                    value={formValues.lawSchool}
                                                    onChange={handleChange}
                                                    placeholder="University of Lagos"
                                                    className="w-full pl-10 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                                />
                                            </div>
                                            {errors.lawSchool && <p className="text-red-500 text-sm mt-1">{errors.lawSchool}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Degree <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="degree"
                                                type="text"
                                                value={formValues.degree}
                                                onChange={handleChange}
                                                placeholder="LL.B, LL.M, BL"
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            />
                                            {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Graduation Year <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="graduationYear"
                                                type="number"
                                                value={formValues.graduationYear}
                                                onChange={handleChange}
                                                placeholder="2010"
                                                min="1950"
                                                max={new Date().getFullYear()}
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            />
                                            {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Law Firm Name (Optional)
                                            </label>
                                            <input
                                                name="firmName"
                                                type="text"
                                                value={formValues.firmName}
                                                onChange={handleChange}
                                                placeholder="Doe & Associates"
                                                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Website (Optional)
                                            </label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    name="firmWebsite"
                                                    type="url"
                                                    value={formValues.firmWebsite}
                                                    onChange={handleChange}
                                                    placeholder="www.lawfirm.com"
                                                    className="w-full pl-10 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Languages Spoken
                                        </label>
                                        <div className="space-y-3">
                                            {formValues.languages.map((lang, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            type="text"
                                                            value={lang}
                                                            onChange={(e) => updateLanguage(index, e.target.value)}
                                                            placeholder="e.g., English, Yoruba"
                                                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                                        />
                                                    </div>
                                                    {formValues.languages.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLanguage(index)}
                                                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addLanguage}
                                            className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                                        >
                                            <Plus size={18} />
                                            Add Language
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Certifications & Achievements
                                        </label>
                                        <div className="space-y-3">
                                            {formValues.achievements.map((achievement, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            type="text"
                                                            value={achievement}
                                                            onChange={(e) => updateAchievement(index, e.target.value)}
                                                            placeholder="e.g., SAN, NBA Member"
                                                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-900"
                                                        />
                                                    </div>
                                                    {formValues.achievements.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAchievement(index)}
                                                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addAchievement}
                                            className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                                        >
                                            <Plus size={18} />
                                            Add Achievement
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Final Details */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Final Details</h2>
                                        <p className="text-gray-600">Complete your professional profile</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Professional Biography <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="bio"
                                            rows={6}
                                            value={formValues.bio}
                                            onChange={handleChange}
                                            placeholder="Describe your experience, approach to law, notable cases, and what makes you unique as a legal professional. Minimum 100 characters."
                                            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none resize-none text-gray-900"
                                        />
                                        <div className="flex justify-between items-center mt-1">
                                            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                                            <p className="text-sm text-gray-500 ml-auto">
                                                {formValues.bio.length} characters
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Practice Areas <span className="text-red-500">*</span>
                                        </label>
                                        <p className="text-sm text-gray-600 mb-4">Select all areas where you practice</p>
                                        <div className="grid md:grid-cols-3 gap-3">
                                            {practiceAreaOptions.map((area) => (
                                                <button
                                                    key={area}
                                                    type="button"
                                                    onClick={() => togglePracticeArea(area)}
                                                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${formValues.practiceAreas.includes(area)
                                                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                                                        }`}
                                                >
                                                    {formValues.practiceAreas.includes(area) && (
                                                        <CheckCircle2 size={16} className="inline mr-2" />
                                                    )}
                                                    {area}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.practiceAreas && <p className="text-red-500 text-sm mt-2">{errors.practiceAreas}</p>}
                                    </div>

                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                name="agreedToTerms"
                                                checked={formValues.agreedToTerms}
                                                onChange={handleChange}
                                                className="mt-1 w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 rounded"
                                            />
                                            <div className="flex-1">
                                                <label className="text-sm text-gray-700 leading-relaxed">
                                                    I confirm that all information provided is accurate and truthful. I agree to the{' '}
                                                    <a href="/terms-of-services" className="text-blue-600 hover:underline font-semibold">
                                                        Terms of Service
                                                    </a>
                                                    {' '}and{' '}
                                                    <a href="/privacy-policy" className="text-blue-600 hover:underline font-semibold">
                                                        Privacy Policy
                                                    </a>
                                                    . I understand that providing false information may result in removal from the platform.
                                                </label>
                                            </div>
                                        </div>
                                        {errors.agreedToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreedToTerms}</p>}
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Star className="text-blue-600" size={20} />
                                            Registration Summary
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Full Name</p>
                                                <p className="font-semibold text-gray-900">{formValues.fullName || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Email</p>
                                                <p className="font-semibold text-gray-900">{formValues.email || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Location</p>
                                                <p className="font-semibold text-gray-900">{formValues.city && formValues.state ? `${formValues.city}, ${formValues.state}` : 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Specialty</p>
                                                <p className="font-semibold text-gray-900">{formValues.specialty || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Experience</p>
                                                <p className="font-semibold text-gray-900">{formValues.experience ? `${formValues.experience} years` : 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Practice Areas</p>
                                                <p className="font-semibold text-gray-900">{formValues.practiceAreas.length} selected</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Previous
                                    </button>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg"
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="animate-spin" size={20} />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={20} />
                                                <span>Complete Registration</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 lg:py-24 bg-[#0c0b2bfa]">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Why Join Our Platform?
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Benefits of registering your practice with us
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                            <div className="inline-flex p-4 rounded-full bg-blue-600 text-white mb-4">
                                <User size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Client Connections</h3>
                            <p className="text-gray-600">
                                Connect with clients actively seeking legal representation in your area of expertise.
                            </p>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                            <div className="inline-flex p-4 rounded-full bg-indigo-600 text-white mb-4">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Build Credibility</h3>
                            <p className="text-gray-600">
                                Showcase your credentials, achievements, and client reviews to build trust.
                            </p>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                            <div className="inline-flex p-4 rounded-full bg-purple-600 text-white mb-4">
                                <Briefcase size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Grow Your Practice</h3>
                            <p className="text-gray-600">
                                Expand your client base and increase your visibility in the legal community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            {modalVisibility && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-2xl p-10 text-center shadow-2xl max-w-md w-full">
                        <div className="inline-flex p-4 rounded-full bg-green-100 mb-6">
                            <CheckCircle2 className="text-green-600" size={48} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Registration Successful!
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Thank you for registering with us! We'll review your application and get back to you within 2-3 business days.
                        </p>
                        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                            <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>✓ Application review (1-2 days)</li>
                                <li>✓ Profile verification</li>
                                <li>✓ Approval notification via email</li>
                                <li>✓ Start receiving client inquiries</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setModalVisibility(false)}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}