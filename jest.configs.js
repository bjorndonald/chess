module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: `<html lang="en">
    <body>
        <div id="chess">
        </div>
       
    </body>`,
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007',
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};