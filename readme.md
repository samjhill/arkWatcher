# arkWatcher
arkWatcher is a RESTful API that provides useful information about your [ARK:Survival Evolved](http://store.steampowered.com/app/346110/) Server.


## Install & Run

First, install and set up [ark-server-tools](https://github.com/FezVrasta/ark-server-tools). Check to make sure you're ready to go by running `arkmanager status`. 

Once that's all set, it's pretty simple.

```shell
git clone https://github.com/samjhill/arkWatcher.git
node index.js
```

You should see the following:
```shell
listening on port 4730
```
Now, just navigate to http://localhost:4730/status to see if it's working!


## API

### /status

Returns the status of the server.

Sample response:
```json
[
  {"serverRunning":"Yes"},
  {"serverOnline":"Yes"},
  {"serverName":"Puesto - (v217.2)"},
  {"players":"0 / 15"},
  {"serverVersion":"799915"}
]
```
### /log

Returns the log from /var/log/arktools/arkserver.log. For now, it is simply broken into pieces by line.

Sample response:
```json
[
"14:43:27: start","/usr/local/bin/arkmanager: line 328: ulimit: open files: cannot modify limit: Operation not permitted",
"[S_API FAIL] SteamAPI_Init() failed; SteamAPI_IsSteamRunning() failed."
]
```

### /checkupdate

Returns the current version of the server and the latest available version.
Warning: slow. Nothing I can do about it.

Sample response:
```json
[
  {"currentVersion":"799915"},
  {"availableVersion":"799915"}
]
```

## Future Work
Add more information in the status command

Add admin authentication

Add POST requests to run commands remotely

## License

MIT © [Sam Hill](https://github.com/samjhill)
