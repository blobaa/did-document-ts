import { DIDDocService, DIDDocServiceParams } from "../../../src";
import config from "./../../config";


if (config.test.serviceModule) {
    describe("Service module tests", () => {

        test("Service publishing", () => {
            const params: DIDDocServiceParams = {
                did: config.did.alice,
                name: "test",
                type: "test-type",
                serviceEndpoint: "test-endpoint"
            };
            const service = new DIDDocService(params);

            const didDocServiceObject = service.publish();
            expect(didDocServiceObject.id).toBe(config.did.alice + "#test");
            expect(didDocServiceObject.type).toBe("test-type");
            expect(didDocServiceObject.serviceEndpoint).toBe("test-endpoint");
        });


        test("Service creation with additional properties", () => {
            const params: DIDDocServiceParams = {
                did: config.did.alice,
                name: "test",
                type: "test-type",
                serviceEndpoint: "test-endpoint",
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