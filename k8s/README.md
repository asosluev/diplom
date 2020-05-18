# nginx for k8s

Клонировать репозиторий

```
 git clone https://github.com/asosluev/diplom.git
```


Проверить какой кластер

```
 kubectl cluster-info
```

Установить файлы в последовательности

```
kubectl apply -f .\yaml\0-ns-nginx.yaml
kubectl apply -f .\yaml\1-nginx-v1.yaml
kubectl apply -f .\yaml\2-nginx-v2.yaml
```

Проверить установку

```
kubectl get all -n nginx
```

Проверить работу pods через port-forward

```
kubectl port-forward <pod_name> 8080:80 -n nginx
```
For instance 
```
kubectl get all -n nginx
NAME                                       READY   STATUS    RESTARTS   AGE
pod/nginx-v1-deployment-7689667546-vvbc7   1/1     Running   0          3m20s
pod/nginx-v2-deployment-57d5848f85-qsttk   1/1     Running   0          3m20s
kubectl port-forward pod/nginx-v1-deployment-7689667546-vvbc7 8080:80 -n nginx
kubectl port-forward pod/nginx-v2-deployment-57d5848f85-qsttk 8081:80 -n nginx
```