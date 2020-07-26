import { DIDDocPublicKeyObject, IDIDDocRelationship, DIDDocRelationshipObject, DIDDocRelationshipType, DIDDocRelationshipParams } from "../../types";


export default class VerificationRelationship implements IDIDDocRelationship {
    private _relationshipType = DIDDocRelationshipType.AUTHENTICATION;
    private didDocPublicKeys = [{}] as DIDDocPublicKeyObject[];
    private ids = ["-1"];


    constructor(params: DIDDocRelationshipParams) {
        this._relationshipType = params.relationshipType;
        if (params.didDocPublicKeyIds) {
            this.ids = params.didDocPublicKeyIds;
        }

        if (params.didDocPublicKeys) {
            this.didDocPublicKeys = params.didDocPublicKeys;
        }
    }


    /*eslint-disable @typescript-eslint/explicit-function-return-type*/
    get relationshipType() {
        return this._relationshipType;
    }
    /*eslint-enable @typescript-eslint/explicit-function-return-type*/


    public publish(): DIDDocRelationshipObject {
        const retVal = {
            type: this._relationshipType,
            array: [] as Array<string[] | DIDDocPublicKeyObject[]>
        };

        if (this.ids[0] !== "-1") {
            retVal.array = [...retVal.array, ...this.ids] as Array<string[] | DIDDocPublicKeyObject[]>;
        }

        if (Object.entries(this.didDocPublicKeys[0]).length !== 0) {
            retVal.array = [...retVal.array, ...this.didDocPublicKeys] as Array<string[] | DIDDocPublicKeyObject[]>;
        }
        return retVal;
    }
}