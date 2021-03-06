/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function (moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });

  if (unacceptedModules.length > 0) {
    console.warn(
      "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
    );
    unacceptedModules.forEach(function (moduleId) {
      console.warn('[HMR]  - ' + moduleId);
    });

    if (chrome && chrome.runtime && chrome.runtime.reload) {
      console.warn('[HMR] extension reload');
      chrome.runtime.reload();
    } else {
      console.warn(
        "[HMR] Can't extension reload. not found chrome.runtime.reload."
      );
    }
  }

  if (!renewedModules || renewedModules.length === 0) {
    console.log('[HMR] Nothing hot updated.');
  } else {
    console.log('[HMR] Updated modules:');
    renewedModules.forEach(function (moduleId) {
      console.log('[HMR]  - ' + moduleId);
    });
  }
};
