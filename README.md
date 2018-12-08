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
- ["The 50 Greatest Cartoons: As Selected by 1,000 Animation Professionals" (1994 book by Jerry Beck) on Wiki](https://en.wikipedia.org/wiki/The_50_Greatest_Cartoons)
  - [Also available as list on Mubi](https://mubi.com/lists/the-50-greatest-cartoons-as-selected-by-1000-animation-professionals)
- ["Of Mice and Magic: A History of American Animated Cartoons" (1987 book by Leonard Maltin and Jerry Beck) on Google Books](https://books.google.com/books/about/Of_Mice_and_Magic.html?id=NGkcAQAAIAAJ)

### Contributing

If you see some discrepancies in data or you want to extend it, please edit `.yml` files in [data folder](https://github.com/voronianski/american-animation-graphql-api/tree/master/data) and make pull requests.

### What's missing?

For now only cartoon characters, studios that produced them and some videos are present. In longer term it would be also great to include animators that worked on the characters as well as distributors. If you've made some research and have some valid data, please consider [contributing](https://github.com/voronianski/american-animation-graphql-api#contributing).

## Development

```bash
npm i
npm run dev
```

---

**MIT Licensed**
