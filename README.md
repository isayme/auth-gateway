# Auth Gateway
A service that will handle auth issues.

[![Build Status](https://travis-ci.org/isayme/auth-gateway.svg?branch=master)](https://travis-ci.org/isayme/auth-gateway)
[![Coverage Status](https://coveralls.io/repos/github/isayme/auth-gateway/badge.svg?branch=master)](https://coveralls.io/github/isayme/auth-gateway?branch=master)

## Usage
![arch](./doc/usage.png)

### Nginx Config Example
```
    location / {
        proxy_pass http://auth-gateway;
    }

    location @accel {
        internal;

        set $XViewerID $upstream_http_x_internal_viewerid;
        proxy_set_header X-Internal-ViewerID $XViewerID;

        proxy_pass https://httpbin.org;
    }
```
