const { TimelineService } = require('wdio-timeline-reporter/timeline-service');

exports.config = {
  runner: 'local',
  specs: ['./specs/**/*.spec.js'],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          '--disable-infobars',
          '--window-size=1280,800',
          '--headless',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      },
    },
  ],
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'http://localhost:8080',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      'chromedriver',
      {
        args: ['--silent'],
      },
    ],
    [TimelineService],
  ],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
