"use client"

import { Rss } from 'lucide-react';
import { useState } from 'react';

export default function RssSubscribeButton({ variant = "default" }) {
    const [showPopup, setShowPopup] = useState(false);
    const rssUrl = "https://www.thecyclopedia.com.ng/feed.xml";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(rssUrl);
        alert("RSS feed URL copied to clipboard!");
    };

    // Default button (icon + text)
    if (variant === "default") {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowPopup(!showPopup)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                    <Rss size={20} />
                    Subscribe via RSS
                </button>

                {showPopup && (
                    <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-50">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-gray-900">Subscribe to our RSS Feed</h3>
                            <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600">
                                ×
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                            Get our latest articles delivered to your favorite RSS reader.
                        </p>

                        <div className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-700 mb-3 break-all">
                            {rssUrl}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={copyToClipboard}
                                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium transition-colors"
                            >
                                Copy URL
                            </button>
                            <a
                                href={rssUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm font-medium text-center transition-colors"
                            >
                                Open Feed
                            </a>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-2">Popular RSS readers:</p>
                            <div className="flex flex-wrap gap-2">
                                <a href="https://feedly.com/i/subscription/feed/https://www.thecyclopedia.com.ng/feed.xml"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                                    Feedly
                                </a>
                                <a href="https://www.inoreader.com/?add_feed=https://www.thecyclopedia.com.ng/feed.xml"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                                    Inoreader
                                </a>
                                <a href="https://theoldreader.com/feeds/subscribe?url=https://www.thecyclopedia.com.ng/feed.xml"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
                                    The Old Reader
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Icon only button (for header/navbar)
    if (variant === "icon") {
        return (
            <a
                href={rssUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Subscribe via RSS"
            >
                <Rss size={20} className="text-orange-500" />
            </a>
        );
    }

    // Footer link style
    if (variant === "footer") {
        return (
            <a
                href={rssUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
                <Rss size={18} />
                RSS Feed
            </a>
        );
    }

    // Inline text link
    if (variant === "link") {
        return (
            <a
                href={rssUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium"
            >
                <Rss size={16} />
                Subscribe
            </a>
        );
    }
}