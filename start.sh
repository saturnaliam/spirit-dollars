#!/usr/bin/sh

if ! command -v deno &> /dev/null
then
    echo "deno must be installed! (https://deno.com)"
    exit 1
fi

deno task start