
const config = {
    test: {
        keyModule: true,
        serviceModule: true,
        relationshipModule: true
    },
    did: {
        alice: "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
        bob: "did:baa:0335f47981b5524ec7e441392961e383ec2cf2381c12fb0119a6782a00387868"
    },
    keyMaterial: {
        ed25519: {
            id: "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkkEbExPQJaMZvcTb2iQtndziQ1TGyriemuAF54F1aV5nx",
            type: "Ed25519VerificationKey2018",
            controller: "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
            publicKeyBase58: "6nLCN99sEp5TVxkL2qvwnuAQBt18SqQRD9L9Dy3ZZs1a",
            privateKeyBase58: "3xJMukaz9J38sdbYXmnrReipPNL4GFZFNBB3XXzhUeHtwi8n1vg5MNFVprJmVB6z7CHYM351UDijp6bhyBWaSVDi"
        },
        rsa: {
            id: "did:baa:0335f47981b5524ec7e441392961e383ec2cf2381c12fb0119a6782a00387868#zAHd7SdP9AP7MuPhWfSmjo4jfRukjTJofEzqkFGh7v6otASTM",
            type: "RsaVerificationKey2018",
            controller: "did:baa:0335f47981b5524ec7e441392961e383ec2cf2381c12fb0119a6782a00387868",
            publicKeyPem: "-----BEGIN PUBLIC KEY-----\r\n" +
                "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApzeWuQzrxX/Ck6xLKwZ9\r\n" +
                "gGY70qlP+ouDaVoUT3ppD5UyoXetD8JhRLU506dv9J2exPZh6rtYYizpQ3U9hgH+\r\n" +
                "/HT1yVrWVbkZu+CB64w4SLlkMRchd4DsaePmRy0UiCP8L52oAPWPVaRBt5DiW+SZ\r\n" +
                "mgLqtGRRq2sjj8u9lqWHBLI28aKsNzTqibDDE+MFyxN8ynLGUD8L36akTqnyfvUq\r\n" +
                "MIZJ3cmltNR6fMnmOQcO3fOvZFeCskLmJx+Z0gpWIVlNHI6bwLThNZrOExLa/A9b\r\n" +
                "qU2XmDZQlE8VU8B8c2ditQtvvDFKN2fOVOmyPRSonxV3IyEuLbjkbO8SdzU4XCrD\r\n" +
                "HwIDAQAB\r\n" +
                "-----END PUBLIC KEY-----\r\n",
            privateKeyPem: "-----BEGIN RSA PRIVATE KEY-----\r\n" +
                "MIIEpAIBAAKCAQEApzeWuQzrxX/Ck6xLKwZ9gGY70qlP+ouDaVoUT3ppD5UyoXet\r\n" +
                "D8JhRLU506dv9J2exPZh6rtYYizpQ3U9hgH+/HT1yVrWVbkZu+CB64w4SLlkMRch\r\n" +
                "d4DsaePmRy0UiCP8L52oAPWPVaRBt5DiW+SZmgLqtGRRq2sjj8u9lqWHBLI28aKs\r\n" +
                "NzTqibDDE+MFyxN8ynLGUD8L36akTqnyfvUqMIZJ3cmltNR6fMnmOQcO3fOvZFeC\r\n" +
                "skLmJx+Z0gpWIVlNHI6bwLThNZrOExLa/A9bqU2XmDZQlE8VU8B8c2ditQtvvDFK\r\n" +
                "N2fOVOmyPRSonxV3IyEuLbjkbO8SdzU4XCrDHwIDAQABAoIBABA8MnMXEREk3WRv\r\n" +
                "FwE/aRH9WxOSAsTlpMWmzFAHJ4ouxzKsJu5fxgfgvJOTLyiF4TNoZItg0yz9BUza\r\n" +
                "ZjXLndEvHeoF2seJ6Di4jIStIY3WCidGAqbSqqGBUgtZEiRBsiuBWB13ugnrn8HN\r\n" +
                "3FxlrpAodlc7Yj6NcW91rZuhyKEo8EVZX1yR4FkN/220MMaGkbHfvj7gh9PF/6PN\r\n" +
                "0xfbIBaIDtzwjZR8OIuhpI1sWAbp2Y+c9fm1HF3FjNbGXjH1EmHC38EmojWtpzg1\r\n" +
                "mD8kZyDReEXip+mhLDD9cFsz7UP57QhTDhL+vJZ7Cru3+Bcgms2FNfWt41W8ql+j\r\n" +
                "v9Qz3JkCgYEA0B7vFVyELvk7MNaXJcufaCGNQLWf33UZ4xFcddLsap4BI8uIZvMz\r\n" +
                "iiqE+KrtPnuwXlhhWFiY2DLtvT3A4m1ggENtHl04Kgp3G3fh+4iuC7pENXmF4roT\r\n" +
                "Z+q+CPOFn4mN2LWur2tKK1i1xdl01qp7f88FKV60SAXsJDr2vKqEDQUCgYEAza+s\r\n" +
                "W+pztADa8B00wx9NxTkIRy2kA2gu4CVixjCXfu6v5mxmPPwN7XiF2yA606ws2QOn\r\n" +
                "Fa8dZfzO0xyL4I8wRG0Yk+Cs5k7+APweY0NlkOaGBSsVa8oEFUjCBlzoivgGgEiw\r\n" +
                "dCwJsrUWJIX0ZZCivVktnxCab8JhMO2+zmoCaNMCgYEAvl2tPxLS7cyXMcL3mmC4\r\n" +
                "vJ0EAU6gn9sTBLoaosN98L/6Nu2zJMgMOrNN0c83FtI4rvOUhyTzGb7r6w+TYQm/\r\n" +
                "HVOPehi2iO3tqLhtgpCw8pU8UtWHe63Mll8H2FQ3w4gksTbuRBKVUzTff8u6rahf\r\n" +
                "Mrb/96liqgaQy0sL6eLmyqkCgYAmHeUSD4urkvD/yFnLwxRVdTE8h4+6dech8Kuy\r\n" +
                "ULTyd+cvC22S5Z7rIAemSP291k1lVhDzqsUG7mehpcuiLMbkF1eTp/JCp+bYZeB3\r\n" +
                "wriitqWldYt9sy04iIg0R6lsf3Qs98uDa9nMPVTCJfTZkYknD8ytipUkGuCKAbT3\r\n" +
                "aZvSswKBgQCqrLkVdCk6lCpyAFITiAGbGee6K6SjGZd/a1hqzRZg39TShRxI1Qpz\r\n" +
                "67Rgevg/hKZl0/FxtMlzBXaINIX1qPj9FjaXoAUlZS0+zPzG9uNiJWa9MiLvpV9Z\r\n" +
                "qAqgD6EwMLzc8N34gw4pbUf0E3ICvbS+hTh7hMcA6ZsiH+ZRpEmkmA==\r\n" +
                "-----END RSA PRIVATE KEY-----\r\n"
        }
    },
    didDocPublicKeyObject: {
        ed25519: {
            id: "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f#z6MkkEbExPQJaMZvcTb2iQtndziQ1TGyriemuAF54F1aV5nx",
            controller: "did:baa:5ca5fb0b6c59f126f674eb504b7302c69ede9cf431d01dba07809314302e565f",
            type: "Ed25519VerificationKey2018",
            publicKeyBase58: "6nLCN99sEp5TVxkL2qvwnuAQBt18SqQRD9L9Dy3ZZs1a"
        },
        rsa: {
            id: "did:baa:0335f47981b5524ec7e441392961e383ec2cf2381c12fb0119a6782a00387868#zAHd7SdP9AP7MuPhWfSmjo4jfRukjTJofEzqkFGh7v6otASTM",
            controller: "did:baa:0335f47981b5524ec7e441392961e383ec2cf2381c12fb0119a6782a00387868",
            type: "RsaVerificationKey2018",
            publicKeyPem: "-----BEGIN PUBLIC KEY-----\r\n" +
                "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApzeWuQzrxX/Ck6xLKwZ9\r\n" +
                "gGY70qlP+ouDaVoUT3ppD5UyoXetD8JhRLU506dv9J2exPZh6rtYYizpQ3U9hgH+\r\n" +
                "/HT1yVrWVbkZu+CB64w4SLlkMRchd4DsaePmRy0UiCP8L52oAPWPVaRBt5DiW+SZ\r\n" +
                "mgLqtGRRq2sjj8u9lqWHBLI28aKsNzTqibDDE+MFyxN8ynLGUD8L36akTqnyfvUq\r\n" +
                "MIZJ3cmltNR6fMnmOQcO3fOvZFeCskLmJx+Z0gpWIVlNHI6bwLThNZrOExLa/A9b\r\n" +
                "qU2XmDZQlE8VU8B8c2ditQtvvDFKN2fOVOmyPRSonxV3IyEuLbjkbO8SdzU4XCrD\r\n" +
                "HwIDAQAB\r\n" +
                "-----END PUBLIC KEY-----\r\n"
        }
    },
    service: {
        type: "TestType",
        endpoint: "http://test/end/point"
    }

};


export default config;