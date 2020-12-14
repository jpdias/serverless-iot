# Datasets Info

## [exp_3](exp_3.csv)

Run a cycle of requests and then turn off the Internet access in the middle of the cycle to observe how this will affect response times.  It will be run 99 iterations of requests and in each iteration it will be requested the execution of `func_heavy`, After request number 50, the Internet connection will be cut off, leaving the system only operational locally.

## [exp_4_1](exp_4_1.csv)

A normal run of 249 requests over a mostly-stable Internet connection.

## [exp_4_2](exp_4_2.csv)

A series of requests will be performed and after reaching to a while, the Internet connection is going to be purposedly slowed to see how the system reacts in situations of lag and slow connection. It will be run 249 iterations of requests and in each iteration it will be requested the execution of `func_heavy`. After request number 50, the Internet connection will beslowed down (28 kbps UP, 14 kbps DOWN) and the system will continue to be asked to execute the functions.