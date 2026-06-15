import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://has88888888.com';

  const tools = [
    'mbti', 'love-test', 'lucky', 'fortune',
    'qrcode', 'image-compress', 'text-tools', 'password',
    'color-palette', 'json', 'meme', 'name-score',
    'timestamp', 'base64', 'hash', 'bmi', 'age-calculator', 'uuid',
    'url-encode', 'dedup', 'word-count', 'regex', 'ip-lookup', 'hepatitis-b', 'hepatitis-b-treatment', 'novel-to-video', 'bazi',
    'big-five', 'enneagram', 'disc', 'dark-triad', 'color-personality',
    'love-languages', 'attachment-style', 'holland-code', 'psychology',
  ];

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog/mbti-16-types`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog/compress-images`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog/json-formatter-guide`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];
}
