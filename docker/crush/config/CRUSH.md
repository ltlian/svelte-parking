# Crush-specific context

## Banned commands

Crush blocks certain commands for security reasons. Do not attempt to run them —
they will fail immediately.

The complete blocked list (from Crush's bash tool):

- **Privilege escalation:** sudo, doas, su
- **Package managers:** apk, apt, apt-cache, apt-get, dnf, dpkg, emerge,
  home-manager, makepkg, opkg, pacman, paru, pkg, pkg_add, pkg_delete, portage,
  rpm, yay, yum, zypper
- **Download tools:** alias, aria2c, axel, curl, curlie, wget, xh
- **Browsers / HTTP tools:** chrome, firefox, http-prompt, httpie, links, lynx,
  w3m
- **Remote access:** nc, scp, ssh, telnet
- **Service / job management:** at, batch, chkconfig, crontab, service,
  systemctl
- **Disk / filesystem:** fdisk, mkfs, mount, parted, umount
- **Network / firewall:** firewall-cmd, ifconfig, ip, iptables, netstat, pfctl,
  route, ufw

If you need any of these operations, ask the user to run them in their own
terminal.

## Background Processes (Servers, Daemons)

When starting long-running processes (the API server, dev server, etc.):

1. **Start**: use `run_in_background=true` on the bash call
2. **Check output**: use `job_output` with `wait=false` — this returns current output immediately instead of blocking forever
3. **Never** use `wait=true` for servers/daemons — they never exit, so it hangs indefinitely

Examples:

Start a Node.js dev server and check it came up:
```
bash(run_in_background=true): npm run dev
job_output(wait=false): <shell_id>
```

Start a .NET web API and check it came up:
```
bash(run_in_background=true): dotnet run --project src/MyApi/MyApi.csproj
job_output(wait=false): <shell_id>
```
