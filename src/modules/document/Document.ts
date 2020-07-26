import { DIDDocPublicKeyObject, DIDDocRelationshipObject, DIDDocRelationshipType, DIDDocServiceObject, DIDDocument, DIDDocumentObject, DIDDocumentParams, IDIDDocKey, IDIDDocRelationship, IDIDDocService, IDIDDocument } from "../..";


export default class Document implements IDIDDocument {
    private did = "";
    private context = ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/v1"];
    private service: IDIDDocService[] | undefined;
    private keys: IDIDDocKey[] | undefined;
    private relationships: IDIDDocRelationship[] | undefined;
    private created: string | undefined;
    private updated: string | undefined;


    constructor(params: DIDDocumentParams) {
        this.did = params.did;
        if (params.contexts) {
            this.context = [...this.context, ... params.contexts];
        }
        this.service = params.service;
        this.keys = params.keys;
        this.relationships = params.relationships;
        this.created = params.created;
        this.updated = params.updated;
    }


    public publish(): DIDDocumentObject {
        const doc = {} as DIDDocumentObject;

        doc["@context"] = this.context;
        doc.id = this.did;

        if (this.keys) {
            const keys = [] as DIDDocPublicKeyObject[];
            this.keys.forEach(key => keys.push(key.publish()));
            doc.publicKey = keys as DIDDocPublicKeyObject[];
        }

        if (this.relationships) {
            const relationships = [] as DIDDocRelationshipObject[];
            this.relationships.forEach(relationship => relationships.push(relationship.publish()));
            relationships.forEach((relation) => {
                    doc[relation.type as DIDDocRelationshipType] = relation.array;
            });
        }

        if (this.service) {
            const services = [] as DIDDocServiceObject[];
            this.service.forEach(service => services.push(service.publish()));
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