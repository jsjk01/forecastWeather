#!/bin/sh

echo "Conten-type:text/html;Cache-Control:no-cache;charset=utf-8\\n\\r\\n\\r"
city=`echo $QUERY_STRING  |awk -F '[=]' '{print $2}'`

./weather $city
# echo '{"date":"2020年7月28日", "temperature":"30度", "weather":"天气不错!", "direct":"西北风"}'
