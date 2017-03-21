Brooker CG
==========

This is a node.js based graphics engine for video livestreams, intended for use by Smoke TV at the University of Westminster.

The application consists of a dashboard where particular graphics can be customised and triggered, plus a rendered output document of fixed size (1920x1080px).

The output document can be integrated into popular webcast encoders like Wirecast and Open Broadcast Software.

Available graphics bundles include:

* Tickers
* Scoreboards
* Scene transition graphics
* Bugs with rotating logos and clocks

To run, install node.js, run "npm install" then run "node server" from the project directory. The admin panel will be accessible from localhost:3000 by default.

By default, the controller is totally unsecured, so should only be run on a single machine or private network.

Uses socket.io and Express.
