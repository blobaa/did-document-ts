import { DIDDocPublicKeyObject, IDIDDocRelationship, DIDDocRelationshipObject, DIDDocRelationshipType, DIDDocRelationshipParams } from "../../types";


export default class VerificationRelationship implements IDIDDocRelationship {
    private relationshipType = DIDDocRelationshipType.AUTHENTICATION;
    private didDocPublicKeys = [{}] as DIDDocPublicKeyObject[];
    private ids = ["-1"];


    constructor(params: DIDDocRelationshipParams) {
        this.relationshipType = params.relationshipType;

        if (params.publicKeysAsRef) {
            this.ids = [];
            params.publicKeysAsRef.forEach((pubKey) => {
                this.ids.push(pubKey.id);
            });
        }

        if (params.publicKeys) {
            this.didDocPublicKeys = [];
            params.publicKeys.forEach((pubKey) => {
                this.didDocPublicKeys.push(pubKey);
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