<img src="./quicklogin-logo.svg" width="390" height="80" alt="QuickLogin">

A library for embedding QuickLogin into your website

QuickLogin.js allows you to use Heirloom's verifiable credentials to authenticate your users

## Example usage

> [!NOTE]
> Before you use the SDK, you first need to obtain an API key. To obtain an API key, you need to create a lock using [Heirloom Creator](https://creator.heirloom.io).

For the SDK to know where to embed the QuickLogin iFrame, you need to setup a `div` on your site with a `data-quicklogin` attribute

```html
<div data-quicklogin></div>
```

Next, let's link the SDK:

```
<script src="https://cdn.jsdelivr.net/gh/heirloom-io/quicklogin-js@0.1.0/dist/quicklogin.js">
```

Then, we can create an SDK instance using the `createQuickLogin` function. This function takes in an object where you pass in your API key and a callback function that will be called upon a successful QuickLogin.

```
createQuickLogin({
  apiKey: "YOUR_API_KEY"
  onQuickLoginSuccess: (authToken) => console.log(authToken)
})
```

To see a full example, click here.
