#!/bin/bash

SOURCE=$(mktemp)
STUB=$(mktemp)

curl https://raw.githubusercontent.com/oschrenk/gloomhavendb/city-events-1-to-30/src/data/events.ts -o $SOURCE

echo "Reading from SOURCE $SOURCE"

# prepare city events
echo ""
echo "Preparing CITY events"
TYPE="city"
TARGET="app/data/city.json"
echo "Writing to stub $STUB"
echo "" > $STUB
echo -e "[\n" >> $STUB
tail -n +5 $SOURCE | head -1367 | grep -v EventType >> $STUB
echo -e "\n]" >> $STUB

node transform.js "city" $STUB $TARGET

# prepare road events
STUB=$(mktemp)
echo ""
echo "Preparing ROAD events"
TYPE="road"
TARGET="app/data/road.json"
echo "" > $STUB
echo -e "[\n" >> $STUB
tail -n +1709 $SOURCE | head -938 | grep -v EventType >> $STUB
echo -e "\n]" >> $STUB

node transform.js "road" $STUB $TARGET
