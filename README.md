<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/simmontali/acasaafarecosa">
    <img src="src/res/house.png" alt="Logo" width="130" height="130">
  </a>
  <h1 align="center">A casa a fare cosa?</h1>

  <p align="center">
    Fuck boredom.
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [How it works](#how-it-works)
- [Getting Started](#getting-started)
  - [Updates](#updates)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot][screenshot]

**A casa a fare cosa** was born during Italy's COVID19 lockdown. I wanted to provide a way of discovering new things to do while staying safe at home. Boredom is what threatens the lockdown the most.

### How it works

**A casa a fare cosa** was initiated using `create-react-app`. It features a single page web app with the tips, and a form for suggestions. The data is fetched through a serverless API, deployed on Zeit Now (you can find the ultra simple API in the `api` folder). The data is stored on Google Firebase in a NoSQL database.

### Public API

I don't know how you could use this, but you can use the public API by making requests to `/api/dbtip/` to get a random tip in JSON, and `/api/suggest` to make a new suggestion.

<!-- GETTING STARTED -->

## Getting Started

You can just clone this repository, install the requirements by running

```
$ npm install
```

and then start the project.
To actually have it fetch data you've got to define an ENV variable `GOOGLE_JSON` containing the base64 encoding of your Firebase credential JSON. This was made to be able to store the credentials in a Zeit Now secret.

### Updates

Pull this repository for updates.

<!-- USAGE EXAMPLES -->

## Usage

To view the website in your browser just run

```
 $ npm start
```

To create a production build, run

```
$ npm run build
```

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the GPL License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

[Simone Montali](https://monta.li)
[WEBased](https://webased.it)

Project Link: [https://github.com/simmontali/acasaafarecosa](https://github.com/simmontali/acasaafarecosa)

[screenshot]: src/res/screencap.gif "Screenshot"
