Radys strips all the clutter from website that contain recipes, and presents them to you in a clean view optimized for use in the kitchen. No more scrolling back up to see how many spoons of sugar you needed to add to that cake recipe.

## Quick start

Clone this repository to your locale machine.

```bash
# Install dependencies
yarn

# Run a local development server
yarn run
```

You will also need to run [Radys API](https://github.com/mattijsbliek/radys-api) to actually be able to convert recipes.

## Running in production

Follow these steps for running your own version of Radys in production:

**1. Deploy Radys API**

Make sure you have your own copy of [Radys API](https://github.com/mattijsbliek/radys-api) running, and copy the URL.

**2. Set the environment variables**

Copy `.env.example` to `.env` and set `RADYS_API_URL` to your production instance of Radys API.

**3. Create a production build**

```bash
yarn build
```

**4. Upload the build directory**

You can upload the `build` folder to a server of your choosing.
