#!/bin/bash

SOURCE=$(mktemp)
STUB=$(mktemp)
TARGET="app/data/city.json"

curl https://raw.githubusercontent.com/oschrenk/gloomhavendb/city-events-1-to-30/src/data/events.ts -o $SOURCE

# prepare city events
TYPE="city"
echo "" > $STUB
echo -e "[\n" >> $STUB
tail -n +5 $SOURCE | head -631 | grep -v EventType >> $STUB
echo -e "\n]" >> $STUB

node transform.js "city" $STUB $TARGET

