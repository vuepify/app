export class ApiUrls {
    constructor(port) {
        this._port = port;
    }

    buildSocketUrl(...paths) {
        return [`ws://localhost:${this._port}`, ...paths].join('/');
    }

    buildHttpUrl(...paths) {
        return [`http://localhost:${this._port}`, ...paths].join('/');
    }

    get liveUrl() {
        return this.buildSocketUrl('live');
    }

    get versionUrl() {
        return this.buildHttpUrl('version')
    }
}
