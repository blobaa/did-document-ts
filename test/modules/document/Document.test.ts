import { DIDDocKey, DIDDocRelationship, DIDDocRelationshipType, DIDDocService, DIDDocument, DIDDocKeyType } from "../../../src";
import config from "./../../config";


if (config.test.documentModule) {
    describe("Document module tests", () => {

        test("Document publishing", async () => {
            const key1 = new DIDDocKey({ did: config.did.alice });
            const key2 = new DIDDocKey({ did: config.did.alice, keyType: DIDDocKeyType.RSA });

            key1.importKeyPair(config.keyMaterial.ed25519.privateKeyBase58, config.keyMaterial.ed25519.publicKeyBase58);
            key2.importKeyPair(config.keyMaterial.rsa.privateKeyPem, config.keyMaterial.rsa.publicKeyPem);


            const relationship1 = new DIDDocRelationship({
                relationshipType: DIDDocRelationshipType.AUTHENTICATION,
                didDocPublicKeyIds: [ key1.id ],
            });

            const relationship2 = new DIDDocRelationship({
                relationshipType: DIDDocRelationshipType.ASSERTION_METHOD,
                didDocPublicKeyIds: [ key2.id ],
            });


            const service1 = new DIDDocService({
                did: config.did.alice,
                name: "test1",
                type: "test-type",
                serviceEndpoint: "test-endpoint1"
            });

            const service2 = new DIDDocService({
                did: config.did.alice,
                name: "test2",
                type: "test-type",
                serviceEndpoint: "test-endpoint2"
            });


            const document = new DIDDocument({
                did: config.did.alice,
                keys: [ key1, key2 ],
                relationships: [ relationship1, relationship2 ],
                services: [service1, service2],
                contexts: [ "new-awesome-context" ],
                created: "yesterday",
                updated: "today"
            });
            const didDocumentObject = document.publish();

            expect(didDocumentObject["@context"].length).toBe(3);
            expect(didDocumentObject["@context"][0]).toBe("https://www.w3.org/ns/did/v1");
            expect(didDocumentObject["@context"][1]).toBe("https://w3id.org/security/v1");
            expect(didDocumentObject["@context"][2]).toBe("new-awesome-context");

            expect(didDocumentObject.id).toBe(config.did.alice);
            expect(didDocumentObject.created).toBe("yesterday");
            expect(didDocumentObject.updated).toBe("today");

            expect(didDocumentObject.publicKey?.length).toBe(2);
            if (didDocumentObject.publicKey) {
                expect(didDocumentObject.publicKey[0]).toEqual(key1.publish());
                expect(didDocumentObject.publicKey[1]).toEqual(key2.publish());
            }

            expect(didDocumentObject.assertionMethod).toBeTruthy();
            expect(didDocumentObject.authentication).toBeTruthy();

            expect(didDocumentObject.service?.length).toBe(2);
            if (didDocumentObject.service) {
                expect(didDocumentObject.service[0]).toEqual(service1.publish());
                expect(didDocumentObject.service[1]).toEqual(service2.publish());
            }
        });

    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}