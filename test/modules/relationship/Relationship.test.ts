import { DIDDocRelationship, DIDDocRelationshipParams, DIDDocRelationshipType } from "../../../src";
import config from "./../../config";


if (config.test.relationshipModule) {
    describe("Relationship module tests", () => {

        test("Relationship publishing with ids", () => {
            const params: DIDDocRelationshipParams = {
                relationshipType: DIDDocRelationshipType.ASSERTION_METHOD,
                didDocPublicKeyIds: [ config.didDocPublicKeyObject.ed25519.id, config.didDocPublicKeyObject.rsa.id ]
            };
            const relationship = new DIDDocRelationship(params);

            const didDocRelationshipObject = relationship.publish();
            expect(didDocRelationshipObject.type).toBe("assertionMethod");
            expect(didDocRelationshipObject.array[0]).toBe(config.didDocPublicKeyObject.ed25519.id);
            expect(didDocRelationshipObject.array[1]).toBe(config.didDocPublicKeyObject.rsa.id);
        });


        test("Relationship publishing with keys", () => {
            const params: DIDDocRelationshipParams = {
                relationshipType: DIDDocRelationshipType.AUTHENTICATION,
                didDocPublicKeys: [ config.didDocPublicKeyObject.ed25519, config.didDocPublicKeyObject.rsa ]
            };
            const relationship = new DIDDocRelationship(params);

            const didDocRelationshipObject = relationship.publish();
            expect(didDocRelationshipObject.type).toBe("authentication");
            expect(didDocRelationshipObject.array[0]).toEqual(config.didDocPublicKeyObject.ed25519);
            expect(didDocRelationshipObject.array[1]).toEqual(config.didDocPublicKeyObject.rsa);
        });


        test("Relationship publishing mixed", () => {
            const params: DIDDocRelationshipParams = {
                relationshipType: DIDDocRelationshipType.KEY_AGREEMENT,
                didDocPublicKeys: [ config.didDocPublicKeyObject.ed25519 ],
                didDocPublicKeyIds: [ config.didDocPublicKeyObject.rsa.id ]
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