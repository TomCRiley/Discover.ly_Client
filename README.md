# README

## Overview

The code in this client folder is our frontend. It's a program that runs independently of our express server, but relies on our express server to work (as our express app is our API).

It has a separate package.json, and we can use `npm run serve` to run the frontend (and so now we'll have mongodb, express, AND webpack dev server, all running in separate windows!)

## Differences

There are a few key differences in this frontend app.

- Webpack dev server is configured to run on port 8001, so it does not conflict with express
- Webpack dev server is configured as a proxy server (the proxy part of the config), in order for us to talk to our express API
- Because it's set up as a proxy, when writing our routes, we DO NOT include the host part. So to get all of our pokemon, instead of the path: 'localhost:8000/api/pokemon' with axios, we'd just do: '/api/pokemon'
- Both express and mongodb must be running for this to work, as they are now dependencies of this project!