export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  const API_KEY = process.env.GOOGLE_API_KEY;
  const CX = process.env.GOOGLE_CX;

  if (!API_KEY || !CX) {
    return res.status(500).json({ error: 'Server configuration error (missing API keys)' });
  }

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(q)}&searchType=image&num=6`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch images');
    }

    const images = (data.items || []).map(item => ({
      title: item.title,
      link: item.link,
      thumbnail: item.image?.thumbnailLink
    }));

    return res.status(200).json({ images });
  } catch (error) {
    console.error('Image fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch images' });
  }
}
