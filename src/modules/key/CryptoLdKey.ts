import * as cryptoLd from "crypto-ld";
import { DIDDocKeyMaterial, DIDDocKeyParams, DIDDocKeyType, DIDDocPublicKeyObject, IDIDDocKey, secureAny } from "../../types";


export default class CryptoLdKey implements IDIDDocKey {
    private keyPair: secureAny = {};
    private _keyType: DIDDocKeyType = DIDDocKeyType.Ed25519;
    private _id = "";
    private _controller = "";


    constructor(params: DIDDocKeyParams) {
        this._keyType = params.keyType || DIDDocKeyType.Ed25519;
        this._id = params.did;
        this._controller = params.controller || this._id;
    }


    /*eslint-disable @typescript-eslint/explicit-function-return-type*/
    get type() {
        return this._keyType;
    }
    /*eslint-enable @typescript-eslint/explicit-function-return-type*/

    /*eslint-disable @typescript-eslint/explicit-function-return-type*/
    get publicKey() {
        if (this._keyType === DIDDocKeyType.Ed25519) {
            return this.keyPair.publicKeyBase58;
        }
        if (this._keyType === DIDDocKeyType.RSA) {
            return this.keyPair.publicKeyPem;
        }
    }
    /*eslint-enable @typescript-eslint/explicit-function-return-type*/

    /*eslint-disable @typescript-eslint/explicit-function-return-type*/
    get privateKey() {
        if (this._keyType === DIDDocKeyType.Ed25519) {
            return this.keyPair.privateKeyBase58;
        }
        if (this._keyType === DIDDocKeyType.RSA) {
            return this.keyPair.privateKeyPem;
        }
    }
    /*eslint-enable @typescript-eslint/explicit-function-return-type*/

    /*eslint-disable @typescript-eslint/explicit-function-return-type*/
    get id() {
        return this._id;
    }
    /*eslint-enable @typescript-eslint/explicit-function-return-type*/

    /*eslint-disable @typescript-eslint/explicit-function-return-type*/
    get keyType() {
        return this._keyType;
    }
    /*eslint-enable @typescript-eslint/explicit-function-return-type*/

    /*eslint-disable @typescript-eslint/explicit-function-return-type*/
    get controller() {
        return this._controller;
    }
    /*eslint-enable @typescript-eslint/explicit-function-return-type*/


    public async generate(): Promise<void> {
        if (this._keyType === DIDDocKeyType.Ed25519) {
            this.keyPair = await cryptoLd.Ed25519KeyPair.generate();
        }

        if (this._keyType === DIDDocKeyType.RSA) {
            this.keyPair = await cryptoLd.RSAKeyPair.generate();
        }

        this.keyPair.id = this._id + "#" + this.keyPair.fingerprint();
        this.keyPair.controller = this.controller;
    }


    public publish(): DIDDocPublicKeyObject {
        return this.keyPair.publicNode();
    }


    public async exportKeyMaterial(): Promise<DIDDocKeyMaterial> {
        return await this.keyPair.export();
    }


    public importKeyPair(privateKey: string, publicKey: string): void {
        if (this.keyType === DIDDocKeyType.Ed25519) {
            this.keyPair = new cryptoLd.Ed25519KeyPair({ publicKeyBase58: publicKey, privateKeyBase58: privateKey });
        }

        if (this.keyType === DIDDocKeyType.RSA) {
            this.keyPair = new cryptoLd.RSAKeyPair({ privateKeyPem: privateKey, publicKeyPem: publicKey });
        }

        this.keyPair.id = this._id + "#" + this.keyPair.fingerprint();
        this.keyPair.controller = this.controller;
    }
}