// Save this as: app/live-scores/page.jsx or pages/live-scores.jsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trophy, TrendingUp, ExternalLink, Clock, Zap, DollarSign } from 'lucide-react';

export default function LiveScoresPage() {
    const [activeTab, setActiveTab] = useState('football');

    // ALL BETTING AFFILIATES - Sign up links at bottom
    const bettingPlatforms = [
        {
            name: 'BetWinner',
            url: 'https://www.betwinner.com?aff=83cdf48899a9ca9715e686a4e71f5b60854e5cc65aabc58f5f',
            icon: '🎰',
            description: 'Live betting with real-time scores & statistics',
            color: 'from-green-500 to-emerald-600',
            bonus: 'Get $200 Bonus',
            features: ['Live Streaming', 'Cash Out', '24/7 Support']
        },
        {
            name: '1xBet',
            url: 'https://reffpa.com/L?tag=d_4882646m_97c_3780558&site=4882646&ad=97',
            icon: '⚽',
            description: 'Comprehensive live scores & in-play betting',
            color: 'from-blue-500 to-cyan-600',
            bonus: 'Live Betting Now',
            features: ['Best Odds', 'Fast Payouts', 'Mobile App']
        },
    ];

    const sportsCategories = [
        { id: 'football', name: 'Football', icon: '⚽', color: 'bg-green-600' },
        { id: 'basketball', name: 'Basketball', icon: '🏀', color: 'bg-orange-600' },
        { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'bg-yellow-600' },
        { id: 'cricket', name: 'Cricket', icon: '🏏', color: 'bg-blue-600' },
        { id: 'boxing', name: 'Boxing', icon: '🥊', color: 'bg-red-600' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Header */}
            <header className="relative bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white py-20 px-4 mt-20 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-10 right-10 text-9xl opacity-10 animate-bounce">⚽</div>
                <div className="absolute bottom-10 left-10 text-7xl opacity-10 animate-pulse">🏆</div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-pulse">
                        <span className="text-red-300 text-3xl">●</span>
                        <span className="font-bold text-xl">LIVE NOW</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 uppercase drop-shadow-2xl">
                        Live Sports Scores & Betting
                    </h1>
                    <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                        Watch Live • Bet Live • Win Big
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            ⚡ Instant Updates
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            💰 Best Odds
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            🎁 Huge Bonuses
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Sports Category Tabs */}
                <div className="mb-12 overflow-x-auto">
                    <div className="flex gap-3 pb-4">
                        {sportsCategories.map((sport) => (
                            <button
                                key={sport.id}
                                onClick={() => setActiveTab(sport.id)}
                                className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === sport.id
                                        ? `${sport.color} text-white shadow-2xl scale-110`
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg hover:scale-105'
                                    }`}
                            >
                                <span className="text-3xl">{sport.icon}</span>
                                <span className="text-lg">{sport.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* MEGA Promotion Banner */}
                <div className="mb-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-10 text-center shadow-2xl">
                        <div className="text-6xl mb-4 animate-bounce">🎉</div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase">
                            Exclusive Bonus Alert!
                        </h2>
                        <p className="text-2xl text-white/90 mb-6 font-semibold">
                            Get Up to ₦200,000 Welcome Bonus + Free Bets
                        </p>
                        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                            Choose your favorite platform below and claim your massive welcome bonus.
                            Limited time offer for new users!
                        </p>
                        <div className="flex items-center justify-center gap-3 text-white text-sm">
                            <Zap className="animate-pulse" />
                            <span className="font-bold">Don't miss out - Offer expires soon!</span>
                            <Zap className="animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* TOP TIER BETTING PLATFORMS */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Trophy className="text-yellow-500" size={40} />
                        <div>
                            <h2 className="text-4xl font-extrabold dark:text-white">Live Betting Platforms</h2>
                            <p className="text-gray-600 dark:text-gray-400">Watch live scores & place your bets</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {bettingPlatforms.map((platform, index) => (
                            <a
                                key={index}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className={`group relative bg-gradient-to-br ${platform.color} rounded-3xl p-8 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-105`}
                            >
                                {/* Animated background effects */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-7xl drop-shadow-lg">{platform.icon}</span>
                                        <span className="bg-yellow-400 text-black text-sm font-extrabold px-4 py-2 rounded-full shadow-lg animate-pulse">
                                            {platform.bonus}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-3xl font-extrabold text-white mb-3 uppercase">
                                        {platform.name}
                                    </h3>
                                    <p className="text-white/90 text-lg mb-6 font-medium">
                                        {platform.description}
                                    </p>

                                    {/* Features */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {platform.features.map((feature, i) => (
                                            <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                                                <p className="text-white text-xs font-bold">{feature}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-4 group-hover:bg-white/30 transition-colors">
                                        <span className="text-white font-extrabold text-lg">
                                            Click to Bet Now
                                        </span>
                                        <ExternalLink className="text-white group-hover:translate-x-2 transition-transform" size={28} />
                                    </div>
                                </div>

                                {/* Corner badge */}
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                    HOT 🔥
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mb-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-10">
                    <h3 className="text-3xl font-bold text-center mb-8 dark:text-white">
                        Why Bet With Our Partners?
                    </h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-5xl mb-3">⚡</div>
                            <h4 className="font-bold mb-2 dark:text-white">Instant Deposits</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Fund your account in seconds</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-3">🏆</div>
                            <h4 className="font-bold mb-2 dark:text-white">Best Odds</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Highest returns guaranteed</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-3">💰</div>
                            <h4 className="font-bold mb-2 dark:text-white">Fast Payouts</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Withdraw winnings instantly</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-3">🛡️</div>
                            <h4 className="font-bold mb-2 dark:text-white">100% Safe</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Licensed & secure platforms</p>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mb-12 text-center bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <DollarSign className="mx-auto mb-4 text-yellow-400" size={64} />
                        <h3 className="text-4xl font-extrabold text-white mb-4">
                            Ready to Win Big? Start Now! 💸
                        </h3>
                        <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
                            Join millions of winners. Pick any platform above and start betting on live sports today!
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href={bettingPlatforms[0].url}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="bg-white text-green-600 font-extrabold px-10 py-5 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-110 text-lg shadow-2xl"
                            >
                                🎰 Claim BetWinner Bonus
                            </a>
                            <a
                                href={bettingPlatforms[1].url}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="bg-yellow-400 text-black font-extrabold px-10 py-5 rounded-xl hover:bg-yellow-300 transition-all transform hover:scale-110 text-lg shadow-2xl"
                            >
                                ⚽ Try 1xBet Now
                            </a>
                        </div>
                        <p className="text-white/60 text-sm mt-6">18+ | T&Cs apply | Please gamble responsibly</p>
                    </div>
                </div>

                {/* Back to Sports */}
                <div className="text-center">
                    <Link
                        href="/sports"
                        className="inline-flex items-center gap-2 bg-gray-800 dark:bg-white text-white dark:text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-100 transition-all transform hover:scale-105"
                    >
                        ← Back to Sports News
                    </Link>
                </div>
            </div>
        </div>
    );
}