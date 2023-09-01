const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  e2e: {
    specPattern: 'cypress/e2e/*.cy.js',
    setupNodeEvents(on, config) {},
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
  },
})


//old version
// const { defineConfig } = require('cypress')

// module.exports = defineConfig({
//   video: false,
//   specPattern: 'cypress/integration/*',
//   e2e: {
//     setupNodeEvents(on, config) {},
//     excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
//   },
// })
