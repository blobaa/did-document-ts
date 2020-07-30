
/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/
export type secureAny = any; // same as any, but used when it's intended and secure
export type objectAny = {[name: string]: secureAny};


export type DIDDocKeyParams = {
    did?: string;
    keyType?: DIDDocKeyType;
    controller?: string;
}

export enum DIDDocKeyType{
    Ed25519 = "Ed25519VerificationKey2018",
    RSA = "RsaVerificationKey2018"
}

export type DIDDocKeyMaterial = {
    privateKeyBase58?: string;
    publicKeyBase58?: string;
    privateKeyPem?: string;
    publicKeyPem?: string;
    controller?: string;
    type: string;
    id?: string;
}


export type DIDDocPublicKey = {
    publicKeyBase58?: string;
    publicKeyPem?: string;
    controller: string;
    type: string;
    id: string;
}


export type DIDDocRelationshipParams = {
    relationshipType: DIDDocRelationshipType;
    publicKeysAsRef?: DIDDocPublicKey[];
    publicKeys?: DIDDocPublicKey[];
}

export enum DIDDocRelationshipType {
    AUTHENTICATION = "authentication",
    ASSERTION_METHOD = "assertionMethod",
    KEY_AGREEMENT = "keyAgreement",
    CAPABILITY_INVOCATION = "capabilityInvocation",
    CAPABILITY_DELEGATION = "capabilityDelegation"
}

export interface IDIDDocRelationship {
    publish(): DIDDocRelationshipObject;
}

export type DIDDocRelationshipObject = {
    type: string;
    array: Array<string[] | DIDDocPublicKey[]>;
}


export type DIDDocServiceParams = {
    name: string;
    type: string;
    serviceEndpoint: string;
    [name: string]: secureAny;
}

export interface IDIDDocService {
    publish(did: string): DIDDocServiceObject;
}

export type DIDDocServiceObject = {
    id: string;
    type: string;
    serviceEndpoint: string;
    [name: string]: secureAny;
}


export type DIDDocumentParams = {
    did?: string;
    contexts?: string[];
    publicKeys?: DIDDocPublicKey[];
    relationships?: IDIDDocRelationship[];
    services?: IDIDDocService[];
    created?: string;
    updated?: string;
}

export interface IDIDDocument {
    publish(): DIDDocumentObject;
}

export type DIDDocumentObject = {
    "@context": string[];
    id: string;
    created?: string;
    updated?: string;

    publicKey?: DIDDocPublicKey[];

    authentication?: Array<string[] | DIDDocPublicKey[]>;
    assertionMethod?: Array<string[] | DIDDocPublicKey[]>;
    keyAgreement?: Array<string[] | DIDDocPublicKey[]>;
    capabilityInvocation?: Array<string[] | DIDDocPublicKey[]>;
    capabilityDelegation?: Array<string[] | DIDDocPublicKey[]>;

    service?: {
        id: string;
        type: string;
        serviceEndpoint: string;
        [name: string]: secureAny;
    }[];
}