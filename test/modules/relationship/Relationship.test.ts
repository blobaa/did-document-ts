import { DIDDocRelationship, DIDDocRelationshipParams, DIDDocRelationshipType, DIDDocKey, DIDDocKeyType } from "../../../src";
import config from "./../../config";


if (config.test.relationshipModule) {
    describe("Relationship module tests", () => {

        test("Relationship publishing with ids", () => {
            const key1 = new DIDDocKey({ did: "" });
            const key2 = new DIDDocKey({ did: "", keyType: DIDDocKeyType.RSA });

            key1.importKeyMaterial(config.keyMaterial.ed25519);
            key2.importKeyMaterial(config.keyMaterial.rsa);

            const didDocPubKey1 = key1.publish();
            const didDocPubKey2 = key2.publish();


            const params: DIDDocRelationshipParams = {
                relationshipType: DIDDocRelationshipType.ASSERTION_METHOD,
                publicKeysAsRef: [ didDocPubKey1, didDocPubKey2 ]
            };
            const relationship = new DIDDocRelationship(params);

            const didDocRelationshipObject = relationship.publish();
            expect(didDocRelationshipObject.type).toBe("assertionMethod");
            expect(didDocRelationshipObject.array[0]).toBe(config.didDocPublicKeyObject.ed25519.id);
            expect(didDocRelationshipObject.array[1]).toBe(config.didDocPublicKeyObject.rsa.id);
        });


        test("Relationship publishing with keys", () => {
            const key1 = new DIDDocKey({ did: "" });
            const key2 = new DIDDocKey({ did: "", keyType: DIDDocKeyType.RSA });

            key1.importKeyMaterial(config.keyMaterial.ed25519);
            key2.importKeyMaterial(config.keyMaterial.rsa);

            const didDocPubKey1 = key1.publish();
            const didDocPubKey2 = key2.publish();


            const params: DIDDocRelationshipParams = {
                relationshipType: DIDDocRelationshipType.AUTHENTICATION,
                publicKeys: [ didDocPubKey1, didDocPubKey2 ]
            };
            const relationship = new DIDDocRelationship(params);

            const didDocRelationshipObject = relationship.publish();
            expect(didDocRelationshipObject.type).toBe("authentication");
            expect(didDocRelationshipObject.array[0]).toEqual(config.didDocPublicKeyObject.ed25519);
            expect(didDocRelationshipObject.array[1]).toEqual(config.didDocPublicKeyObject.rsa);
        });


        test("Relationship publishing mixed", () => {
            const key1 = new DIDDocKey({ did: "" });
            const key2 = new DIDDocKey({ did: "", keyType: DIDDocKeyType.RSA });

            key1.importKeyMaterial(config.keyMaterial.ed25519);
            key2.importKeyMaterial(config.keyMaterial.rsa);

            const didDocPubKey1 = key1.publish();
            const didDocPubKey2 = key2.publish();


            const params: DIDDocRelationshipParams = {
                relationshipType: DIDDocRelationshipType.KEY_AGREEMENT,
                publicKeys: [ didDocPubKey1 ],
                publicKeysAsRef: [ didDocPubKey2 ]
            };
            const relationship = new DIDDocRelationship(params);

            const didDocRelationshipObject = relationship.publish();
            expect(didDocRelationshipObject.type).toBe("keyAgreement");
            expect(didDocRelationshipObject.array[0]).toBe(config.didDocPublicKeyObject.rsa.id);
            expect(didDocRelationshipObject.array[1]).toEqual(config.didDocPublicKeyObject.ed25519);
        });

    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}