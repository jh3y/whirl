# Contributing to Whirl 💪

You're considering contributing to Whirl 🎉

## Different types of contribution

### Raising issues 🐛
Before raising a new issue, be sure to check the issue wasn't raised before. If it was and you don't feel it was resolved, open a new issue linking to the old 👍

When raising an issue, follow the issue template the best you can.

### Development setup
The Whirl demo uses `React` via `create-react-app`. Dynamic imports play a huge role in keeping the loading times minimal. Styles are subject to code splitting and are only pulled in when a user selects an animation. All whirls are created using SASS and the demo app uses Hooks 👌

To get started, fork the repo and then clone it.
```shell
git clone https://github.com/username/whirl
```
Then install dependencies with `yarn`;
```shell
yarn
```
You're good to go 🙌
```shell
yarn start
```
Run `yarn run` to see a list of available commands.

### Adding a new loading animation 👟
These are the steps for adding a new loading animation.

From the root of the cloned repo run:
```shell
cd whirl
node utils/add-whirl --name <WHIRL NAME> --required <REQUIRED ELEMENTS>
```
`WHIRL NAME` will be the display name and class name for your animation. `REQUIRED ELEMENTS` defines how many elements you want for your animation.

For example; `0` would imply you are using `:pseudo` elements. In this case, the class name will be applied to the demo container.

If you wanted a more complex structure, you pass a comma separated list of numbers. For example, `node utils/add-whirl --name awesome-whirl --required 1,2,3` would result in the following markup;
```html
<div class='awesome-whirl'>
  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```
That's one `div` at the top level, two on the next and three on the final level.

By default, your new animation will be `active` and added to the config file at `src/whirl.config.json`.
```json
{
  "className": "awesome-whirl",
  "name": "awesome-whirl",
  "requiredElements": [
    1,
    2,
    3
  ],
  "active": true
},
```
Feel free to change this file if you wish to apply a different class name or switch animations on or off 👍

Once you're ready to open a PR with your new animation, be sure to bump the version number in `package.json`. A patch bump is fine 👍

Open a PR following the PR template. Your commit message needn't be complex;

`feat: add awesome-whirl animation`

