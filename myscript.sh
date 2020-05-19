#!/bin/bash
clear

folder="diplom"
c_diplom_url="https://github.com/asosluev/diplom.git"

folder="diplom"
repo_url=$c_diplom_url
if [ -d ${folder} ]
then
  echo -e "\e[31m${folder} already exist!\e[39m"
  echo "try to update"
  cd ${folder}
  git remote update
  count=$(git rev-list HEAD...origin/master --count)
  if [ $count -gt "0" ]
  then
    echo -e "\e[31m"
    read -r -p  "Update [y/n] " answer
    echo -e "\e[39m"
    if [ "$answer" = "y" ] 
    then
      git fetch --all
      git reset --hard origin/master
    fi
  fi
  cd -
else
  echo "${folder} not exist"
  git clone $repo_url
  if [ $? -eq "0" ] 
  then
    echo -e "\e[32m${folder} repo clone is Ok!\e[39m"
  fi
fi



echo `minikube start`
#echo $kube



echo `kubectl apply -f ./diplom/k8s/yaml/`
#echo $start

echo `kubectl get svc,pods -o wide`
#echo $com
