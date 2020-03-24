import preloadJrWorker from './foxit-lib/preload-jr-worker';
import { licenseKey, licenseSN } from './license-key';

window.readyWorker = preloadJrWorker({
    workerPath: '/foxit-lib/',
    enginePath: '/foxit-lib/jr-engine/gsdk',
    fontPath: '/foxit-lib/assets/external/brotli',
    licenseSN,
    licenseKey,
});
