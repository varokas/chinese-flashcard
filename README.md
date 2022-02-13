# Chinese Flashcard

## Gen
```
$ python xml_to_json.py chinese1.opml
$ python xml_to_json.py chinese1.opml > static/chinese1.json 
```

## Dist
```
$ rm -rf docs
$ npx parcel build src/index.html --public-url ./ --dist-dir docs
```