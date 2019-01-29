# WIP IPFS API

## Setup
1. Clone this repository
```
git clone <>
```

2. Run setup script
```
./setup.sh
```


3. Call API
Send a GET request to
```
ec2-13-57-237-34.us-west-1.compute.amazonaws.com:3000/id
```

Get the following response
```
{
    "id": "QmT8aj9j1GhsBnqzdutJsvEK5nWiwhcTS9bNELnUj8o8EC",
    "publicKey": "CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDRc5bAyRwfeXeNmavB3iDvqs20aTkGlZQBJB/qna2Ng8cHOTIHIp2Ij6tbKg8lPNs4u7yzrr0C6m1BeQZUqXvp2hbEPpwAnnkicnbHMzwpkQmXd+AfAwwXKFonwzbgZsJzoRiFIr1tiDfZli0YOofmrgl5NiAAxgrvyUiWEICcALWNC5xEr96hFiuSyqPqR0Vrg4K2G4/yp16iOVUdrneKDyOK8HIV+ebh7g0emAfuDzBTYbp89d9uc1uRnBJIvjDqTAoZZO2/cG2gU1jYKCWArL/leZf7iXqEK4YXNaFbsdBoWC1pt2UYVFJuKdNqP2Vu8CMLo+BuP02vCRzmIQdJAgMBAAE=",
    "addresses": [
        "/ip6/::1/tcp/4001/ipfs/QmT8aj9j1GhsBnqzdutJsvEK5nWiwhcTS9bNELnUj8o8EC",
        "/ip4/127.0.0.1/tcp/4001/ipfs/QmT8aj9j1GhsBnqzdutJsvEK5nWiwhcTS9bNELnUj8o8EC",
        "/ip4/13.57.237.34/tcp/4001/ipfs/QmT8aj9j1GhsBnqzdutJsvEK5nWiwhcTS9bNELnUj8o8EC"
    ],
    "agentVersion": "go-ipfs/0.4.15/",
    "protocolVersion": "ipfs/0.1.0"
}
```
