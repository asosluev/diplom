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

