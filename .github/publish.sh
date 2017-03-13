REMOTE=$(git config --get remote.origin.url)
VERSION=$(node -e "console.log(require('./package.json').version)")
ember build --prod;
cd dist;
git init;
git remote add origin $REMOTE;
git checkout -b gh-pages;
git add -A .;
git commit -m "v$(VERSION)";
git push origin gh-pages -f;
cd ..;

echo 'Published!'
