APP_NAME := $(shell node -e "pkg = require('./package'); console.log(pkg.name)")
APP_VERSION := $(shell node -e "pkg = require('./package'); console.log('v%s', pkg.version)")

DOCKER_IMAGE_TAG := ${APP_NAME}:${APP_VERSION}

BUILD_TIME := $(shell date -u +"%FT%TZ")
BUILD_COMMIT := $(shell git rev-parse HEAD)

.PHONEY: image
image:
	docker build \
	--build-arg BUILD_TIME=${BUILD_TIME} \
	--build-arg BUILD_COMMIT=${BUILD_COMMIT} \
	-t ${DOCKER_IMAGE_TAG} .
