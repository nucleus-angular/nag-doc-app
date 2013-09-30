basePath = '../web';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'app/tests/e2e/**/*.js'
];

autoWatch = false;

browsers = ['Chrome'];

singleRun = true;

proxies = {
  '/': 'http://localhost:3000'
};
