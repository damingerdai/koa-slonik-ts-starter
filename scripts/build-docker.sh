#!/bin/bash

sha=$(git rev-parse --short HEAD)

docker build -t koa-slonik-ts-starter:${sha} .
