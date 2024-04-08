<script lang="ts">

    /** Copy text to clipboard (Added by kitdocs) */
    async function copyText(e:MouseEvent){
        const copyButton = e.target as HTMLButtonElement
        const code = copyButton.parentElement?.querySelector("code")?.innerText as string
        await navigator.clipboard.writeText(code)
        copyButton.innerText = "Copied"
        // Set button text back to copy after 5 milliseconds
        setTimeout(()=>copyButton.innerText = "Copy",1000)
    }
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>How To Install Nginx on Ubuntu 22.04 | DevelopedByAnt</title>
    <meta name="title" content="How To Install Nginx on Ubuntu 22.04 | DevelopedByAnt" />
    <meta name="description" content="Learn how to install Nginx on a Ubuntu server version 22.04 step by step." />
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://developedbyant.com/blog/install-nginx-ubuntu-22-04" />
    <meta property="og:title" content="How To Install Nginx on Ubuntu 22.04 | DevelopedByAnt" />
    <meta property="og:description" content="Learn how to install Nginx on a Ubuntu server version 22.04 step by step." />
    <meta property="og:image" content="https://kinsta.com/wp-content/uploads/2018/03/what-is-nginx-1024x512.png" />
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://developedbyant.com/blog/install-nginx-ubuntu-22-04" />
    <meta property="twitter:title" content="How To Install Nginx on Ubuntu 22.04 | DevelopedByAnt" />
    <meta property="twitter:description" content="Learn how to install Nginx on a Ubuntu server version 22.04 step by step." />
    <meta property="twitter:image" content="https://kinsta.com/wp-content/uploads/2018/03/what-is-nginx-1024x512.png" />
</svelte:head>
<h1 data-section data-md="header" id="how-to-solve-remote-host-identification-has-changed">
    How to solve REMOTE HOST IDENTIFICATION HAS CHANGED.
</h1>
<p data-md="p">This tutorial provides step-by-step instructions for installing Nginx on a Ubuntu 22.04 system, guiding users through the process of setting up the popular web server software on their Ubuntu-based environment.</p>
<div data-md="space"></div>
<h2 data-section data-md="header" id="step-1">
    Step 1
</h2>
<p data-md="p">Update apt</p>
<div data-md="code"><button on:click={copyText}>Copy</button><pre class="shiki css-variables" style="background-color:var(--shiki-background);color:var(--shiki-foreground)" tabindex="-1"><code><span class="line"><span style="color:var(--shiki-token-function)">sudo</span><span style="color:var(--shiki-token-string)"> apt update</span></span>
<span class="line"><span style="color:var(--shiki-token-function)">sudo</span><span style="color:var(--shiki-token-string)"> apt install nginx</span></span></code></pre></div>
<div data-md="space"></div>
<h2 data-section data-md="header" id="step-2">
    Step 2
</h2>
<p data-md="p">Adjusting the firewall</p>
<div data-md="code"><button on:click={copyText}>Copy</button><pre class="shiki css-variables" style="background-color:var(--shiki-background);color:var(--shiki-foreground)" tabindex="-1"><code><span class="line"><span style="color:var(--shiki-token-function)">systemctl</span><span style="color:var(--shiki-token-string)"> status nginx</span></span></code></pre></div>
<div data-md="code"><button on:click={copyText}>Copy</button><pre class="shiki css-variables" style="background-color:var(--shiki-background);color:var(--shiki-foreground)" tabindex="-1"><code><span class="line"><span style="color:var(--shiki-token-function)">service</span><span style="color:var(--shiki-token-string)"> nginx status</span></span></code></pre></div>
<div data-md="code"><button on:click={copyText}>Copy</button><pre class="shiki css-variables" style="background-color:var(--shiki-background);color:var(--shiki-foreground)" tabindex="-1"><code><span class="line"><span>Output</span></span>
<span class="line"><span>● nginx.service - A high performance web server and a reverse proxy server</span></span>
<span class="line"><span>     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)</span></span>
<span class="line"><span>     Active: active (running) since Sun 2024-04-07 21:18:17 UTC; 4min 27s ago</span></span>
<span class="line"><span>       Docs: man:nginx(8)</span></span>
<span class="line"><span>    Process: 1829 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span>    Process: 1830 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span>   Main PID: 1934 (nginx)</span></span>
<span class="line"><span>      Tasks: 3 (limit: 2323)</span></span>
<span class="line"><span>     Memory: 5.4M</span></span>
<span class="line"><span>        CPU: 32ms</span></span>
<span class="line"><span>     CGroup: /system.slice/nginx.service</span></span>
<span class="line"><span>             ├─1934 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"</span></span>
<span class="line"><span>             ├─1937 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""</span></span>
<span class="line"><span>             └─1938 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""</span></span></code></pre></div>
<div data-md="space"></div>
<h2 data-section data-md="header" id="check-your-ip-to-make-sure-nginx-is-running">
    Check your IP to make sure Nginx is running
</h2>
<div data-md="code"><button on:click={copyText}>Copy</button><pre class="shiki css-variables" style="background-color:var(--shiki-background);color:var(--shiki-foreground)" tabindex="-1"><code><span class="line"><span style="color:var(--shiki-token-function)">curl</span><span style="color:var(--shiki-token-string)"> -4</span><span style="color:var(--shiki-token-string)"> icanhazip.com</span></span></code></pre></div>
<div data-md="space"></div>
<p data-md="p">To stop nginx:</p>
<div data-md="code"><button on:click={copyText}>Copy</button><pre class="shiki css-variables" style="background-color:var(--shiki-background);color:var(--shiki-foreground)" tabindex="-1"><code><span class="line"><span style="color:var(--shiki-token-function)">sudo</span><span style="color:var(--shiki-token-string)"> systemctl stop nginx</span></span></code></pre></div>
<div data-md="space"></div>
<p data-md="p">To start the web server when it is stopped, type:</p>
<div data-md="space"></div>
<p data-md="p">sudo systemctl start nginx
To stop and then start the service again, type:</p>
<div data-md="space"></div>
<p data-md="p">sudo systemctl restart nginx
If you are only making configuration changes, Nginx can often reload without dropping connections. To do this, type:</p>
<div data-md="space"></div>
<p data-md="p">sudo systemctl reload nginx
By default, Nginx is configured to start automatically when the server boots. If this is not what you want, you can disable this behavior by typing:</p>
<div data-md="space"></div>
<p data-md="p">sudo systemctl disable nginx
To re-enable the service to start up at boot, you can type:</p>
<div data-md="space"></div>
<p data-md="p">sudo systemctl enable nginx</p>
<div data-md="space"></div>
<p data-md="p"><a data-md="a" href="https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04">
    https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04
</a> </p>
