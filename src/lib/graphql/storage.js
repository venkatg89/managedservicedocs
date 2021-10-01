import Realm from 'realm';

const ITEM_SCHEMA = {
    name: "offlineStorage",
    primaryKey: "name",
    properties: {
      name: "string",
      content: "string"
    }
}

const REALM_PATH = 'tealpanda.realm';

class offlineStorage {
    constructor() {
        this.realm = createRealmAccess(ITEM_SCHEMA);
    }

    accessItemInstances = async () => {
        const realm = await this.realm();
        return realm.objects(ITEM_SCHEMA.name);
    }

    getItem = async (key, callback) => {
        const items = await this.accessItemInstances();
        const matches = items.filtered(`name = "${key}"`);
        
        if (matches.length > 0 && matches[0]) {
            if (callback) callback(null, matches[0].content)
            return matches[0].content;
        } else {
            throw new Error(`Could not get item with key: '${key}'`);
        }
    }

    setItem = async (key, value, callback) => {
        try{ 
            const realm = await this.realm();
            
            realm.write(() => {
                realm.create(
                ITEM_SCHEMA.name,
                {
                    name: key,
                    content: value
                },
                true);
            });

            if (callback) callback(null, value)
        } catch (err) {
            console.warn(`Error setting item: ${key} \r\n ${value} \r\n ---- begin error ---- \r\n ${err}`);
        }
    }

    removeItem = async (key, callback) => {
        const realm = await this.realm();
        const items = await this.accessItemInstances();

        if (callback) callback(null, value)

        realm.write(() => {
            const item = items.filtered((name = `${key}`));
            realm.delete(item);
        });
    }

    getAllKeys = async (callback) =>  {
        try{
            const items = await this.accessItemInstances();
            let keys = items.map(item => (item.name));
            
            if (callback) callback(null, keys);

            return keys;
        } catch (e) {
            console.error(e);
            callback && callback(e);
        }
    }
}

function stringToKey (byteString) {
    let byteArray = new Int8Array(byteString.length)
    
    for (i = 0; i< byteString.length; i++){
      byteArray[i] = byteString.charCodeAt(i) -127;
    }

    return byteArray;
}

function createRealmAccess (ITEM_SCHEMA, path = REALM_PATH, ) {
    let __realm = null;

    return async () => {
        let key = stringToKey('iwQL2+K69vml6dg7-4Z2jX71va+lr7j-ZXrgPv9mHXsFRPqPRliMs24nH?ZoCt-W');
        
        if (!__realm) {
            try {
            __realm = await Realm.open({
                schema: [ITEM_SCHEMA],
                path,
                encryptionKey: key
            });
            } catch (error) {
                throw error;
            }
        }

        return __realm;
    };
}
  
function generatedKey () {
    let newKey = [];

    for (let i = 0; i < 64; i++) {
        newKey.push(Math.floor(Math.random() * 255));
    }

    return newKey;
}

function keyToString (buffer) {
    var byteArray = new Int8Array(buffer);
    var byteString = '';
    
    for (var i = 0; i < byteArray.byteLength; i++) {
            byteString += String.fromCodePoint(byteArray[i] + 127);
    }

    return byteString;
}

export const storage = new offlineStorage();