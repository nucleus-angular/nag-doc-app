basePath = '../web';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/object-array-utility/object-array-utility.js',
  'components/underscore/underscore.js',
  'components/moment/moment.js',
  'components/modernizr/modernizr.js',
  'components/jquery/jquery.js',
  'components/unstable-angular-complete/angular.js',
  'components/unstable-angular-complete/angular-mocks.js',
  'app/tests/library/mocker.js',
  'app/application.js',
  'app/components/**/*.js'
];

autoWatch = false;

browsers = ['Chrome'];

// Auto run tests on start (when browsers are captured) and exit
singleRun = true;
