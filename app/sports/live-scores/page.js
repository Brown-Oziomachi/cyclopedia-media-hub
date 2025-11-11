"use client";
import React, { useState, useEffect } from 'react';
import { Trophy, Clock, ExternalLink, ChevronRight, RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react';

export default function LiveFootballScores() {
    const [activeLeague, setActiveLeague] = useState('all');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'connected', 'error'

    const API_KEY = '8ae9d02d3emshe58cbc50b11747fp19b52bjsn5105dc094267';
    const API_HOST = '    rapidapi.com';
    
    // Try different possible endpoints for this API
    const POSSIBLE_ENDPOINTS = [
        '/football-live-now',
        '/football-live',
        '/live-scores',
        '/livescore',
        '/matches/live',
        '/fixtures/live'
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetchLiveMatches();
        const interval = setInterval(fetchLiveMatches, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchLiveMatches = async () => {
        setLoading(true);
        setError(null);

        // Try each endpoint until one works
        for (const endpoint of POSSIBLE_ENDPOINTS) {
            try {
                console.log(`Trying endpoint: ${endpoint}`);
                const response = await fetch("/api/livescore", {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': API_HOST
                    }
                });

                console.log(`Response status for ${endpoint}:`, response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('API Response:', data);

                    // Try to parse the response
                    let parsedMatches = parseApiResponse(data);

                    if (parsedMatches && parsedMatches.length > 0) {
                        setMatches(parsedMatches);
                        setApiStatus('connected');
                        setLoading(false);
                        console.log(`✓ Successfully fetched ${parsedMatches.length} matches from ${endpoint}`);
                        return; // Success! Exit the function
                    } else {
                        console.log(`${endpoint} returned empty data, trying next endpoint...`);
                    }
                }
            } catch (err) {
                console.error(`Error with ${endpoint}:`, err);
            }
        }

        // If we get here, none of the endpoints worked
        setApiStatus('error');
        setError('Could not connect to the API. Please check: 1) Your API key is active on RapidAPI, 2) You have available requests, 3) The API is currently available');
        setMatches([]);
        setLoading(false);
    };

    const parseApiResponse = (data) => {
        // Try different possible response structures
        let matchesArray = null;

        if (data.data?.match) matchesArray = data.data.match;
        else if (data.data?.matches) matchesArray = data.data.matches;
        else if (data.matches) matchesArray = data.matches;
        else if (data.response) matchesArray = data.response;
        else if (Array.isArray(data)) matchesArray = data;

        if (!matchesArray || matchesArray.length === 0) return null;

        return matchesArray.slice(0, 15).map((match, index) => {
            // Flexible parsing for different data structures
            const homeTeam = match.home_team || match.homeTeam || match.teams?.home?.name || 'Home Team';
            const awayTeam = match.away_team || match.awayTeam || match.teams?.away?.name || 'Away Team';

            let homeScore = 0;
            let awayScore = 0;

            // Try to parse score from different formats
            if (match.score) {
                if (typeof match.score === 'string') {
                    const scoreMatch = match.score.match(/(\d+)\s*[-:]\s*(\d+)/);
                    if (scoreMatch) {
                        homeScore = parseInt(scoreMatch[1]);
                        awayScore = parseInt(scoreMatch[2]);
                    }
                } else if (match.score.home !== undefined) {
                    homeScore = match.score.home;
                    awayScore = match.score.away;
                }
            } else if (match.goals) {
                homeScore = match.goals.home || 0;
                awayScore = match.goals.away || 0;
            }

            const league = match.league || match.competition || match.league_name || 'Football League';
            const status = match.status || match.match_status || 'LIVE';
            const time = match.time || match.minute || match.elapsed || 'LIVE';

            let leagueId = 'other';
            const leagueLower = league.toLowerCase();
            if (leagueLower.includes('premier')) leagueId = 'epl';
            else if (leagueLower.includes('la liga')) leagueId = 'laliga';
            else if (leagueLower.includes('serie a')) leagueId = 'seriea';
            else if (leagueLower.includes('bundesliga')) leagueId = 'bundesliga';
            else if (leagueLower.includes('champion')) leagueId = 'ucl';

            return {
                id: match.id || match.match_id || `match-${index}`,
                league: league,
                leagueId: leagueId,
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                homeScore: homeScore,
                awayScore: awayScore,
                time: time,
                status: status,
                homeLogo: '⚽',
                awayLogo: '⚽'
            };
        });
    };

    const bettingPlatforms = [
        {
            name: 'BetWinner',
            url: 'https://www.betwinner.com?aff=83cdf48899a9ca9715e686a4e71f5b60854e5cc65aabc58f5f',
            logo: '🎰',
            bonus: '₦200,000',
            color: 'from-red-600 to-red-700'
        },
        {
            name: '1xBet',
            url: 'https://reffpa.com/L?tag=d_4882646m_97c_3780558&site=4882646&ad=97',
            logo: '⚽',
            bonus: '130% Bonus',
            color: 'from-blue-600 to-blue-700'
        }
    ];

    const leagues = [
        { id: 'all', name: 'All', flag: '🌍' },
        { id: 'epl', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
        { id: 'laliga', name: 'La Liga', flag: '🇪🇸' },
        { id: 'seriea', name: 'Serie A', flag: '🇮🇹' },
        { id: 'bundesliga', name: 'Bundesliga', flag: '🇩🇪' },
        { id: 'ucl', name: 'Champions League', flag: '⭐' }
    ];

    const filteredMatches = activeLeague === 'all'
        ? matches
        : matches.filter(m => m.leagueId === activeLeague);

    const getStatusBadge = (status, time) => {
        const statusStr = String(status).toLowerCase();
        const timeStr = String(time).toLowerCase();
        const isLive = statusStr.includes('live') || statusStr.includes('1h') || statusStr.includes('2h') || timeStr.includes("'");

        if (isLive) {
            return (
                <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    {time}
                </div>
            );
        }
        if (statusStr.includes('ht') || statusStr.includes('half')) {
            return <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">HT</div>;
        }
        if (statusStr.includes('ft') || statusStr.includes('finished')) {
            return <div className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-bold">FT</div>;
        }
        return <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">{time}</div>;
    };

    return (
        <div className="min-h-screen bg-gray-100 lg:mt-60">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Trophy size={28} className="text-yellow-400" />
                            <h1 className="text-xl md:text-2xl font-bold">Live Scores</h1>
                            {apiStatus === 'connected' && (
                                <div className="flex items-center gap-1 bg-green-500 px-2 py-1 rounded text-xs">
                                    <Wifi size={14} />
                                    <span>Live</span>
                                </div>
                            )}
                            {apiStatus === 'error' && (
                                <div className="flex items-center gap-1 bg-red-800 px-2 py-1 rounded text-xs">
                                    <WifiOff size={14} />
                                    <span>Offline</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={fetchLiveMatches}
                                disabled={loading}
                                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all disabled:opacity-50"
                                title="Refresh scores"
                            >
                                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                            </button>
                            <div className="text-xs md:text-sm bg-white/20 px-3 py-1 rounded-full">
                                {currentTime.toLocaleTimeString()}
                            </div>
                        </div>
                    </div>

                    {/* League Filter */}
                    <div className="overflow-x-auto -mx-4 px-4 pb-2">
                        <div className="flex gap-2 min-w-max">
                            {leagues.map(league => (
                                <button
                                    key={league.id}
                                    onClick={() => setActiveLeague(league.id)}
                                    className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${activeLeague === league.id
                                            ? 'bg-white text-red-600 shadow-lg scale-105'
                                            : 'bg-white/20 hover:bg-white/30'
                                        }`}
                                >
                                    <span className="mr-1">{league.flag}</span>
                                    {league.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Betting Platforms Banner */}
                <div className="mb-6 grid md:grid-cols-2 gap-4">
                    {bettingPlatforms.map((platform, idx) => (
                        <a
                            key={idx}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className={`bg-gradient-to-r ${platform.color} rounded-xl p-4 text-white flex items-center justify-between hover:shadow-xl transition-all transform hover:scale-105`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{platform.logo}</span>
                                <div>
                                    <p className="font-bold text-lg">{platform.name}</p>
                                    <p className="text-sm opacity-90">Get {platform.bonus} Bonus</p>
                                </div>
                            </div>
                            <ExternalLink size={20} />
                        </a>
                    ))}
                </div>

                {/* API Setup Instructions */}
                {apiStatus === 'error' && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="text-red-600 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-red-800 mb-2">Unable to Connect to API</h3>
                                <p className="text-sm text-red-700 mb-3">{error}</p>
                                <div className="text-sm text-red-700 space-y-2">
                                    <p className="font-semibold">Troubleshooting Steps:</p>
                                    <ol className="list-decimal ml-4 space-y-1">
                                        <li>Go to <a href="https://rapidapi.com/Creativesdev/api/free-api-live-football-data" target="_blank" rel="noopener" className="underline font-semibold">RapidAPI Free API Live Football Data</a></li>
                                        <li>Make sure you're subscribed (even the free plan requires subscription)</li>
                                        <li>Check your API dashboard for remaining requests</li>
                                        <li>Verify your API key is correct</li>
                                        <li>Check the browser console (F12) for detailed error messages</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Live Matches */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            {apiStatus === 'connected' && (
                                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                            )}
                            <h2 className="text-lg md:text-xl font-bold text-gray-800">
                                {apiStatus === 'connected' ? 'Live Matches' : 'Waiting for Connection...'}
                                {filteredMatches.length > 0 && ` (${filteredMatches.length})`}
                            </h2>
                        </div>
                        {loading && (
                            <span className="text-sm text-gray-500">Updating...</span>
                        )}
                    </div>

                    {apiStatus === 'checking' ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <RefreshCw size={48} className="mx-auto text-blue-500 mb-3 animate-spin" />
                            <p className="text-gray-600 font-semibold">Connecting to API...</p>
                            <p className="text-sm text-gray-400 mt-2">Please wait</p>
                        </div>
                    ) : filteredMatches.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <Clock size={48} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500 font-semibold">No live matches at the moment</p>
                            <p className="text-sm text-gray-400 mt-2">
                                {apiStatus === 'connected'
                                    ? 'Check back soon when matches are playing'
                                    : 'Please check your API connection above'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredMatches.map((match) => (
                                <div key={match.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b">
                                        <span className="text-xs font-semibold text-gray-600">{match.league}</span>
                                        {getStatusBadge(match.status, match.time)}
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1 flex items-center gap-2 md:gap-3">
                                                <span className="text-2xl md:text-3xl">{match.homeLogo}</span>
                                                <span className="font-semibold text-sm md:text-base text-gray-800 truncate">
                                                    {match.homeTeam}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 md:gap-4 px-4 py-2 bg-gray-100 rounded-lg">
                                                <span className="text-2xl md:text-3xl font-bold text-red-600">
                                                    {match.homeScore}
                                                </span>
                                                <span className="text-gray-400 font-bold">-</span>
                                                <span className="text-2xl md:text-3xl font-bold text-red-600">
                                                    {match.awayScore}
                                                </span>
                                            </div>

                                            <div className="flex-1 flex items-center gap-2 md:gap-3 justify-end">
                                                <span className="font-semibold text-sm md:text-base text-gray-800 truncate text-right">
                                                    {match.awayTeam}
                                                </span>
                                                <span className="text-2xl md:text-3xl">{match.awayLogo}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-t">
                                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                                <span className="text-sm md:text-base">Bet Now</span>
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Start Betting on Live Matches! 🎯</h3>
                    <p className="text-sm md:text-base mb-4 opacity-90">Join now and get massive welcome bonuses</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={bettingPlatforms[0].url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="bg-white text-green-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all"
                        >
                            🎰 Claim Bonus Now
                        </a>
                        <a
                            href={bettingPlatforms[1].url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-all"
                        >
                            ⚽ Bet on 1xBet
                        </a>
                    </div>
                    <p className="text-xs mt-4 opacity-70">18+ | T&Cs apply | Gamble responsibly</p>
                </div>
            </div>
        </div>
    );
}