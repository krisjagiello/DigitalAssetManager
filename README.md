# System for provenance and rights management
## Introduction and Motivation
Rights management begins with establishing of ownership. A person who registered a trademark, a copyright is presumed to be the rightful creator. Unfortunately, legal process is rather involving. Being able to establish provenance of created works quickly and easily would provide a very strong proof in asserting creator's rights.

Hence, an idea of a system which would facilitate such provenance with the use of blockchain technologies. A simple use case goes like this: a creator came up with an artifact worth protecting. The artifact can be uploaded to the system, which will fingerprint the digital art, capture creator's information and then fingerprint all together. Next, the system would call into a blockchain and mint a token containing the fingerprint. If the token resides on an established and trusted chain (Polkadot, Binance, Ethereum, Palm, etc.) proving the original access and in consequence ownership of the art is easy, and virtually unbreakable.

There are caveats to overcome. Surprisingly, Ethereum NFT standards do not protect the data provenance. Note, that NFT standard calls for storing a link to metadata on chain, the metadata itself being not protected. Unless of course it is content adressable IPFS, which is still not common. We propose to build on the idea of IPFS multihash (it is a "self describing hash") to create strong provenance records. In short, the creator after registering the asset would receive an URI in a new scheme:

```sh
prov58://QmQvLYw9apHZ24vH43wearNskdpnCBHAnAztoSVVyogdfV/QmUXwcTf8zm7UrfMBhLxt9paMfec1ZF4w9uLP5zgG5oGHk/...
```

This URI provides provenance for the registered art, also includes signature for other metadata (artist's name, information about this art piece, etc.). Furthermore, this new scheme would allow for adding encoded URIs to "traditional" metadata links which would pave the way to compatibility with NFT markets like OpenSea, should it be needed. 

  **Note: Browser extensions can be created which can understand this scheme and make the process of using the technology even easier**

## Example use
The process would require the creator to log into the system and provides the file containing data to be fingerprinted together with some metadata. The Front End would wrap it into a multi-part form and call the *register_data* in the Back End. The Back End extracts user information from the JWT token, fingerprints the file and the metadata, then returns back a JSON structure like below. Note, we have no front end for the time being, but it can be simulated with utilities like Postman.

After the system processes the data, it returns the registration record, looking like below:

```json
{
    "name": "ABC Logo1",
    "description": "First version of the logo for ABC",
    "id": 1,
    "first_name": "Bob",
    "middle_name": "F",
    "last_name": "Johnson",
    "email": "bob@jojo.com",
    "username": "bob",
    "bio": "",
    "image": "",
    "fileMultihash": "QmQvLYw9apHZ24vH43wearNskdpnCBHAnAztoSVVyogdfV",
    "recordMultihash": "QmUXwcTf8zm7UrfMBhLxt9paMfec1ZF4w9uLP5zgG5oGHk",
    "prov58Url": "prov58://QmQvLYw9apHZ24vH43wearNskdpnCBHAnAztoSVVyogdfV/QmUXwcTf8zm7UrfMBhLxt9paMfec1ZF4w9uLP5zgG5oGHk"
}
```

The prov58Url will be the URI stored onchain in the NFT.

# Contents

- `prov_backend` - web2 backend
- ` HardHat1` - skeleton Solidity code
- `EthPrivProv` - configuration for private Ethereum network

# Project Info
The goal of this exercise is to demonstrate an approach to buildig a digital asset management web2/web3 system. 
- top down design approach
- software architecture
- implementation of selected components

### Situation Before
- establishing proof of ownership/provenance for digital arts in general is challenging
- there is a high entry barrier for managing rights
- agent and or record label services are expensive

### Situation After
- all actors (creators, agents, distributors, and even labels) have one stop shop where owhership and rights can be easily proven.
- as a creator it is eary to take a creation, fingerprint it and establish provenance
- as a creator it is possible to delegate rights to agents, distributors 
- as a non-creator it is possible and not complex to prove that I have given rights to use given art, negotiate deals on behalf of a creator, etc.

### Goals
- provide a platform for establishing/transfering/storing/proving of rights to digital assets
- provide a platform for establishing/transfering/storing/proving of agreements related to rights to digital assets (provenance for DocuSign type agreements, that enter the blockchain)

### Non-Goals
- complete contract enforcement (the system shall complement the existing legal system rather than replace it),
- protecting privacy of agreements (the system is generally an "open book", however parties may decide to just operate using "fingerprints" and keep details private),
- anti-copy protection,
- talent agency functinality,
- marketing service functionality,
- not a track/album management system (while the system need to provide some functionality for browsing created arts and agreements, an organization of these in broder sense, like tracking of derivative works will not be addressed),
- computation of royalties,
- on chain payments (future enhancement),
- provide secure storage for digital assets (although this is a critically important topic, it is itself a challenge ). The sytem shall be able to allow for the upload of assets, and may provide some storage capabilities, but the overall reliability and cost is out of scope

### Contents
- Technology stack: TypeScript/NestJs/EVM/Azure
- Initial EVM support
- Compatibility with EIP721/EIP1155, etc.
- Domains: Core, Creator, Agent, Distributor, Label

### Non-contents
- Royalty support in EVM (EIP-2981 is very rudimantary, it is believed here that royalty should be a subject of negotiated contracts between parties)

### Risks
- low adoption due to users not understanding/not believing the technology
- overall scope not matching real needs of users
- adoption rate could be affected by existence of some of "non-goal" technologies


### Domains
- creator
- agent/manager interface (PUB/PRI) / web3 aspect
- distributor interface (PUB/PRI) / web3 aspect
- std end user (license to consume, non-transferable)

### Core Tech
- web2 backend (NestJs+Postgres)
- EVM marketplace (primary)
- EVM marketplace (secondary) 
- Provenance NFT
- Agreement NFT
