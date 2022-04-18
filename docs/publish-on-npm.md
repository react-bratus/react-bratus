# Publishing on NPM

Publishing on NPM is done through `lerna`.

## Configuring Lerna & npm user

- If you haven't installed `lerna` via `npm` or `yarn`, it's the time to do it by running\
   `npm install --global lerna`. After that, you need to create a user on `npmjs`.\
   Next, you need access to `react-bratus` on `npm` that the previous owners can\
   grant you. After accepting the invitation, and when you run `lerna publish ....`\
   for the first time, after following the steps in last section npm will ask you for\
   authentication. You can now use the credentials of the user you created by using\
  `npm adduser`. Follow the instructions on the terminal for that, and check the\
  documentation online.

## Introduction

- Whenever we build our project after applying changes, a `bin` folder is generated under\
  the `bratus-cli` package, which contains the build files of the application. For\
  collaboration practices, `bin` needs to be in `.gitignore` and never pushed to the\
  `develop` branch, during the development phase.
  <br>

## Process after Development Phase

- When we finish the **Development Phase** of a task, we make a Pull Request. Automatically,\
  the task is moved to the **Code Review Phase** on GH Projects. In this stage, `bin` is still in\
   `.gitignore` and is held locally in our projects. Once the PR is approved and merged in\
   `develop`, the next steps need to be followed to publish on `npm`:

  1. Switch to `develop`.
  2. Run `git pull` to get the latest changes from origin.
  3. Once it's updated remove `bin` from gitignore.
  4. Run `yarn run build`, then `yarn install`, then `yarn run link-cli`, so\
     that the right build files will be generated.
  5. Add the release notes to the `README` files.
  6. Commit your `bin` with the updated `.gitignore` with the message: "Pushing\
     bin for npm release" and then execture `git push` to push directly to `develop`.
  7. Once it's done, you're ready to release on `npm` using `lerna`:
     - `lerna publish major`: Major release.
     - `lerna publish minor`: Minor release.
     - `lerna publish patch`: Patch release.
  8. If the initial build fails, you can recover by running the command:\
     `lerna publish from-package`.
  9. After getting a success message, you delete the `bin` folder.
  10. You add `bin` in `.gitignore` again, so that it will be there once generated.
  11. Commit your changes, which will delete the `bin` folder remotely and `git push`.
  12. `develop` is now ready for the next development phase and you can checkout to\
      your new branch.

## Useful links for this process
