export async function GET() {
    try {
        const response = await fetch(
            "https://free-api-live-football-data.p.rapidapi.com/football-live-now",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                    "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
                },
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("API Error:", text);
            return Response.json({ error: "Failed to fetch data" }, { status: 500 });
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("API error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
