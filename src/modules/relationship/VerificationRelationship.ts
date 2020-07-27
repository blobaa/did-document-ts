import { DIDDocPublicKeyObject, IDIDDocRelationship, DIDDocRelationshipObject, DIDDocRelationshipType, DIDDocRelationshipParams } from "../../types";


export default class VerificationRelationship implements IDIDDocRelationship {
    private relationshipType = DIDDocRelationshipType.AUTHENTICATION;
    private didDocPublicKeys = [{}] as DIDDocPublicKeyObject[];
    private ids = ["-1"];


    constructor(params: DIDDocRelationshipParams) {
        this.relationshipType = params.relationshipType;

        if (params.keyIds) {
            this.ids = [];
            params.keyIds.forEach((key) => {
                this.ids.push(key.publish().id);
            });
        }

        if (params.keys) {
            this.didDocPublicKeys = [];
            params.keys.forEach((key) => {
                this.didDocPublicKeys.push(key.publish());
            });
        }
    }


    public publish(): DIDDocRelationshipObject {
        const retVal = {
            type: this.relationshipType,
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