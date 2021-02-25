# Github scraping

Project developed for a proof of concept

## Request files

```http
GET /?user=endroca&repository=express-typeorm&concurrency=5
```

| Parameter     | Type     | Description                                                                                                                                                                        |
| :------------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user`        | `string` | **Required**, repository user                                                                                                                                                      |
| `repository`  | `string` | **Required**, repository name                                                                                                                                                      |
| `concurrency` | `number` | **Default = 1**, it is always recommended to use the concurrency number = 1, depending on the size of the repository the system may start receiving status 429 (Too Many Requests) |

By default the api uses a 300s cache system

## Responses

```javascript
{
  "ts": [
    {
      "name": "app.ts",
      "href": "/endroca/express-typeorm/blob/main/src/app.ts",
      "length": "56 lines (44 sloc)",
      "size": "1.11 KB"
    },
    ...
  ],
  ...
}
```
