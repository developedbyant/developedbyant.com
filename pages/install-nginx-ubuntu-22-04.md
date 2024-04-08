---
title: How To Install Nginx on Ubuntu 22.04
description: Learn how to install Nginx on a Ubuntu server version 22.04 step by step.
image: https://kinsta.com/wp-content/uploads/2018/03/what-is-nginx-1024x512.png
layout: Posts
---
# How to solve REMOTE HOST IDENTIFICATION HAS CHANGED.
This tutorial provides step-by-step instructions for installing Nginx on a Ubuntu 22.04 system, guiding users through the process of setting up the popular web server software on their Ubuntu-based environment.

## Step 1
Update apt
```bash
sudo apt update
sudo apt install nginx
```

## Step 2
Adjusting the firewall
```bash
systemctl status nginx
```
```bash
service nginx status
```
```text
Output
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Sun 2024-04-07 21:18:17 UTC; 4min 27s ago
       Docs: man:nginx(8)
    Process: 1829 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
    Process: 1830 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
   Main PID: 1934 (nginx)
      Tasks: 3 (limit: 2323)
     Memory: 5.4M
        CPU: 32ms
     CGroup: /system.slice/nginx.service
             ├─1934 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             ├─1937 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""
             └─1938 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""
```

## Check your IP to make sure Nginx is running
```bash
curl -4 icanhazip.com
```

To stop nginx:
```bash
sudo systemctl stop nginx
```

To start the web server when it is stopped, type:

sudo systemctl start nginx
To stop and then start the service again, type:

sudo systemctl restart nginx
If you are only making configuration changes, Nginx can often reload without dropping connections. To do this, type:

sudo systemctl reload nginx
By default, Nginx is configured to start automatically when the server boots. If this is not what you want, you can disable this behavior by typing:

sudo systemctl disable nginx
To re-enable the service to start up at boot, you can type:

sudo systemctl enable nginx

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04 