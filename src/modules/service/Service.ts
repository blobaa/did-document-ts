import { IDIDDocService, DIDDocServiceParams, DIDDocServiceObject, objectAny } from "../../types";


export default class Service implements IDIDDocService {
    private id = "";
    private type = "";
    private serviceEndpoint = "";
    private misc = {} as objectAny;

    constructor(params: DIDDocServiceParams) {
        this.id = params.did + "#" + params.name;
        this.type = params.type;
        this.serviceEndpoint = params.serviceEndpoint;

        this.misc = { ...params };
        delete this.misc.did;
        delete this.misc.name;
        delete this.misc.type;
        delete this.misc.serviceEndpoint;
    }


    public publish(): DIDDocServiceObject {
        let retVal: DIDDocServiceObject = {
            id: this.id,
            type: this.type,
            serviceEndpoint: this.serviceEndpoint,
        };

        if (Object.entries(this.misc).length !== 0) {
            retVal = { ...retVal, ...this.misc };
        }
        return retVal;
    }
}