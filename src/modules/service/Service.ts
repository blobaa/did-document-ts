import { IDIDDocService, DIDDocServiceParams, DIDDocServiceObject } from "../../types";


export default class Service implements IDIDDocService {
    private serviceProperties = {} as DIDDocServiceParams;

    constructor(params: DIDDocServiceParams) {
        this.serviceProperties = params;
    }


    public publish(): DIDDocServiceObject {
        return this.serviceProperties as DIDDocServiceObject;
    }
}