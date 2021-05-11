import {ApiUrls, Api} from "./hot-reload/api";
import {reloadPage} from "./hot-reload/utils";

const {port, version} = document.currentScript.dataset;
const api = new Api(new ApiUrls(port));

(async () => {
    const actualVersion = (await api.fetchActualVersion()).version;
    if (version < actualVersion) return reloadPage();

    await api.listenLiveReload(() => reloadPage());
    console.log('%c[Vuepify]', 'color: #0069c0', ' Waiting for reload signal from service…')

    VUEPIFY.isHotReloadReady = true;
    document.dispatchEvent(new CustomEvent('vuepifyHotReloadReady'));
})();
