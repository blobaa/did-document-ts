import { DIDDocService, DIDDocServiceParams } from "../../../src";
import config from "./../../config";


if (config.test.serviceModule) {
    describe("Service module tests", () => {

        test("Service publishing", () => {
            const params: DIDDocServiceParams = {
                did: config.did.alice,
                name: "test",
                type: config.service.type,
                serviceEndpoint: config.service.endpoint
            };
            const service = new DIDDocService(params);

            const didDocServiceObject = service.publish();
            expect(didDocServiceObject.id).toBe(config.did.alice + "#test");
            expect(didDocServiceObject.type).toBe(config.service.type);
            expect(didDocServiceObject.serviceEndpoint).toBe(config.service.endpoint);
        });


        test("Service creation with additional properties", () => {
            const params: DIDDocServiceParams = {
                did: config.did.alice,
                name: "test",
                type: config.service.type,
                serviceEndpoint: config.service.endpoint,
                extraProp: "extraProperty"
            };
            const service = new DIDDocService(params);

            const didDocServiceObject = service.publish();
            expect(didDocServiceObject.extraProp).toBe("extraProperty");
        });

    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}