# APIs

This is where you define your client apis. Examples of clients could include `rest`, `websocket`, `graphql`, `gRPC`, and `soap`. Development for different client apis can be done independently and live in this project together. These different api clients should be organized into sub directories. For example if your project has both a rest client and a graphql client, the structure should look like this.

```tree

.
└─ src
   └─ apis
      ├─ rest
      │  └─ ...
      └─ graphql
         └─ ...

```
