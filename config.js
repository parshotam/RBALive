export default () => {
    if (process.env.MY_ENVIRONMENT === "development") {
        return {
            // name: myValue,
            version: "1.0.0",
            apiUrl:'https://bkadmin.in/rbauat'
            // All values in extra will be passed to your app.
            // extra: {
            //     fact: "dogs are cool"
            // }
        };
    } else {
        return {
            // name: myValue,
            version: "1.0.0",
            apiUrl:'https://bkadmin.in/rbauat'
            // All values in extra will be passed to your app.
            // extra: {
            //     fact: "kittens are cool"
            // }
        };
    }
};