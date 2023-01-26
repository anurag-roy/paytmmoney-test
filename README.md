Examples outlining usage of [PaytmMoney Stock APIs](https://developer.paytmmoney.com/) in Node.js and TypeScript.

## Requirements

- Node.js `v18.0.0+`

## Get started

Create a `env.json` by duplicating `example.env.json` and filling with your own values.

```
cp example.env.json env.json
```

Install dependencies

```
pnpm i
```

## Usage

Run login flow

> This will create a `token.json` file with the latest token data. Read and get the token from this file to make further API calls.

```
pnpm run login
```

Connect websocket and get live market depth

> Update the preferences array in `getLiveData.ts`

```
pnpm getLiveData
```

## Related

- [Get PaytmMoney security master data](https://developer.paytmmoney.com/docs/api/security-master/)
- [NSE Banned securities for the day](https://nse-banned-securities.deno.dev/)
- [Convert a CSV to an SQLite DB](https://github.com/anurag-roy/csv-to-sqlite)

## Contact

- [Twitter](https://twitter.com/anurag__roy)
- [Email](mailto:anuragroy@duck.com)

## License

[MIT © 2023 Anurag Roy](/LICENSE)
