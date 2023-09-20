# Blockchain Admin Client
**Last Updated:** 7/8/23

This is the admin panel for front-end client for the blockchain project.

### Objective
This front-end serves as the client for the blockchain project.

### Details
This client will serve as the admin panel for this project.

**Update dependencies**
```shell
yarn install
```

**Build and Compile Local**
```shell
yarn dev
```

**Run Unit Tests**
```shell
yarn vitetest
```

The admin client has the following functionality:

- Perform Readiness Check
- Fetch Blockchain from API
- Verify Blockchain Integrity

There are 2 main components to this web client.  One is blockchain admin facing, which provides metrics on the health of 
the blockchain.  The other is user facing, which provides a CRUD interface for tracking transactions and transaction 
life-cycles.

There are 2 main components to this web client.  One is blockchain admin facing, which provides metrics on the health of 
the blockchain.  The other is user facing, which provides a CRUD interface for tracking transactions and transaction 
life-cycles.

### Summary
The aim of this client is to provide an admin panel for the blockchain project.

### Related
This client is a component of the [Blockchain Project](https://github.com/hunteryavitz/blockchain-main).  It works as the back-end code to provide services to the following clients:

- [Blockchain API](https://github.com/hunteryavitz/blockchain-api)
- [Blockchain Mobile Client](https://github.com/hunteryavitz/blockchain-client-mobile)

### Extra
Feel free to download, modify, or use in any way.

Developer: [Hunter Yavitz](mailto:h.yavitz@gmail.com)
