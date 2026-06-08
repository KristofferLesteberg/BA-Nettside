module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'localhost',
      // numberOfRuns: 3 gives more stable scores; use 1 for faster iteration
      numberOfRuns: 1,
      url: [
        // Public pages
        'http://localhost:3000',
        'http://localhost:3000/produkter',
        'http://localhost:3000/produkter/35',
        'http://localhost:3000/prosjekter',
        'http://localhost:3000/kontakt-oss',

        // Admin — no server-side auth guard, fully auditable
        'http://localhost:3000/admin',
        'http://localhost:3000/admin?tab=bestillinger',
        'http://localhost:3000/admin?tab=prosjekter',
        'http://localhost:3000/admin?tab=kontakt%20personer',
        'http://localhost:3000/admin?tab=anmeldelser',
        'http://localhost:3000/admin/login',
        'http://localhost:3000/admin/nytt-produkt',
        'http://localhost:3000/admin/ny-anmeldelse',
        'http://localhost:3000/admin/ny-kontakt',
        'http://localhost:3000/admin/oppdater-produkt/35',
        'http://localhost:3000/admin/oppdater-anmeldelse/3',
        'http://localhost:3000/admin/oppdater-kontakt/2',
        'http://localhost:3000/admin/preview-produkt/35',
      ],
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
