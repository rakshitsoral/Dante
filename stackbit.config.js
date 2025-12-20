export default {
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '16',
  
  devCommand: 'npm run eleventy:serve',
  
  experimental: {
    ssg: {
      name: 'Eleventy',
      logPatterns: {
        up: ['Server at']
      },
      directoryChangePatterns: ['src/**']
    }
  },

  contentSources: [
    {
      name: 'local',
      type: 'git'
    }
  ],

  models: {
    page: {
      type: 'page',
      label: 'Page',
      filePath: 'src/{slug}.md',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          required: true
        },
        {
          type: 'markdown',
          name: 'body',
          label: 'Content'
        }
      ]
    }
  }
};
module.exports = {
  stackbitVersion: '~0.6.0',
  ssgName: 'eleventy',
  nodeVersion: '16',
  contentSources: []
};