#!/bin/bash
# Make sure your meteor is running: meteor run
# To get ur host and port run `meteor mongo` on another window
# Set the vars below

set -e

export PATH="$PATH:/usr/local/bin"

# Set this vars
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
