import { DIDDocPublicKey, DIDDocRelationshipObject, DIDDocRelationshipType, DIDDocServiceObject, DIDDocumentObject, DIDDocumentParams, IDIDDocRelationship, IDIDDocService, IDIDDocument } from "../..";


export default class Document implements IDIDDocument {
    private did = "";
    private context = ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/v1"];
    private services: IDIDDocService[] | undefined;
    private publicKeys: DIDDocPublicKey[] | undefined;
    private relationships: IDIDDocRelationship[] | undefined;
    private created: string | undefined;
    private updated: string | undefined;


    constructor(params: DIDDocumentParams) {
        this.did = params.did || "";
        if (params.contexts) {
            this.context = [...this.context, ... params.contexts];
        }
        this.services = params.services;
        this.publicKeys = params.publicKeys;
        this.relationships = params.relationships;
        this.created = params.created;
        this.updated = params.updated;
    }


    public publish(): DIDDocumentObject {
        const doc = {} as DIDDocumentObject;

        doc["@context"] = this.context;
        doc.id = this.did;

        if (this.publicKeys) {
            const pubKeys = [] as DIDDocPublicKey[];
            this.publicKeys.forEach(key => pubKeys.push(key));
            doc.publicKey = pubKeys as DIDDocPublicKey[];
        }

        if (this.relationships) {
            const relationships = [] as DIDDocRelationshipObject[];
            this.relationships.forEach(relationship => relationships.push(relationship.publish()));
            relationships.forEach((relation) => {
                    doc[relation.type as DIDDocRelationshipType] = relation.array;
            });
        }

        if (this.services) {
            const services = [] as DIDDocServiceObject[];
            this.services.forEach(service => services.push(service.publish(this.did)));
            doc.service = services as DIDDocServiceObject[];
        }

        if (this.created) {
            doc.created = this.created;
        }

        if (this.updated) {
            doc.updated = this.updated;
        }

        return doc;
    }
}
