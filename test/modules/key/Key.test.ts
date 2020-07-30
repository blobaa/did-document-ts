import { DIDDocKey, DIDDocKeyType } from "../../../src";
import config from "./../../config";


if (config.test.keyModule) {
    describe("Key module tests", () => {

        test("Ed25519 key generation", async () => {
            const key = new DIDDocKey();
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
            const key = new DIDDocKey({ did: "" });
            key.importKeyMaterial(config.keyMaterial.ed25519);

            const keyMaterial = await key.exportKeyMaterial();
            expect(keyMaterial).toEqual(config.keyMaterial.ed25519);
        });


        test("Ed25519 key import different did", async () => {
            const key = new DIDDocKey({ did: config.did.bob });
            key.importKeyMaterial(config.keyMaterial.ed25519);

            const keyMaterial = await key.exportKeyMaterial();
            expect(keyMaterial.controller).toEqual(config.did.alice);

            const idParts = keyMaterial.id?.split("#");
            if (idParts?.length === 2) {
                expect(idParts[0]).toEqual(config.did.bob);
                expect(idParts[1]).toBeDefined();
            } else {
                fail("key id exported wrong");
            }
        });


        test("Ed25519 key import different controller", async () => {
            const key = new DIDDocKey({ did: "", controller: config.did.bob });
            key.importKeyMaterial(config.keyMaterial.ed25519);

            const keyMaterial = await key.exportKeyMaterial();
            expect(keyMaterial.controller).toEqual(config.did.bob);

            const idParts = keyMaterial.id?.split("#");
            if (idParts?.length === 2) {
                expect(idParts[0]).toEqual(config.did.alice);
                expect(idParts[1]).toBeDefined();
            } else {
                fail("key id exported wrong");
            }
        });

        test("Ed25519 key import different controller and did", async () => {
            const key = new DIDDocKey({ did: config.did.bob, controller: config.did.charlie });
            key.importKeyMaterial(config.keyMaterial.ed25519);

            const keyMaterial = await key.exportKeyMaterial();
            expect(keyMaterial.controller).toEqual(config.did.charlie);

            const idParts = keyMaterial.id?.split("#");
            if (idParts?.length === 2) {
                expect(idParts[0]).toEqual(config.did.bob);
                expect(idParts[1]).toBeDefined();
            } else {
                fail("key id exported wrong");
            }
        });


        test("RSA key import", async () => {
            const key = new DIDDocKey({ did: "", keyType: DIDDocKeyType.RSA });
            key.importKeyMaterial(config.keyMaterial.rsa);

            const keyMaterial = await key.exportKeyMaterial();
            expect(keyMaterial).toEqual(config.keyMaterial.rsa);
        });


        test("Ed25519 key publishing", async () => {
            const key = new DIDDocKey({ did: config.did.alice });
            key.importKeyMaterial(config.keyMaterial.ed25519);

            const didDocPublicKeyObject = key.publish();
            expect(didDocPublicKeyObject).toEqual(config.didDocPublicKeyObject.ed25519);
        });


        test("RSA key publishing", async () => {
            const key = new DIDDocKey({ did: config.did.bob, keyType: DIDDocKeyType.RSA });
            key.importKeyMaterial(config.keyMaterial.rsa);

            const didDocPublicKeyObject = key.publish();
            expect(didDocPublicKeyObject).toEqual(config.didDocPublicKeyObject.rsa);
        });


        test("Different Key controller", async () => {
            const key = new DIDDocKey({ did: config.did.alice, controller: config.did.bob });
            key.importKeyMaterial(config.keyMaterial.ed25519);

            const didDocPublicKeyObject = key.publish();
            expect(didDocPublicKeyObject.id.split("#")[0]).toBe(config.did.alice);
            expect(didDocPublicKeyObject.controller).toBe(config.did.bob);
        });
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}