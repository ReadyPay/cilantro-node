# Cilantro Node SDK

The official Node/Typescript SDK for Cilantro, the Ready POS.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install cilantro-node.

```bash
npm i @readytopay/cilantro-node
```

## Usage

```typescript
import { Cilantro } from '@readytopay/cilantro-node';

const cilantro = new Cilantro(apiKey, apiUrl);
const items = await cilantro.getItems(locationId);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU General Public License v3.0](./LICENSE)