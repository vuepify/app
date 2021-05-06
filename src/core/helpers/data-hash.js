export class DataServerHash {
    encode(string) {
        return Buffer.from(string).toString('base64');
    }

    decode(hash) {
        return Buffer.from(hash, 'base64').toString('utf8')
    }
}

export class DataBrowserHash {
    encode(string) {
        return btoa(string);
    }

    decode(hash) {
        return atob(hash);
    }
}
