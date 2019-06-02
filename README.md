`greys-anatomy-lorem-ipsum-generator` is a website that generates lorem ipsum text inspired by [Grey's Anatomy](https://greysanatomy.fandom.com/wiki/Grey%27s_Anatomy_Universe_Wiki) and medical terms. Lorem ipsum is nonsense text that can be used as place holder copy in designs. Additional terms can be added in the [`/lambda/words.js`](https://github.com/M0nica/greys-anatomy-lorem-ipsum-generator/blob/master/src/lambda/words.js) file 


![screenshot of lorem ipsum generator](https://github.com/M0nica/greys-anatomy-lorem-ipsum-generator/blob/master/public/lorem-ipsum-generator-screenshot.png?raw=true)


This project is based on latest versions of [Create React App v3](https://github.com/facebookincubator/create-react-app) and [netlify-lambda v1](https://github.com/netlify/netlify-lambda).

The main addition to base Create-React-App is a new folder: `src/lambda`. Each JavaScript file in there will be built for Lambda function deployment in `/built-lambda`, specified in [`netlify.toml`](https://www.netlify.com/docs/netlify-toml-reference/).


## Local Development

Before developing, clone the repository and run `yarn` from the root of the repo to install all dependencies.

### Start each server individually

**Run the functions dev server**

From inside the project folder, run:

```
yarn start:lambda
```

This will open a local server running at `http://localhost:9000` serving your Lambda functions, updating as you make changes in the `src/lambda` folder.

You can then access your functions directly at `http://localhost:9000/{function_name}`, but to access them with the app, you'll need to start the app dev server. Under the hood, this uses `react-scripts`' [advanced proxy feature](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually) with the `setupProxy.js` file.

**Run the app dev server**

While the functions server is still running, open a new terminal tab and run:

```
yarn start:app
```

This will start the normal create-react-app dev server and open your app at `http://localhost:3000`.

Local in-app requests to the relative path `/.netlify/functions/*` will automatically be proxied to the local functions dev server.

> Note: You can also use [npm-run-all](https://github.com/mysticatea/npm-run-all#readme) to run the functions dev server and app dev server concurrently. Note that you don't need this if you use [`netlify dev`](https://github.com/netlify/netlify-dev-plugin/) as [function builder detection](https://www.netlify.com/blog/2019/04/24/zero-config-yet-technology-agnostic-how-netlify-dev-detectors-work/) does that for you.

## Service Worker

The service worker does not work with lambda functions out of the box. It prevents calling the function and returns the app itself instead ([Read more](https://github.com/facebook/create-react-app/issues/2237#issuecomment-302693219)). To solve this you have to eject and enhance the service worker configuration in the webpack config. Whitelist the path of your lambda function and you are good to go.
