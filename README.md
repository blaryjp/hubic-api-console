# HUBIC-API-Console
![Hubic](images/ic_launcher_hubic/web_hi_res_512.png "Hubic")
Hubic API Console is mostly based on ovh-api-console project.

- *ovh-api-console project is here: **[on GitHub](https://github.com/blaryjp/ovh-api-console).***
- *ng-ovh project is here **[on GitHub](https://github.com/blaryjp/ng-ovh).***

## Installation

Before cloning the project, make sure to have: git, node.js, grunt-cli, and bower.
For this 2 last elements, once you have node.js installed, simply run:
` npm install -g grunt-cli`

You can now install dependancies:
```shell
npm install
```

And finally add your API AK, AS, and Base Path into `app.js`:
```
OvhProvider.setAppKey('INSERT_AK_HERE');
OvhProvider.setAppSecret('INSERT_AS_HERE');
OvhProvider.setBaseUrl('INSERT_URL_HERE');
```
Set the Redirection URI in `ng-hubic.js` file:
```
var redirect_uri = window.encodeURIComponent('');
```

## Development

### For cleaning the dist folder, before building your project:
```
grunt clear
```
### For watching and running the server, simply launch from the root folder:
```
grunt serve
```
### For building the project, simply run:
```
grunt
```
Builded development files are generated into the `dist` folder.

## Compile / Release

Just execute: `grunt`. It will create a `dist` folder with all production files.

Then, copy all the files in this folder to your production server!

You can expose this folder with Apache or Nginx, but you can also simply launch `grunt serve`!

Another approach is to use a Dockerfile, with following configuration:
```
FROM nginx

COPY dist usr/share/nginx/html
```

Then create an image out of this:
```
docker build -t <image-name> .
```
And, then run the container, while publishing to the redirection port(3000, for example):
```
docker run --name <container-name> -p 3000:80 -d <image-name>
```

## Contributing

Please send me pull requests!
