# did-document-ts

A module for DID document creation.

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

const createDIDDocument = async (): Promise<void> => {

    /* generate or import keys */
    const key1 = new DIDDocKey({ did: didAlice });
    const key2 = new DIDDocKey({ did: didAlice });
    const key3 = new DIDDocKey({ did: didAlice });
    const key4 = new DIDDocKey({ did: didAlice });

    await key1.generate();
    await key2.generate();
    await key3.generate();
    await key4.generate();


    /* create verification relationships (optional) */
    const authentication = new DIDDocRelationship({
        relationshipType: DIDDocRelationshipType.AUTHENTICATION,
        keyIds: [ key1, key2 ], // use key as reference
        keys: [ key3 ]          // embed key
    });

    const assertion = new DIDDocRelationship({
        relationshipType: DIDDocRelationshipType.ASSERTION_METHOD,
        keyIds: [ key1, key2 ],
        keys: [ key4 ]
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
        keys: [ key1, key2 ], // referenced keys (optional)
        relationships: [ authentication, assertion ],
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
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkfUks9qgHvKW9Bbx3VeA35bGKdCgKc8YMjAyDFn44DJst",
                "type": "Ed25519VerificationKey2018",
                "controller": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
                "publicKeyBase58": "22VpZbRran1g577Lp5CCEViKodQUCFJ13A4HRW63J66W"
            },
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6Mkm5HUnL98Luft2MDragr4wi31Ns15DMa6bZMseKf4PUd4",
                "type": "Ed25519VerificationKey2018",
                "controller": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
                "publicKeyBase58": "7d2SC5th1NBQurP9u7tE6cV1ZHjDoUKjuYSwp3h3UFqg"
            }
        ],
        "authentication": [
            "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkfUks9qgHvKW9Bbx3VeA35bGKdCgKc8YMjAyDFn44DJst",
            "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6Mkm5HUnL98Luft2MDragr4wi31Ns15DMa6bZMseKf4PUd4",
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MknfvdzQPWkeYBcnP3Rd2kWqbRzzDyerRQPsEByM84rWjd",
                "type": "Ed25519VerificationKey2018",
                "controller": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
                "publicKeyBase58": "9DfbQA95R73iWHYLk44ufk3SBQx8EyB3hrKG95A3wHxF"
            }
        ],
        "assertionMethod": [
            "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkfUks9qgHvKW9Bbx3VeA35bGKdCgKc8YMjAyDFn44DJst",
            "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6Mkm5HUnL98Luft2MDragr4wi31Ns15DMa6bZMseKf4PUd4",
            {
                "id": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6Mkmk1YzxweaXMWu7fvPqrApgz774krZdv2ndg822j2dZ6u",
                "type": "Ed25519VerificationKey2018",
                "controller": "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
                "publicKeyBase58": "8HkWQihDEys3ncqDiGtKybS7HVV19kfg6cmCBkm1iLKX"
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
        "created": "2020-07-27T14:39:02.891Z"
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