/* eslint-disable max-classes-per-file */
import Document from "./modules/document/Document";
import CryptoLdKey from "./modules/key/CryptoLdKey";
import VerificationRelationship from "./modules/relationship/VerificationRelationship";
import Service from "./modules/service/Service";

export * from "./types";

export class DIDDocKey extends CryptoLdKey {}
export class DIDDocVerificationRelationship extends VerificationRelationship {}
export class DIDDocService extends Service {}
export class DIDDocument extends Document {}