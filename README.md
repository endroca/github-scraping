# Github scraping

By default the api uses a 300s cache system

## Request files

```http
GET /?user=endroca&repository=express-typeorm&concurrency=5
```

| Parameter     | Type     | Description                                      |
| :------------ | :------- | :----------------------------------------------- |
| `user`        | `string` | **Required**, repository user                    |
| `repository`  | `string` | **Required**, repository name                    |
| `concurrency` | `number` | **Default = 5**, number of simultaneous requests |

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
