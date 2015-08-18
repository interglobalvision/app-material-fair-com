#!/bin/bash

# This script restores meteor mongo database from a tar file with the contents from a mongodump
# Requires Mongo to be installed system wide [Meteor can run without with]. If you don't have mongorestore run `brew install mongodb`

# You might want to `meteor reset` before running this data import
# Make sure your meteor is running: meteor run

set -e

export PATH="$PATH:/usr/local/bin"

# These vars are the meteor defaults. You probably don't need to edit them
# If you need to check host and port run `meteor mongo` while meteor is running

MONGODB_HOSTING=127.0.0.1
MONGODB_PORT=3001
MONGODB_DATABASE=meteor

usage()
{
cat << EOF
usage: $0 [options]

This script restores meteor mongo database from a tar file with the contents from a mongodump.

OPTIONS:
   -h      Show this message
   -f      Tar backup file

INSTRUCTIONS:

  - Make sure your meteor app is running first.
  - You might want to "meteor reset" first.

EOF
}

while getopts "h:f:" OPTION
do
  case $OPTION in
    h)
      usage
      exit 1
      ;;
    f)
      TAR_BACKUP=$OPTARG
      ;;
  esac
done

if [[ -z $TAR_BACKUP ]]

then
  usage
  exit 1
fi

# Get the directory the script is being run from
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo $DIR

# unzip file
echo "Uncompressing $TAR_BACKUP"
mkdir $DIR/mongorestore
tar -zxvf $TAR_BACKUP -C $DIR/mongorestore

# Restore the database
mongorestore -h $MONGODB_HOSTING --port $MONGODB_PORT -d $MONGODB_DATABASE $DIR/mongorestore/*

# Remove backup files
rm -rf $DIR/mongorestore
