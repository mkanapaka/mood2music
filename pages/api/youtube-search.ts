import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'YouTube API key is not configured' });
    return;
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${q}&type=video&key=${apiKey}`;

  // Use the deployment URL as the referrer
  const referrer = 'https://mood2music.replit.app';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Referer': referrer
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    res.status(500).json({ error: 'Error fetching data from YouTube API' });
  }
}