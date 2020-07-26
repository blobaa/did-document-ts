import { DIDDocKey, DIDDocKeyType } from "../../../src";
import config from "./../../config";


describe("Key module tests", () => {

    test("Ed25519 key generation", async () => {
        const key = new DIDDocKey({ did: config.did.alice });
        await key.generate();

        const keyMaterial = await key.exportKeyMaterial();
        expect(keyMaterial.privateKeyBase58).toBeTruthy();
        expect(keyMaterial.publicKeyBase58).toBeTruthy();
    });


    test("RSA key generation", async () => {
        const key = new DIDDocKey({ did: config.did.bob, keyType: DIDDocKeyType.RSA });
        await key.generate();
        const keyMaterial = await key.exportKeyMaterial();

        expect(keyMaterial.privateKeyPem).toBeTruthy();
        expect(keyMaterial.publicKeyPem).toBeTruthy();
    });


    test("Ed25519 key import", async () => {
        const key = new DIDDocKey({ did: config.did.alice });
        key.importKeyPair(config.keyMaterial.ed25519.privateKeyBase58, config.keyMaterial.ed25519.publicKeyBase58);

        const keyMaterial = await key.exportKeyMaterial();
        expect(keyMaterial).toEqual(config.keyMaterial.ed25519);
    });


    test("RSA key import", async () => {
        const key = new DIDDocKey({ did: config.did.bob, keyType: DIDDocKeyType.RSA });
        key.importKeyPair(config.keyMaterial.rsa.privateKeyPem, config.keyMaterial.rsa.publicKeyPem);

        const keyMaterial = await key.exportKeyMaterial();
        expect(keyMaterial).toEqual(config.keyMaterial.rsa);
    });


    test("Ed25519 key publishing", async () => {
        const key = new DIDDocKey({ did: config.did.alice });
        key.importKeyPair(config.keyMaterial.ed25519.privateKeyBase58, config.keyMaterial.ed25519.publicKeyBase58);

        const didDocPublicKeyObject = key.publish();
        expect(didDocPublicKeyObject).toEqual(config.didDocPublicKeyObject.ed25519);
    });


    test("RSA key publishing", async () => {
        const key = new DIDDocKey({ did: config.did.bob, keyType: DIDDocKeyType.RSA });
        key.importKeyPair(config.keyMaterial.rsa.privateKeyPem, config.keyMaterial.rsa.publicKeyPem);

        const didDocPublicKeyObject = key.publish();
        expect(didDocPublicKeyObject).toEqual(config.didDocPublicKeyObject.rsa);
    });


    test("Different Key controller", async () => {
        const key = new DIDDocKey({ did: config.did.alice, controller: config.did.bob });
        key.importKeyPair(config.keyMaterial.ed25519.privateKeyBase58, config.keyMaterial.ed25519.publicKeyBase58);

        const didDocPublicKeyObject = key.publish();
        expect(didDocPublicKeyObject.id.split("#")[0]).toBe(config.did.alice);
        expect(didDocPublicKeyObject.controller).toBe(config.did.bob);
    });
});