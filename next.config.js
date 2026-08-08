/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'img.shields.io' },
      { protocol: 'https', hostname: 'hits.sh' },
    ],
  },
  async redirects() {
    return [
      {
        // /frise etait une page qui redirigeait vers /timeline, route qui
        // n'existe pas : le lien servait donc un 404. La page est supprimee, et
        // l'URL est conservee en redirection permanente vers son equivalent
        // reel, pour ne perdre ni lien entrant ni referencement acquis.
        source: '/frise',
        destination: '/parcours',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
