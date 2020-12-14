# Serverless architectural design for IoT systems

[![DOI](https://zenodo.org/badge/doi/10.1109/EUC.2018.00008.svg)](http://dx.doi.org/10.1109/EUC.2018.00008)

## Abstract 

The IoT area has grown significantly in the last few years and is expected to reach a gigantic amount of 50 billion devices by 2020. The appearance of serverless architectures, specifically highlighting FaaS, raises the question of the suitability of using them in IoT environments. Combining IoT with a serverless architectural design can effective when trying to make use of local processing power that exists in a local network of IoT devices and creating a fog layer that leverages computational capabilities that are closer to the end-user. In this approach, which is placed between the device and the serverless function, when a device requests for the execution of a serverless function will decide based on previous metrics of execution if the serverless function should be executed locally, in the fog layer of a local network of IoT devices, or if it should be executed remotely, in one of the available cloud servers. Therefore, this approach allows dynamically allocating functions to the most suitable layer.

## Prerequisites
1. Install Docker CE for Ubuntu [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
2. Install Docker CE for Raspbian [here](https://withblue.ink/2017/12/31/yes-you-can-run-docker-on-raspbian.html)
2. Install faas-cli. Instructions [here](https://github.com/openfaas/faas-cli#get-started-install-the-cli)
3. Python3 installed with the yml module (this is used to create the configuration files)

## Basic Instalation 

1. Template for `my_rig_config.json`

``` json
{
    "name": "pi001",
    "maxCapacity": 1001,
    "thing": true,
    "localUrl": "http://192.168.78.1",
    "localPort": 8080,

    "serverUrl": "http://192.168.78.130",
    "serverPort": "8080",
    "prometheusPort":9090,
    "write_timeout": 10,
    "read_timeout": 10,
    "mongo": "openfaas-db-mongodb"

}
```
2. Clone the openfaas repository
``` sh
$ git clone https://github.com/openfaas/faas && \
  cd faas && \
  git checkout 0.7.7 && \
  cd ..
```
2. Initiate a docker swarm. In some cases, the flag _--advertise-addr_ might be needed to specify the advertised address.
``` 
$ sudo docker swarm init
```

3. Deploy faas and remove unnecessary functions that come preinstalled.
``` 
$ sudo ./deploy_faas.sh
```

4. Continue instalation process process for [IoT swarm](#inst_swarm_local) or [Cloud swarm](#inst_swarm_cloud)

### <a name="inst_swarm_local"></a> (Cont.) Instalation for local swarm (IoT)

1. Create a mongodb Docker Service
``` 
$ docker service create --network=func_functions --name openfaas-db-mongodb --publish 27017:27017 mongo mongod
```
2. Create configuration files 
``` 
$ python3 create_my_functions.py sample-functions/stack.yml
```
3. Deploy my functions.

``` 
$ sudo ./deploy_my_functions.sh
```

### <a name="inst_swarm_cloud"></a> (Cont.) Instalation in the cloud swarm (Server)
1. Create configuration files 
``` 
$ python3 create_my_functions.py sample-functions/stack.yml
```
2. Deploy my functions.

``` 
$ sudo ./deploy_my_functions.sh --server
```

## Citing this work

If you find this code useful in your research, please consider citing:

    @inproceedings{PintoEUC18,
        title        = {Dynamic Allocation of Serverless Functions in IoT Environments},
        author       = {D. {Pinto} and Jo{\~a}o Pedro {Dias} and Hugo {Sereno Ferreira}},
        year         = 2018,
        month        = oct,
        booktitle    = {2018 IEEE 16th International Conference on Embedded and Ubiquitous Computing (EUC)},
        pages        = {1--8},
        doi          = {10.1109/EUC.2018.00008}
    }
