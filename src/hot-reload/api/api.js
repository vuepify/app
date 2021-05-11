import {withErrorLogger} from "../utils";

export class Api {
    constructor(urls) {
        this._urls = urls;
    }

    async listenLiveReload(onReload) {
        const client = await this._openLiveConnection();
        client.onclose = () => this.listenLiveReload(onReload);
        client.onmessage = withErrorLogger((event) => {
            const data = JSON.parse(event.data);
            if (data.hotReload !== true) return;
            onReload()
        });
    }

    _openLiveConnection() {
        return new Promise(resolve => {
            const client = new WebSocket(this._urls.liveUrl);
            client.onopen = () => resolve(client);
            client.onerror = () => setTimeout(this._openLiveConnection.bind(this), 2000, resolve);
        });
    }

    async fetchActualVersion() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this._urls.versionUrl);
            xhr.onload = () => resolve(JSON.parse(xhr.responseText));
            xhr.onerror = reject;
            xhr.send(null);
        });
    }
}
