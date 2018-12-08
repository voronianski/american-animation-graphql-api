# american-animation-graphql-api

<a href="https://www.buymeacoffee.com/voronianski" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" height="20" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

> ["Golden Age of American Animation" (1928 - 1970)](https://en.wikipedia.org/wiki/Golden_age_of_American_animation) as GraphQL API.

## What's inside?

- [express](https://github.com/expressjs/express)
- [graphql](https://github.com/graphql/graphql-js)
- [apollo-server](https://github.com/apollographql/apollo-server)
- [lowdb](https://github.com/typicode/lowdb)

## Data sources

The main resources that were used to make this API work:

- [Big Cartoon Database](https://www.bcdb.com)
- ["Golden Age of American Animation" on Wiki](https://en.wikipedia.org/wiki/Golden_age_of_American_animation)
- [List of animation studios on Wiki](https://en.wikipedia.org/wiki/List_of_animation_studios)
- ["The 50 Greatest Cartoons: As Selected by 1,000 Animation Professionals" (1994 book by animation historian Jerry Beck)](https://en.wikipedia.org/wiki/The_50_Greatest_Cartoons)
  - [List on Mubi](https://mubi.com/lists/the-50-greatest-cartoons-as-selected-by-1000-animation-professionals)

### Contributing

If you see some discrepancies in data or you want to extend it, please edit `.yml` files in [data folder](https://github.com/voronianski/american-animation-graphql-api/tree/master/data) and make pull requests.

### What's missing?

For now only cartoon characters and studios that produced them are present. In longer term it would be also great to include animators that worked on the characters as well as distributors. If you've made some research and have some valid data, please consider [contributing](https://github.com/voronianski/american-animation-graphql-api#contributing).

## Development

```bash
npm i
npm run dev
```

---

**MIT Licensed**
