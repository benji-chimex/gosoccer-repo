#!/usr/bin/env sh

# abort on errors

set -e

# build

npm run build

# navigate into the buil output directory

cd dist

# if you are deploying to custom domain 

# echo "www.example.com" > CNAME    

git init

git add -A

git commit -m "deploy"

git push -f git@github:benjamin1234-ben/gosoccer-repo.git master:gh-pages

cd -