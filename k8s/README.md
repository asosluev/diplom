# nginx for k8s

Клонировать репозиторий

```
 git clone https://github.com/asosluev/diplom.git
```
Обновить репозиторий находясь в корневом каталоге

```
 git pull https://github.com/asosluev/diplom.git
```

Проверить какой кластер

```
 kubectl cluster-info
```

Установить файлы в последовательности и проверить их status

```
kubectl apply -f .\yaml\
kubectl get svc,pods -o wide
```

Проверить установку

```
kubectl get all
```

Проверить работу pods через port-forward

```
kubectl port-forward <pod_name> 8080:80
```
For instance 
```
kubectl get all 
NAME                                                 READY   STATUS    RESTARTS   AGE
pod/nginx-loadbalancer-deployment-598b7cd44c-4j8kf   1/1     Running   0          7h43m
pod/nginx-v1-deployment-667846f486-zr6fg             1/1     Running   0          7h43m
pod/nginx-v2-deployment-74d76ff5-zl44m               1/1     Running   0          7h43m

NAME                         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/kubernetes           ClusterIP      10.96.0.1       <none>        443/TCP        14h
service/nginx-loadbalancer   LoadBalancer   10.103.41.145   <pending>     80:31144/TCP   7h43m
service/nginx-v1             ClusterIP      10.98.112.160   <none>        80/TCP         7h43m
service/nginx-v2             ClusterIP      10.104.51.40    <none>        80/TCP         7h43m

NAME                                            READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx-loadbalancer-deployment   1/1     1            1           7h43m
deployment.apps/nginx-v1-deployment             1/1     1            1           7h43m
deployment.apps/nginx-v2-deployment             1/1     1            1           7h43m

NAME                                                       DESIRED   CURRENT   READY   AGE
replicaset.apps/nginx-loadbalancer-deployment-598b7cd44c   1         1         1       7h43m
replicaset.apps/nginx-v1-deployment-667846f486             1         1         1       7h43m
replicaset.apps/nginx-v2-deployment-74d76ff5               1         1         1       7h43m

NAME                                                                REFERENCE                                  TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/nginx-loadbalancer-deployment   Deployment/nginx-loadbalancer-deployment   <unknown>/50%   1         10        1          9h
horizontalpodautoscaler.autoscaling/nginx-v1-deployment             Deployment/nginx-v1-deployment             0%/1%           1         10        1          9h
horizontalpodautoscaler.autoscaling/nginx-v2-deployment             Deployment/nginx-v2-deployment             0%/1%           1         10        1          9h
```

Меню в k8s через minikube dashboard
```
 minikube dashboard
* Verifying dashboard health ...
* Launching proxy ...
* Verifying proxy health ...
* Opening http://127.0.0.1:61818/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/ in your default browser...
```

Получить доступ локально в minikube (пример)
```
minikube service nginx-loadbalancer --url
http://192.168.223.212:31144
```