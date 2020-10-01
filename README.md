[![Build Status](https://travis-ci.org/jh3y/whirl.svg?branch=master)](https://travis-ci.org/jh3y/whirl)
[![Netlify Status](https://api.netlify.com/api/v1/badges/d3e57ac0-62c4-4f24-85a8-70b6468c0245/deploy-status)](https://app.netlify.com/sites/whirl/deploys)
<!-- DROP SOME TRAVIS AND NETLIFY GOODIES HERE -->
# Whirl
## CSS loading animations with minimal effort!

[![Whirl](https://raw.github.com/jh3y/pics/master/whirl/whirl.gif)](https://raw.github.com/jh3y/pics/master/whirl/whirl.gif)

`whirl` is a curation of CSS loading animations(whirls! 😅). It started as a drop in `CSS` file to get easy animations using `:pseudo` elements. It's now a collection of loading animations to use, take inspiration from, change and do what you want with 👍

### No CSS distro?
It's inefficient. It's likely an app will only use one or two loaders. Pulling them all into an app would be overkill. Most projects use some form of bundling making it possible to import a single loader's styles.An animation lets an element gradually change from one style to another. You can change as many CSS properties you want, as many times you want.

### Usage
You've got different options here.

You can install `whirl` and import the styles you want. You get both CSS and SASS files 👍
```shell
npm i @jh3y/whirl
yarn add @jh3y/whirl
```

Alternatively, you can grab the [CSS or SASS](https://github.com/jh3y/whirl/tags) and change to your needs. There's a dynamic link in the demo. Or visit the latest versions tag branch 👍

⚠️ Be aware that if you're bundling, you'll likely have to override some styles. Be careful with conflicting classnames or animation names.

### Contributing
See [`CONTRIBUTING`](https://github.com/jh3y/whirl/blob/master/.github/CONTRIBUTING.md).

---

@jh3y 🐻 2019

