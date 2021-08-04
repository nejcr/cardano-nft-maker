<h1 align="center">Welcome to cardano-nft-maker 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/NejcRavnik" target="_blank">
    <img alt="Twitter: NejcRavnik" src="https://img.shields.io/twitter/follow/NejcRavnik.svg?style=social" />
  </a>
</p>

> A cardano-nft maker for my diploma thesis

## Requirements

The application requires [docker](https://www.docker.com/products)
and [docker-compose](https://docs.docker.com/compose/install/) utility. It is also recommended that you run it from
Linux or under WSL2 if you are on Windows.

## Development

For development, you can use the following script which setups cardano-node and opens up a shell with a backend server.
It might take some time at first , because the whole chain needs to sync

```sh
chmod +x ./run_backend_dev_environment.sh
./run_backend_dev_environment.sh
```

## Running

To run the entire app altogether first copy all the private keys from the specific environment to the appropriate file
in [keys](keys) directory, then run the following script.

```sh
chmod +x ./run_backend_dev_environment.sh
./run_solution.sh
```

## Example
[Click to play](https://www.youtube.com/watch?v=q7dAYnd6LXc)

[![Cardano nft maker demonstration](https://img.youtube.com/vi/q7dAYnd6LXc/0.jpg)](https://www.youtube.com/watch?v=q7dAYnd6LXc)

## Author

👤 **Nejc Ravnik**

* Website: ravnik.org
* Twitter: [@NejcRavnik](https://twitter.com/NejcRavnik)
* Github: [@nejcr](https://github.com/nejcr)
* LinkedIn: [Nejc Ravnik](https://linkedin.com/in/nejc-ravnik-92574088)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
