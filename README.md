# did-document-ts

A library for DID Document creation.

The purpose of this module is to assist in the creation of DID documents that comply with the decentralized identifier [specification](https://www.w3.org/TR/2020/WD-did-core-20200723/).

## Table of Contents

- [did-document-ts](#did-document-ts)
  - [Table of Contents](#table-of-contents)
  - [Security](#security)
  - [Install](#install)
  - [Usage](#usage)
    - [DIDDocKey handling](#diddockey-handling)
    - [DIDDocument creation](#diddocument-creation)
  - [API](#api)
  - [Contributing](#contributing)
  - [License](#license)

## Security

The DIDDocKey module uses [Digital Bazaars](https://github.com/digitalbazaar) [crypto-ld](https://github.com/digitalbazaar/crypto-ld) library for key handling. The key material exported by DIDDocKeys `exportKeyMaterial` function is compatible to the key material exported by [LDKeyPairs](https://github.com/digitalbazaar/crypto-ld/blob/master/lib/LDKeyPair.js) `export` function. The generated keys can later be used within Digital Bazaars crypto suit.

crypto-ld is licensed under the [new BSD License (3-clause)](https://github.com/digitalbazaar/crypto-ld/blob/master/LICENSE).

## Install

```
npm install @blobaa/did-document-ts
```


## Usage

### DIDDocKey handling

````typescript
import { DIDDocKey, DIDDocKeyType } from "@blboaa/did-document-ts"


const didAlice = "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f";
const didBob = "did:baa:0335f47981b5524ec7e441392961e383ec2cf2381c12fb0119a6782a00387868";
const didCharlie = "did:baa:0335f47981b5524ec7e441392961e3839ede9cf431d01dba07809314302e565f";

const DIDDocKeyHandling = async(): Promise<void> => {

    /* generate keys */
    const keyEd25519 = new DIDDocKey({ did: didAlice });
    await keyEd25519.generate();

    const keyRsa = new DIDDocKey({
        did: didAlice,
        keyType: DIDDocKeyType.RSA,
        controller: didBob
    });
    await keyRsa.generate();


    /* export key material */
    const keyRsaMaterial = await keyRsa.exportKeyMaterial();
    const keyEd25519Material = await keyEd25519.exportKeyMaterial();
    console.log(keyEd25519Material);
    /*
    {
        id: 'did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkgYRgvUMGeGApmqGQWzCi8UucQKky6x3sPcTM6YAYTNpX',
        type: 'Ed25519VerificationKey2018',
        controller: 'did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f',
        publicKeyBase58: '36AeLE6qJigMfLRhqREsHPMcakV7h4oWhbYRGGCXYA39',
        privateKeyBase58: '31MQ1dzHVcrk8YdvipnxRm4LvXT3NhJKPDRcGCAwWZgraTikhRRRdFX9rgPpVZ2GqGJXou4Cmcgx2Ztgp91MG271'
    }
    */


    /* import key material */
    const newKeyEd25519 = new DIDDocKey({ did: "" });
    newKeyEd25519.importKeyMaterial(keyEd25519Material);

    const newKeyRsa = new DIDDocKey({
        did: "",
        keyType: DIDDocKeyType.RSA,
        controller: didCharlie
    });
    newKeyRsa.importKeyMaterial(keyRsaMaterial);


    /* publish public keys */
    const publicKeyRsa = newKeyRsa.publish();
    console.log(publicKeyRsa);
    /*
    {
        id: 'did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#zAHd7WYR2n5BQCxX4U9Xdhn2gxN4bAgtS2ArnitgTyUjXhzDa',
        type: 'RsaVerificationKey2018',
        controller: 'did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f',
        publicKeyPem: '-----BEGIN PUBLIC KEY-----\r\n' +
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA29r0GpDFx9pLaHJLlGGv\r\n' +
            'vtf7oIMsaMAnQ+IRp/pO2FUPLf4jGpbnkUCYU+rSRUTPtnsj7Nw6jC4vU/zcc5qL\r\n' +
            'PkooUWORcfmTXaKBBRrCQ+tQET1qGAhqVHPtp4kUohjOhFw3jR6vNU7WCOXxEskx\r\n' +
            '8ICiju73b6eeD3lTKvXC7X6GkojKaEZKYi1F7SQm4WrbEkintIOV+SlfM5gvAZjL\r\n' +
            'L8A0L44TXmMdW41pkKBE9IYoX+aDYbbWAfut7lKUHftqNs7yyHvrVdiA7euHigeD\r\n' +
            'KeQ4QOS9ge7Mc0JjpZwv/p6mb6szN9kJTDWYeQK6PfuUJCEfRQqVFtwFqeW+ZzoA\r\n' +
            '0wIDAQAB\r\n' +
            '-----END PUBLIC KEY-----\r\n'
    }
    */
};

DIDDocKeyHandling();
````

### DIDDocument creation

````typescript
import { DIDDocKey, DIDDocRelationship, DIDDocRelationshipType, DIDDocService, DIDDocument } from "@blboaa/did-document-ts";


const didAlice = "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f";
const didBob = "did:baa:0335f47981b5524ec7e441392961e383ec2cf2381c12fb0119a6782a00387868";

const createDIDDocument = async (): Promise<void> => {
    
    /* create or import DID Document public keys  */
    const key1 = new DIDDocKey({ did: didAlice });
    const key2 = new DIDDocKey({ did: didAlice });
    const key3 = new DIDDocKey({ did: didAlice });
    const key4 = new DIDDocKey({ did: didAlice, controller: didBob });

    await key1.generate();
    await key2.generate();
    await key3.generate();
    await key4.generate();

    const didDocPublicKey1 = key1.publish();
    const didDocPublicKey2 = key2.publish();
    const didDocPublicKey3 = key3.publish();
    const didDocPublicKey4 = key4.publish();


    /* create verification relationships (optional) */
    const authentication = new DIDDocRelationship({
        relationshipType: DIDDocRelationshipType.AUTHENTICATION,
        publicKeysAsRef: [ didDocPublicKey1, didDocPublicKey2 ], // referenced public key
        publicKeys: [ didDocPublicKey3 ] // embedded public key
    });

    const assertion = new DIDDocRelationship({
        relationshipType: DIDDocRelationshipType.ASSERTION_METHOD,
        publicKeysAsRef: [ didDocPublicKey1, didDocPublicKey1 ]
    });

    const invocation = new DIDDocRelationship({
        relationshipType: DIDDocRelationshipType.CAPABILITY_INVOCATION,
        publicKeys: [ didDocPublicKey4 ]
    });


    /* create services (optional) */
    const vcService = new DIDDocService({
        name: "vcs",
        type: "VerifiableCredentialService",
        serviceEndpoint: "https://example.com/vc/"
    });

    const myService = new DIDDocService({
        name: "mys",
        type: "MyService",
        serviceEndpoint: "https://my.domain.com/mys/",
        prop: "an additional custom property"
    });


    /* create creation and or update date (optional) */
    const creationDate = new Date().toISOString();


    /* create DID Document */
    const document = new DIDDocument({
        did: didAlice,
        contexts: [ "https://my-new.awesome-context.com/my/context" ], // additional custom contexts (optional)
        keys: [ key1, key2 ], // referenced keys
        relationships: [ authentication, assertion, invocation ],
        services: [ vcService, myService ],
        created: creationDate,
    });


    /* publish DID Document */
    console.log(JSON.stringify(document.publish(), undefined, 4));
    /*
    {
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/v1",
            "https://my-new.awesome-context.com/my/context"
        ],
        "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
        "publicKey": [
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkswMrgFNFvqZS5FqKMujZdVb4dunJGoYutaFLBTzeKEJK",
                "type": "Ed25519VerificationKey2018",
                "controller": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
                "publicKeyBase58": "EV6p617pbJ4xxkzcgLminQ34pLWSrvJZCZLQMC2dQ1Ww"
            },
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkpxDauiZnTaFtHE1c77YtLGXqzip9mVcVF23HxCP96vcr",
                "type": "Ed25519VerificationKey2018",
                "controller": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
                "publicKeyBase58": "BVxYKUKM82mRAjAuRYb3VAyrB9YJMcN8Z18N7vR8BhqU"
            }
        ],
        "authentication": [
            "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkswMrgFNFvqZS5FqKMujZdVb4dunJGoYutaFLBTzeKEJK",
            "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkpxDauiZnTaFtHE1c77YtLGXqzip9mVcVF23HxCP96vcr",
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkohiQvyqaFmvViFjbAnHyw6EHD9pLpzcPKMyA9EM5VucU",
                "type": "Ed25519VerificationKey2018",
                "controller": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
                "publicKeyBase58": "AFTNLjb8vES2bkttVDL95zgHPaYVR7N2dM4EJxP4agq6"
            }
        ],
        "assertionMethod": [
            "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkswMrgFNFvqZS5FqKMujZdVb4dunJGoYutaFLBTzeKEJK",
            "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkswMrgFNFvqZS5FqKMujZdVb4dunJGoYutaFLBTzeKEJK"
        ],
        "capabilityInvocation": [
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6Mkmrjo2RqtcjRao2rhYDVD5WLKGxaGx41Ysyrgfn8Nuo76",
                "type": "Ed25519VerificationKey2018",
                "controller": "did:baa:0335f47981b5524ec7e441392961e383ec2cf2381c12fb0119a6782a00387868",
                "publicKeyBase58": "8QUkSBbTHBw7gY1zreXNEQnKTPJRYAmCBxwkqWAMzaKi"
            }
        ],
        "service": [
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#vcs",
                "type": "VerifiableCredentialService",
                "serviceEndpoint": "https://example.com/vc/"
            },
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#mys",
                "type": "MyService",
                "serviceEndpoint": "https://my.domain.com/mys/",
                "prop": "an additional custom property"
            }
        ],
        "created": "2020-07-27T16:05:05.638Z"
    }
    */
};

createDIDDocument();
````

## API

TODO: add API section


## Contributing

PRs accepted.

If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[MIT](../LICENSE) © Attila Aldemir