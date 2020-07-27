import { IDIDDocService, DIDDocServiceParams, DIDDocServiceObject, objectAny } from "../../types";


export default class Service implements IDIDDocService {
    private name = "";
    private type = "";
    private serviceEndpoint = "";
    private misc = {} as objectAny;


    constructor(params: DIDDocServiceParams) {
        this.name = params.name;
        this.type = params.type;
        this.serviceEndpoint = params.serviceEndpoint;

        this.misc = { ...params };
        delete this.misc.did;
        delete this.misc.name;
        delete this.misc.type;
        delete this.misc.serviceEndpoint;
    }


    public publish(did: string): DIDDocServiceObject {
        let retVal: DIDDocServiceObject = {
            id: did + "#" + this.name,
            type: this.type,
            serviceEndpoint: this.serviceEndpoint,
        };

        if (Object.entries(this.misc).length !== 0) {
            retVal = { ...retVal, ...this.misc };
        }
        return retVal;
    }
}