# `ic-sqlite-chat`

**Work in progress**

This project is a work in progress to test a design pattern for the Internet Computer (ICP).

The project is a simple CRUD application that allows the user to create, read, update and delete records in a database. The database is stored in an Sqlite database on the user's device, with a replica stored on the ICP.

Live demo: https://vicki-naaaa-aaaal-qjgma-cai.icp0.io/

The project adopts a "local first" approach, where the frontend application primarily interacts with the local replica of an Sqlite database. On startup, the frontend fetches the full database from the canister. For small personal application, this is sufficient. For larger databases, the application would fetch the full database once on first start (install) and then periodically sync the local database with the main database. This sync is just partially implemented at the moment.

Once the database is installed, the frontend application can perform all read only queries against the local database. This approach means response times are very fast, and the application can be used offline.

Write operations are performed against the canister in the usual manner, with the changes being propagated to the local database.

## Run the project

Terminal 1:
```bash
dfx start --clean
```

Terminal 2:
```bash
make deploy-all
```
